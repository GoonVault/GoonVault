import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

// Define interface for count result
interface CountResult {
  total: number;
}

// Get all genres
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = (page - 1) * limit;

  db.all(
    `
    SELECT * FROM Genres
    WHERE Ignored != 1 OR Ignored IS NULL
    ORDER BY Name
    LIMIT ? OFFSET ?
  `,
    [limit, offset],
    (err, genres) => {
      if (err) {
        console.error("Error fetching genres:", err);
        return res.status(500).json({ error: "Failed to fetch genres" });
      }

      // Get total count for pagination
      db.get(
        "SELECT COUNT(*) as total FROM Genres WHERE Ignored != 1 OR Ignored IS NULL",
        (countErr, countResult: CountResult) => {
          if (countErr) {
            console.error("Error counting genres:", countErr);
            return res.status(500).json({ error: "Failed to count genres" });
          }

          res.json({
            data: genres,
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

// Get a single genre by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  db.get("SELECT * FROM Genres WHERE id = ?", [id], (err, genre) => {
    if (err) {
      console.error("Error fetching genre:", err);
      return res.status(500).json({ error: "Failed to fetch genre" });
    }

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Get scenes with this genre
    db.all(
      `
      SELECT s.* FROM Scenes s
      JOIN Scene_Genres sg ON s.id = sg.Scene_id
      WHERE sg.Genre_id = ? AND (s.Ignored != 1 OR s.Ignored IS NULL)
      ORDER BY s.Added DESC
    `,
      [id],
      (scenesErr, scenes) => {
        if (scenesErr) {
          console.error("Error fetching genre scenes:", scenesErr);
          return res
            .status(500)
            .json({ error: "Failed to fetch genre relationships" });
        }

        // Get stars with this genre
        db.all(
          `
        SELECT st.* FROM Stars st
        JOIN Star_Genres sg ON st.id = sg.Star_id
        WHERE sg.Genre_id = ? AND (st.Ignored != 1 OR st.Ignored IS NULL)
        ORDER BY st.Name
      `,
          [id],
          (starsErr, stars) => {
            if (starsErr) {
              console.error("Error fetching genre stars:", starsErr);
              return res
                .status(500)
                .json({ error: "Failed to fetch genre relationships" });
            }

            res.json({
              ...genre,
              scenes,
              stars,
            });
          }
        );
      }
    );
  });
});

export default router;
