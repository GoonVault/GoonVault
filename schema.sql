CREATE TABLE Images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Path TEXT,
    IsDisplayImage INTEGER,
    IsExcludedImage INTEGER,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Stars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER,
    TwitterHandle TEXT,
    BirthDate TEXT,
    Gender TEXT,
    StartDate TEXT,
    EndDate TEXT,
    HairColor TEXT,
    EyeColor TEXT,
    Nationality TEXT,
    Ethnicity TEXT,
    BreastSize TEXT,
    FakeBreasts INTEGER,
    WeightImperial TEXT,
    WeightMetric TEXT,
    HeightImperial TEXT,
    HeightMetric TEXT
);

CREATE TABLE Dvds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Websites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER,
    TwitterHandle TEXT
);

CREATE TABLE Genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Climaxes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Seconds INTEGER,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Url TEXT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER
);

CREATE TABLE Scenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Path TEXT,
    Name TEXT,
    Description TEXT,
    Added TEXT,
    Gilded TEXT,
    Bronzed TEXT,
    Silvered TEXT,
    Organized TEXT,
    Rating INTEGER,
    Ignored INTEGER,
    Archived INTEGER,
    Bytes INTEGER,
    Hash TEXT,
    ReleaseDate TEXT,
    Seconds INTEGER,
    Resolution TEXT,
    SecondsWatched INTEGER
);

CREATE TABLE Likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Scene_id INTEGER,
    Added TEXT,
    Seconds INTEGER
);

CREATE TABLE IF NOT EXISTS Themes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Added DATE,
    Gilded DATE,
    Bronzed DATE,
    Silvered DATE,
    Organized DATE,
    Rating INTEGER,
    Ignored BOOLEAN
);

-- Join tables for relationships
CREATE TABLE Scene_Images (
    Scene_id INTEGER,
    Image_id INTEGER,
    PRIMARY KEY (Scene_id, Image_id)
);

CREATE TABLE Scene_Stars (
    Scene_id INTEGER,
    Star_id INTEGER,
    PRIMARY KEY (Scene_id, Star_id)
);

CREATE TABLE Scene_Dvds (
    Scene_id INTEGER,
    Dvd_id INTEGER,
    PRIMARY KEY (Scene_id, Dvd_id)
);

CREATE TABLE Scene_Categories (
    Scene_id INTEGER,
    Category_id INTEGER,
    PRIMARY KEY (Scene_id, Category_id)
);

CREATE TABLE Scene_Websites (
    Scene_id INTEGER,
    Website_id INTEGER,
    PRIMARY KEY (Scene_id, Website_id)
);

CREATE TABLE Scene_Genres (
    Scene_id INTEGER,
    Genre_id INTEGER,
    PRIMARY KEY (Scene_id, Genre_id)
);

CREATE TABLE Scene_Climaxes (
    Scene_id INTEGER,
    Climax_id INTEGER,
    PRIMARY KEY (Scene_id, Climax_id)
);

CREATE TABLE Scene_Links (
    Scene_id INTEGER,
    Link_id INTEGER,
    PRIMARY KEY (Scene_id, Link_id)
);

CREATE TABLE Star_Genres (
    Star_id INTEGER,
    Genre_id INTEGER,
    PRIMARY KEY (Star_id, Genre_id)
);

CREATE TABLE Star_Links (
    Star_id INTEGER,
    Link_id INTEGER,
    PRIMARY KEY (Star_id, Link_id)
);

CREATE TABLE Star_Images (
    Star_id INTEGER,
    Image_id INTEGER,
    PRIMARY KEY (Star_id, Image_id)
);

CREATE TABLE Genre_Categories (
    Genre_id INTEGER,
    Category_id INTEGER,
    PRIMARY KEY (Genre_id, Category_id)
);

CREATE TABLE Genre_Images (
    Genre_id INTEGER,
    Image_id INTEGER,
    PRIMARY KEY (Genre_id, Image_id)
);

CREATE TABLE Genre_Websites (
    Genre_id INTEGER,
    Website_id INTEGER,
    PRIMARY KEY (Genre_id, Website_id)
);

CREATE TABLE Genre_Links (
    Genre_id INTEGER,
    Link_id INTEGER,
    PRIMARY KEY (Genre_id, Link_id)
);

CREATE TABLE Category_Images (
    Category_id INTEGER,
    Image_id INTEGER,
    PRIMARY KEY (Category_id, Image_id)
);

CREATE TABLE Category_Websites (
    Category_id INTEGER,
    Website_id INTEGER,
    PRIMARY KEY (Category_id, Website_id)
);

CREATE TABLE Category_Links (
    Category_id INTEGER,
    Link_id INTEGER,
    PRIMARY KEY (Category_id, Link_id)
);

CREATE TABLE Dvd_Images (
    Dvd_id INTEGER,
    Image_id INTEGER,
    PRIMARY KEY (Dvd_id, Image_id)
);

CREATE TABLE Dvd_Genres (
    Dvd_id INTEGER,
    Genre_id INTEGER,
    PRIMARY KEY (Dvd_id, Genre_id)
);

CREATE TABLE Dvd_Categories (
    Dvd_id INTEGER,
    Category_id INTEGER,
    PRIMARY KEY (Dvd_id, Category_id)
);

CREATE TABLE Dvd_Websites (
    Dvd_id INTEGER,
    Website_id INTEGER,
    PRIMARY KEY (Dvd_id, Website_id)
);
