import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

// Define interface for count result
interface CountResult {
  total: number;
}

// Get all stars with pagination
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Stars
    WHERE Ignored != 1 OR Ignored IS NULL
    ORDER BY Name
    LIMIT ? OFFSET ?
  `;

  db.all(query, [limit, offset], (err, stars) => {
    if (err) {
      console.error("Error fetching stars:", err);
      return res.status(500).json({ error: "Failed to fetch stars" });
    }

    // Get total count for pagination
    db.get(
      "SELECT COUNT(*) as total FROM Stars WHERE Ignored != 1 OR Ignored IS NULL",
      (countErr, countResult: CountResult) => {
        if (countErr) {
          console.error("Error counting stars:", countErr);
          return res.status(500).json({ error: "Failed to count stars" });
        }

        res.json({
          data: stars,
          pagination: {
            total: countResult.total,
            page,
            limit,
            pages: Math.ceil(countResult.total / limit),
          },
        });
      }
    );
  });
});

// Get a single star by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  // First get the star data
  db.get("SELECT * FROM Stars WHERE id = ?", [id], (err, star) => {
    if (err) {
      console.error("Error fetching star:", err);
      return res.status(500).json({ error: "Failed to fetch star" });
    }

    if (!star) {
      return res.status(404).json({ error: "Star not found" });
    }

    // Get related scenes
    db.all(
      `
      SELECT sc.* FROM Scenes sc
      JOIN Scene_Stars ss ON sc.id = ss.Scene_id
      WHERE ss.Star_id = ? AND (sc.Ignored != 1 OR sc.Ignored IS NULL)
      ORDER BY sc.Added DESC
    `,
      [id],
      (scenesErr, scenes) => {
        if (scenesErr) {
          console.error("Error fetching star scenes:", scenesErr);
          return res
            .status(500)
            .json({ error: "Failed to fetch star relationships" });
        }

        // Get related genres
        db.all(
          `
        SELECT g.* FROM Genres g
        JOIN Star_Genres sg ON g.id = sg.Genre_id
        WHERE sg.Star_id = ?
      `,
          [id],
          (genresErr, genres) => {
            if (genresErr) {
              console.error("Error fetching star genres:", genresErr);
              return res
                .status(500)
                .json({ error: "Failed to fetch star relationships" });
            }

            // Return the star with all related data
            res.json({
              ...star,
              scenes,
              genres,
            });
          }
        );
      }
    );
  });
});

// Search stars
router.get("/search/:query", (req: Request, res: Response) => {
  const searchQuery = `%${req.params.query}%`;

  db.all(
    `
    SELECT * FROM Stars 
    WHERE (Name LIKE ? OR Description LIKE ?)
    AND (Ignored != 1 OR Ignored IS NULL)
    ORDER BY Name
  `,
    [searchQuery, searchQuery],
    (err, stars) => {
      if (err) {
        console.error("Error searching stars:", err);
        return res.status(500).json({ error: "Failed to search stars" });
      }

      res.json(stars);
    }
  );
});

export default router;
