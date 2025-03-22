const Realm = require("realm");
const fs = require("fs");

const RealmSceneSchema = {
  name: "RealmScene",
  properties: {
    Path: { type: "string", optional: true },
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Images: { type: "list", objectType: "RealmImage" },
    Stars: { type: "list", objectType: "RealmStar" },
    Dvds: { type: "list", objectType: "RealmDvd" },
    Categories: { type: "list", objectType: "RealmCategory" },
    Websites: { type: "list", objectType: "RealmWebsite" },
    Themes: { type: "list", objectType: "RealmTheme" },
    Splooges: { type: "list", objectType: "RealmSplooge" },
    Links: { type: "list", objectType: "RealmLink" },
    Added: { type: "date", optional: false },
    Gilded: { type: "date", optional: true },
    Bronzed: { type: "date", optional: true },
    Silvered: { type: "date", optional: true },
    Organized: { type: "date", optional: true },
    Rating: { type: "int", optional: false },
    Ignored: { type: "bool", optional: false },
    Archived: { type: "bool", optional: false },
    Bytes: { type: "int", optional: false },
    Hash: { type: "string", optional: true },
    ReleaseDate: { type: "date", optional: true },
    Seconds: { type: "int", optional: false },
    Resolution: { type: "string", optional: true },
    SecondsWatched: { type: "int", optional: false },
  },
  primaryKey: "Hash",
};

const RealmSploogeSchema = {
  name: "RealmSplooge",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Seconds: "int",
    Stars: "RealmStar[]",
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    Images: "RealmImage[]",
    // Scene: { type: "object", objectType: "RealmScene" },
  },
};

const RealmStarSchema = {
  name: "RealmStar",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    TwitterHandle: { type: "string", optional: true },
    BirthDate: "date?",
    Gender: { type: "string", optional: true },
    StartDate: "date?",
    EndDate: "date?",
    HairColor: { type: "string", optional: true },
    EyeColor: { type: "string", optional: true },
    Nationality: { type: "string", optional: true },
    Ethnicity: { type: "string", optional: true },
    BreastSize: { type: "string", optional: true },
    FakeBreasts: "bool",
    WeightImperial: { type: "string", optional: true },
    WeightMetric: { type: "string", optional: true },
    HeightImperial: { type: "string", optional: true },
    HeightMetric: { type: "string", optional: true },
    Stars: "RealmStar[]",
    Themes: "RealmTheme[]",
    Links: "RealmLink[]",
    Images: "RealmImage[]",
    Aliases: { type: "list", objectType: "string", optional: true },
    Attributes: "RealmAppliedAttribute[]",
  },
};

const RealmThemeSchema = {
  name: "RealmTheme",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    Categories: "RealmCategory[]",
    Images: "RealmImage[]",
    Themes: "RealmTheme[]",
    Aliases: { type: "list", objectType: "string", optional: true },
  },
};

const RealmWatchLogSchema = {
  name: "RealmWatchLog",
  properties: {
    RealmScene: "RealmScene",
    Seconds: "int",
    Added: "date",
  },
};

const RealmWebsiteSchema = {
  name: "RealmWebsite",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Images: "RealmImage[]",
    Themes: "RealmTheme[]",
    Categories: "RealmCategory[]",
    Websites: "RealmWebsite[]",
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    TwitterHandle: { type: "string", optional: true },
    Aliases: { type: "list", objectType: "string", optional: true },
  },
};

const RealmAppliedAttributeSchema = {
  name: "RealmAppliedAttribute",
  properties: {
    SelectedValue: { type: "string", optional: true },
    RealmAttribute: "RealmAttribute",
  },
};

const RealmAttributeSchema = {
  name: "RealmAttribute",
  properties: {
    Name: { type: "string", optional: true },
    RangeStart: "int?",
    RangeEnd: "int?",
    Label: { type: "string", optional: true },
    CustomValues: { type: "list", objectType: "string", optional: true },
  },
};

const RealmBookmarkSchema = {
  name: "RealmBookmark",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    Scene: "RealmScene",
    Category: "RealmCategory",
    Seconds: "int",
    StartHere: "bool",
    EndSeconds: "int?",
    Images: "RealmImage[]",
    Stars: "RealmStar[]",
  },
};

const RealmCategorySchema = {
  name: "RealmCategory",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Categories: "RealmCategory[]",
    Themes: "RealmTheme[]",
    Aliases: { type: "list", objectType: "string", optional: true },
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    Images: { type: "list", objectType: "RealmImage" },
  },
};

const RealmDvdSchema = {
  name: "RealmDvd",
  properties: {
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Images: "RealmImage[]",
    Themes: "RealmTheme[]",
    Categories: "RealmCategory[]",
    Websites: "RealmWebsite[]",
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    Aliases: { type: "list", objectType: "string", optional: true },
  },
};

const RealmImageSchema = {
  name: "RealmImage",
  properties: {
    Path: { type: "string", optional: true },
    IsDisplayImage: "bool",
    IsExcludedImage: "bool",
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Images: "RealmImage[]",
    Themes: "RealmTheme[]",
    Websites: "RealmWebsite[]",
    Categories: "RealmCategory[]",
    Stars: "RealmStar[]",
    Added: "date",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
    // Scene: { type: "object", objectType: "RealmScene", optional: true },
  },
};

const RealmLikeSchema = {
  name: "RealmLike",
  properties: {
    Scene: { type: "object", objectType: "RealmScene", optional: true },
    Added: "date",
    Seconds: "int?",
  },
};

const RealmLinkSchema = {
  name: "RealmLink",
  properties: {
    Url: { type: "string", optional: true },
    Name: { type: "string", optional: true },
    Description: { type: "string", optional: true },
    Added: "date",
    Images: "RealmImage[]",
    Themes: "RealmTheme[]",
    Categories: "RealmCategory[]",
    Stars: "RealmStar[]",
    Gilded: "date?",
    Bronzed: "date?",
    Silvered: "date?",
    Organized: "date?",
    Rating: "int",
    Ignored: "bool",
  },
};

async function exportRealmToJson() {
  // Open the Realm database in read-only mode
  const realm = await Realm.open({
    path: "B:\\12345.realm", // Update this path to your Realm file
    schema: [
      RealmImageSchema,
      RealmStarSchema,
      RealmDvdSchema,
      RealmCategorySchema,
      RealmWebsiteSchema,
      RealmThemeSchema,
      RealmSploogeSchema,
      RealmLinkSchema,
      RealmSceneSchema,
      RealmLikeSchema,
      RealmBookmarkSchema,
      RealmAttributeSchema,
      RealmAppliedAttributeSchema,
      RealmWatchLogSchema,
    ], // Add all schemas here
    schemaVersion: 70, // Update this to match the last set schema version
  });

  const realmScenes = realm.objects("RealmScene");
  const realmScenesJson = JSON.stringify(realmScenes, null, 2);
  fs.writeFileSync("products.json", realmScenesJson);

  console.log("Exported Realm database to JSON files");
}

// Run the export function
exportRealmToJson().catch((error) => {
  console.error("Failed to export Realm database:", error);
});
