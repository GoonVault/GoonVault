const Realm = require("realm");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const {
  SceneSchema,
  SploogeSchema,
  StarSchema,
  ThemeSchema,
  WatchLogSchema,
  WebsiteSchema,
  AppliedAttributeSchema,
  AttributeSchema,
  BookmarkSchema,
  CategorySchema,
  DvdSchema,
  ImageSchema,
  LikeSchema,
  LinkSchema,
  schemaSql,
} = require("./schemas.js");

async function exportSchemaData(realm, schemaName, insertStmt, columns, idMap) {
  let objects = realm.objects(schemaName);
  console.log(`Exporting ${schemaName}...`);
  for (const obj of objects) {
    const values = columns.map((col) => obj[col]);
    await new Promise((resolve, reject) => {
      insertStmt.run(values, function (err) {
        if (err) {
          console.error(`Failed to insert ${schemaName}:`, err);
          reject(err);
        } else {
          idMap.set(JSON.stringify(obj), this.lastID); // Store the last inserted ID in the map using the object reference
          resolve();
        }
      });
    });
  }
  // Don't finalize here - we'll finalize all statements at the end
}

async function exportJoinTableData(
  realm,
  schemaName,
  joinTables,
  idMap,
  db,
  statements
) {
  const objects = realm.objects(schemaName);
  console.log(`Exporting join tables for ${schemaName}...`);

  for (const obj of objects) {
    for (const { tableName, foreignKey, relatedKey } of joinTables) {
      const relatedList = obj[relatedKey];
      // console.log(`Processing ${relatedKey} for ${schemaName}...`);
      if (relatedList && relatedList.length > 0) {
        for (const relatedObj of relatedList) {
          const objId = idMap.get(JSON.stringify(obj));
          const relatedObjId = idMap.get(JSON.stringify(relatedObj));

          let related = relatedKey.slice(0, -1) + "Id";
          if (relatedKey === "Splooges") {
            related = "ClimaxId";
          } else if (relatedKey === "Categories") {
            related = "CategoryId";
          } else if (relatedKey === "Themes") {
            related = "GenreId";
          }

          if (objId && relatedObjId) {
            const stmt = `
              INSERT INTO ${tableName} (${foreignKey}, ${related})
              VALUES (?, ?)
            `;
            const insertJoinStmt = db.prepare(stmt);
            statements.push(insertJoinStmt); // Add to global statements array

            await new Promise((resolve, reject) => {
              insertJoinStmt.run(objId, relatedObjId, (err) => {
                if (err) {
                  console.error(`Failed to insert into ${tableName}:`, err);
                  reject(err);
                } else {
                  // console.log(
                  //   `Inserted into ${tableName} with ${foreignKey} ${objId} and ${
                  //     relatedKey.slice(0, -1) + "Id"
                  //   } ${relatedObjId}`
                  // );
                  resolve();
                }
              });
            });
            // Don't finalize here - we'll finalize all statements at the end
          } else {
            console.warn(
              `Missing ID mapping for a relationship in ${tableName}`
            );
          }
        }
      }
    }
  }
}

