import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

// Define interface for count result
interface CountResult {
  total: number;
}

// Get all categories
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = (page - 1) * limit;

  db.all(
    `
    SELECT * FROM Categories
    WHERE Ignored != 1 OR Ignored IS NULL
    ORDER BY Name
    LIMIT ? OFFSET ?
  `,
    [limit, offset],
    (err, categories) => {
      if (err) {
        console.error("Error fetching categories:", err);
        return res.status(500).json({ error: "Failed to fetch categories" });
      }

      // Get total count for pagination
      db.get(
        "SELECT COUNT(*) as total FROM Categories WHERE Ignored != 1 OR Ignored IS NULL",
        (countErr, countResult: CountResult) => {
          if (countErr) {
            console.error("Error counting categories:", countErr);
            return res
              .status(500)
              .json({ error: "Failed to count categories" });
          }

          res.json({
            data: categories,
            pagination: {
              total: countResult.total,
              page,
              limit,
              pages: Math.ceil(countResult.total / limit),
            },
          });
        }
      );
    }
  );
});

// Get a single category by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  db.get("SELECT * FROM Categories WHERE id = ?", [id], (err, category) => {
    if (err) {
      console.error("Error fetching category:", err);
      return res.status(500).json({ error: "Failed to fetch category" });
    }

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Get scenes with this category
    db.all(
      `
      SELECT s.* FROM Scenes s
      JOIN Scene_Categories sc ON s.id = sc.Scene_id
      WHERE sc.Category_id = ? AND (s.Ignored != 1 OR s.Ignored IS NULL)
      ORDER BY s.Added DESC
    `,
      [id],
      (scenesErr, scenes) => {
        if (scenesErr) {
          console.error("Error fetching category scenes:", scenesErr);
          return res
            .status(500)
            .json({ error: "Failed to fetch category relationships" });
        }

        res.json({
          ...category,
          scenes,
        });
      }
    );
  });
});

export default router;
