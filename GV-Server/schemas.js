export const SceneSchema = {
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

export const SploogeSchema = {
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
  },
};

export const StarSchema = {
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

export const ThemeSchema = {
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

export const WatchLogSchema = {
  name: "RealmWatchLog",
  properties: {
    RealmScene: "RealmScene",
    Seconds: "int",
    Added: "date",
  },
};

export const WebsiteSchema = {
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

export const AppliedAttributeSchema = {
  name: "RealmAppliedAttribute",
  properties: {
    SelectedValue: { type: "string", optional: true },
    RealmAttribute: "RealmAttribute",
  },
};

export const AttributeSchema = {
  name: "RealmAttribute",
  properties: {
    Name: { type: "string", optional: true },
    RangeStart: "int?",
    RangeEnd: "int?",
    Label: { type: "string", optional: true },
    CustomValues: { type: "list", objectType: "string", optional: true },
  },
};

export const BookmarkSchema = {
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

export const CategorySchema = {
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

export const DvdSchema = {
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

export const ImageSchema = {
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
  },
};

export const LikeSchema = {
  name: "RealmLike",
  properties: {
    Scene: { type: "object", objectType: "RealmScene", optional: true },
    Added: "date",
    Seconds: "int?",
  },
};

export const LinkSchema = {
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

// Create tables
export const schemaSql = `
CREATE TABLE IF NOT EXISTS Scenes (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Path TEXT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE,
  Rating INTEGER, Ignored BOOLEAN, Archived BOOLEAN, Bytes INTEGER, Hash TEXT, ReleaseDate DATE, Seconds INTEGER, Resolution TEXT, SecondsWatched INTEGER
);

CREATE TABLE IF NOT EXISTS Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Path TEXT, IsDisplayImage BOOLEAN, IsExcludedImage BOOLEAN, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Image_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, ImageId INTEGER, GenreId INTEGER,
  FOREIGN KEY (ImageId) REFERENCES Images(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Image_Websites (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, ImageId INTEGER, WebsiteId INTEGER,
  FOREIGN KEY (ImageId) REFERENCES Images(Id),
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id)
);

CREATE TABLE IF NOT EXISTS Image_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, ImageId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (ImageId) REFERENCES Images(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Image_Stars (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, ImageId INTEGER, StarId INTEGER,
  FOREIGN KEY (ImageId) REFERENCES Images(Id),
  FOREIGN KEY (StarId) REFERENCES Stars(Id)
);

CREATE TABLE IF NOT EXISTS Stars (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN, TwitterHandle TEXT, BirthDate DATE, Gender TEXT, StartDate DATE, EndDate DATE, HairColor TEXT, EyeColor TEXT, Nationality TEXT, Ethnicity TEXT, BreastSize TEXT, FakeBreasts BOOLEAN, WeightImperial TEXT, WeightMetric TEXT, HeightImperial TEXT, HeightMetric TEXT
);

CREATE TABLE IF NOT EXISTS Star_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, StarId INTEGER, GenreId INTEGER,
  FOREIGN KEY (StarId) REFERENCES Stars(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Star_Links (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, StarId INTEGER, LinkId INTEGER,
  FOREIGN KEY (StarId) REFERENCES Stars(Id),
  FOREIGN KEY (LinkId) REFERENCES Links(Id)
);

CREATE TABLE IF NOT EXISTS Star_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, StarId INTEGER, ImageId INTEGER,
  FOREIGN KEY (StarId) REFERENCES Stars(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Dvds (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Dvd_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, DvdId INTEGER, GenreId INTEGER,
  FOREIGN KEY (DvdId) REFERENCES Dvds(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Dvd_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, DvdId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (DvdId) REFERENCES Dvds(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Dvd_Websites (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, DvdId INTEGER, WebsiteId INTEGER,
  FOREIGN KEY (DvdId) REFERENCES Dvds(Id),
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id)
);

CREATE TABLE IF NOT EXISTS Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Category_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, CategoryId INTEGER, GenreId INTEGER,
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Category_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, CategoryId INTEGER, ImageId INTEGER,
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Category_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, CategoryId INTEGER, SubCategoryId INTEGER,
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
  FOREIGN KEY (SubCategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Websites (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN, TwitterHandle TEXT
);

CREATE TABLE IF NOT EXISTS Website_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, WebsiteId INTEGER, GenreId INTEGER,
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Website_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, WebsiteId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Website_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, WebsiteId INTEGER, ImageId INTEGER,
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Website_Websites (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, WebsiteId INTEGER, SubWebsiteId INTEGER,
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id),
  FOREIGN KEY (SubWebsiteId) REFERENCES Websites(Id)
);

CREATE TABLE IF NOT EXISTS Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Genre_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, GenreId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (GenreId) REFERENCES Genres(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Genre_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, GenreId INTEGER, ImageId INTEGER,
  FOREIGN KEY (GenreId) REFERENCES Genres(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Genre_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, GenreId INTEGER, SubGenreId INTEGER,
  FOREIGN KEY (GenreId) REFERENCES Genres(Id),
  FOREIGN KEY (SubGenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Climaxes (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Seconds INTEGER, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Scene_Climaxes (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, ClimaxId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (ClimaxId) REFERENCES Climaxes(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Stars (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, StarId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (StarId) REFERENCES Stars(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Websites (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, WebsiteId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (WebsiteId) REFERENCES Websites(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, GenreId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, ImageId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Dvds (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, DvdId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (DvdId) REFERENCES Dvds(Id)
);

CREATE TABLE IF NOT EXISTS Scene_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, SceneId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (SceneId) REFERENCES Scenes(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Links (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, Url TEXT, Name TEXT, Description TEXT, Added DATE, Gilded DATE, Bronzed DATE, Silvered DATE, Organized DATE, Rating INTEGER, Ignored BOOLEAN
);

CREATE TABLE IF NOT EXISTS Link_Genres (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, LinkId INTEGER, GenreId INTEGER,
  FOREIGN KEY (LinkId) REFERENCES Links(Id),
  FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

CREATE TABLE IF NOT EXISTS Link_Categories (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, LinkId INTEGER, CategoryId INTEGER,
  FOREIGN KEY (LinkId) REFERENCES Links(Id),
  FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE IF NOT EXISTS Link_Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, LinkId INTEGER, ImageId INTEGER,
  FOREIGN KEY (LinkId) REFERENCES Links(Id),
  FOREIGN KEY (ImageId) REFERENCES Images(Id)
);

CREATE TABLE IF NOT EXISTS Link_Stars (
  Id INTEGER PRIMARY KEY AUTOINCREMENT, LinkId INTEGER, StarId INTEGER,
  FOREIGN KEY (LinkId) REFERENCES Links(Id),
  FOREIGN KEY (StarId) REFERENCES Stars(Id)
);
`;