async function exportRealmToSqlite() {
  const realmPath = "B:\\12345.realm"; // Update this path to your Realm file
  const sqlitePath = path.join(__dirname, "database.sqlite");

  // Optionally delete existing database
  // if (fs.existsSync(sqlitePath)) {
  //   fs.unlinkSync(sqlitePath);
  // }

  let db = null;
  let realm = null;
  let statements = [];

  try {
    // Open the SQLite database
    db = new sqlite3.Database(sqlitePath);

    await new Promise((resolve, reject) => {
      db.exec(schemaSql, (err) => {
        if (err) {
          console.error("Failed to create tables:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Open the Realm database
    realm = await Realm.open({
      path: realmPath,
      schema: [
        ImageSchema,
        StarSchema,
        DvdSchema,
        CategorySchema,
        WebsiteSchema,
        ThemeSchema,
        SploogeSchema,
        LinkSchema,
        SceneSchema,
        LikeSchema,
        BookmarkSchema,
        AttributeSchema,
        AppliedAttributeSchema,
        WatchLogSchema,
      ],
      schemaVersion: 70,
    });

    const idMap = new Map();

    console.log("Exporting entities to SQLite database...");

    // Prepare all statements
    const insertSceneStmt = db.prepare(`
      INSERT INTO Scenes (
        Path, Name, Description, Added, Gilded, Bronzed, Silvered, Organized,
        Rating, Ignored, Archived, Bytes, Hash, ReleaseDate, Seconds, Resolution, SecondsWatched
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertSceneStmt);

    const insertImageStmt = db.prepare(`
      INSERT INTO Images (
        Path, IsDisplayImage, IsExcludedImage, Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertImageStmt);

    const insertStarStmt = db.prepare(`
      INSERT INTO Stars (
        Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored, TwitterHandle, BirthDate, Gender, StartDate, EndDate, HairColor, EyeColor, Nationality, Ethnicity, BreastSize, FakeBreasts, WeightImperial, WeightMetric, HeightImperial, HeightMetric
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertStarStmt);

    const insertDvdStmt = db.prepare(`
      INSERT INTO Dvds (
        Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertDvdStmt);

    const insertCategoryStmt = db.prepare(`
      INSERT INTO Categories (
        Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertCategoryStmt);

    const insertWebsiteStmt = db.prepare(`
      INSERT INTO Websites (
        Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored, TwitterHandle
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertWebsiteStmt);

    const insertGenreStmt = db.prepare(`
      INSERT INTO Genres (
        Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertGenreStmt);

    const insertClimaxStmt = db.prepare(`
      INSERT INTO Climaxes (
        Name, Description, Seconds, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertClimaxStmt);

    const insertLinkStmt = db.prepare(`
      INSERT INTO Links (
        Url, Name, Description, Added, Gilded, Bronzed, Silvered, Organized, Rating, Ignored
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statements.push(insertLinkStmt);

    // Export all entities
    await exportSchemaData(
      realm,
      "RealmScene",
      insertSceneStmt,
      [
        "Path",
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
        "Archived",
        "Bytes",
        "Hash",
        "ReleaseDate",
        "Seconds",
        "Resolution",
        "SecondsWatched",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmImage",
      insertImageStmt,
      [
        "Path",
        "IsDisplayImage",
        "IsExcludedImage",
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmStar",
      insertStarStmt,
      [
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
        "TwitterHandle",
        "BirthDate",
        "Gender",
        "StartDate",
        "EndDate",
        "HairColor",
        "EyeColor",
        "Nationality",
        "Ethnicity",
        "BreastSize",
        "FakeBreasts",
        "WeightImperial",
        "WeightMetric",
        "HeightImperial",
        "HeightMetric",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmDvd",
      insertDvdStmt,
      [
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmCategory",
      insertCategoryStmt,
      [
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmWebsite",
      insertWebsiteStmt,
      [
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
        "TwitterHandle",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmTheme",
      insertGenreStmt,
      [
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmSplooge",
      insertClimaxStmt,
      [
        "Name",
        "Description",
        "Seconds",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    await exportSchemaData(
      realm,
      "RealmLink",
      insertLinkStmt,
      [
        "Url",
        "Name",
        "Description",
        "Added",
        "Gilded",
        "Bronzed",
        "Silvered",
        "Organized",
        "Rating",
        "Ignored",
      ],
      idMap
    );

    console.log("Exporting relationships...");

    // Export all relationships
    await exportJoinTableData(
      realm,
      "RealmScene",
      [
        {
          tableName: "Scene_Climaxes",
          foreignKey: "SceneId",
          relatedKey: "Splooges",
        },
        {
          tableName: "Scene_Stars",
          foreignKey: "SceneId",
          relatedKey: "Stars",
        },
        {
          tableName: "Scene_Images",
          foreignKey: "SceneId",
          relatedKey: "Images",
        },
        {
          tableName: "Scene_Dvds",
          foreignKey: "SceneId",
          relatedKey: "Dvds",
        },
        {
          tableName: "Scene_Categories",
          foreignKey: "SceneId",
          relatedKey: "Categories",
        },
        {
          tableName: "Scene_Websites",
          foreignKey: "SceneId",
          relatedKey: "Websites",
        },
        {
          tableName: "Scene_Genres",
          foreignKey: "SceneId",
          relatedKey: "Themes",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmImage",
      [
        {
          tableName: "Image_Genres",
          foreignKey: "ImageId",
          relatedKey: "Themes",
        },
        {
          tableName: "Image_Websites",
          foreignKey: "ImageId",
          relatedKey: "Websites",
        },
        {
          tableName: "Image_Categories",
          foreignKey: "ImageId",
          relatedKey: "Categories",
        },
        {
          tableName: "Image_Stars",
          foreignKey: "ImageId",
          relatedKey: "Stars",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmStar",
      [
        {
          tableName: "Star_Genres",
          foreignKey: "StarId",
          relatedKey: "Themes",
        },
        {
          tableName: "Star_Links",
          foreignKey: "StarId",
          relatedKey: "Links",
        },
        {
          tableName: "Star_Images",
          foreignKey: "StarId",
          relatedKey: "Images",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmDvd",
      [
        {
          tableName: "Dvd_Genres",
          foreignKey: "DvdId",
          relatedKey: "Themes",
        },
        {
          tableName: "Dvd_Categories",
          foreignKey: "DvdId",
          relatedKey: "Categories",
        },
        {
          tableName: "Dvd_Websites",
          foreignKey: "DvdId",
          relatedKey: "Websites",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmCategory",
      [
        {
          tableName: "Category_Genres",
          foreignKey: "CategoryId",
          relatedKey: "Themes",
        },
        {
          tableName: "Category_Images",
          foreignKey: "CategoryId",
          relatedKey: "Images",
        },
        {
          tableName: "Category_Categories",
          foreignKey: "SubCategoryId",
          relatedKey: "Categories",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmWebsite",
      [
        {
          tableName: "Website_Genres",
          foreignKey: "WebsiteId",
          relatedKey: "Themes",
        },
        {
          tableName: "Website_Categories",
          foreignKey: "WebsiteId",
          relatedKey: "Categories",
        },
        {
          tableName: "Website_Images",
          foreignKey: "WebsiteId",
          relatedKey: "Images",
        },
        {
          tableName: "Website_Websites",
          foreignKey: "SubWebsiteId",
          relatedKey: "Websites",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmTheme",
      [
        {
          tableName: "Genre_Categories",
          foreignKey: "GenreId",
          relatedKey: "Categories",
        },
        {
          tableName: "Genre_Images",
          foreignKey: "GenreId",
          relatedKey: "Images",
        },
        {
          tableName: "Genre_Genres",
          foreignKey: "SubGenreId",
          relatedKey: "Themes",
        },
      ],
      idMap,
      db,
      statements
    );

    await exportJoinTableData(
      realm,
      "RealmLink",
      [
        {
          tableName: "Link_Genres",
          foreignKey: "LinkId",
          relatedKey: "Themes",
        },
        {
          tableName: "Link_Categories",
          foreignKey: "LinkId",
          relatedKey: "Categories",
        },
        {
          tableName: "Link_Images",
          foreignKey: "LinkId",
          relatedKey: "Images",
        },
        {
          tableName: "Link_Stars",
          foreignKey: "LinkId",
          relatedKey: "Stars",
        },
      ],
      idMap,
      db,
      statements
    );

    console.log("Exported all data to SQLite database");
  } catch (error) {
    console.error("Error during export:", error);
    throw error;
  } finally {
    // Cleanup - make sure all statements are finalized
    if (statements?.length) {
      for (const stmt of statements) {
        if (stmt && typeof stmt.finalize === "function") {
          try {
            stmt.finalize();
          } catch (e) {
            console.error("Error finalizing statement:", e);
          }
        }
      }
    }

    // Close realm
    if (realm) {
      realm.close();
    }

    // Close database with a timeout to ensure statements are finalized
    if (db) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Give some time for SQLite to clean up

      try {
        await new Promise((resolve, reject) => {
          db.run("PRAGMA optimize", function (err) {
            if (err) console.warn("Failed to optimize database:", err);

            db.close((err) => {
              if (err) {
                console.error("Error closing database:", err);
                reject(err);
              } else {
                console.log("Database closed successfully");
                resolve();
              }
            });
          });
        });
      } catch (err) {
        console.error("Failed to close database cleanly:", err);
      }
    }
  }
}

// Run the export function
exportRealmToSqlite().catch((error) => {
  console.error("Failed to export Realm database:", error);
});
