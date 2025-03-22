import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

// Define interface for count result
interface CountResult {
  total: number;
}

// Get all scenes with pagination
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Scenes
    WHERE Ignored != 1 OR Ignored IS NULL
    ORDER BY Added DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [limit, offset], (err, scenes) => {
    if (err) {
      console.error("Error fetching scenes:", err);
      return res.status(500).json({ error: "Failed to fetch scenes" });
    }

    // Get total count for pagination
    db.get(
      "SELECT COUNT(*) as total FROM Scenes WHERE Ignored != 1 OR Ignored IS NULL",
      (countErr, countResult: CountResult) => {
        if (countErr) {
          console.error("Error counting scenes:", countErr);
          return res.status(500).json({ error: "Failed to count scenes" });
        }

        res.json({
          data: scenes,
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

// Get a single scene by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  // First get the scene data
  db.get("SELECT * FROM Scenes WHERE id = ?", [id], (err, scene) => {
    if (err) {
      console.error("Error fetching scene:", err);
      return res.status(500).json({ error: "Failed to fetch scene" });
    }

    if (!scene) {
      return res.status(404).json({ error: "Scene not found" });
    }

    // Get related stars
    db.all(
      `
      SELECT s.* FROM Stars s
      JOIN Scene_Stars ss ON s.id = ss.Star_id
      WHERE ss.Scene_id = ?
    `,
      [id],
      (starsErr, stars) => {
        if (starsErr) {
          console.error("Error fetching scene stars:", starsErr);
          return res
            .status(500)
            .json({ error: "Failed to fetch scene relationships" });
        }

        // Get related categories
        db.all(
          `
        SELECT c.* FROM Categories c
        JOIN Scene_Categories sc ON c.id = sc.Category_id
        WHERE sc.Scene_id = ?
      `,
          [id],
          (categoriesErr, categories) => {
            if (categoriesErr) {
              console.error("Error fetching scene categories:", categoriesErr);
              return res
                .status(500)
                .json({ error: "Failed to fetch scene relationships" });
            }

            // Get related genres
            db.all(
              `
          SELECT g.* FROM Genres g
          JOIN Scene_Genres sg ON g.id = sg.Genre_id
          WHERE sg.Scene_id = ?
        `,
              [id],
              (genresErr, genres) => {
                if (genresErr) {
                  console.error("Error fetching scene genres:", genresErr);
                  return res
                    .status(500)
                    .json({ error: "Failed to fetch scene relationships" });
                }

                // Get related websites
                db.all(
                  `
            SELECT w.* FROM Websites w
            JOIN Scene_Websites sw ON w.id = sw.Website_id
            WHERE sw.Scene_id = ?
          `,
                  [id],
                  (websitesErr, websites) => {
                    if (websitesErr) {
                      console.error(
                        "Error fetching scene websites:",
                        websitesErr
                      );
                      return res
                        .status(500)
                        .json({ error: "Failed to fetch scene relationships" });
                    }

                    // Return the scene with all related data
                    res.json({
                      ...scene,
                      stars,
                      categories,
                      genres,
                      websites,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

// Search scenes
router.get("/search/:query", (req: Request, res: Response) => {
  const searchQuery = `%${req.params.query}%`;

  db.all(
    `
    SELECT * FROM Scenes 
    WHERE (Name LIKE ? OR Description LIKE ?)
    AND (Ignored != 1 OR Ignored IS NULL)
    ORDER BY Added DESC
  `,
    [searchQuery, searchQuery],
    (err, scenes) => {
      if (err) {
        console.error("Error searching scenes:", err);
        return res.status(500).json({ error: "Failed to search scenes" });
      }

      res.json(scenes);
    }
  );
});

export default router;
