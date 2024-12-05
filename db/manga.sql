-- Active: 1728980755737@@127.0.0.1@3306@mangastore
USE mangastore;

DROP TABLE IF EXISTS manga;

CREATE TABLE manga (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) DEFAULT NULL,
    volumes INT DEFAULT NULL,
    chapters INT DEFAULT NULL,
    author VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL
);

INSERT INTO manga (title, genre, volumes, chapters, author) VALUES
('One Piece', 'Adventure', 105, 1095, 'Eiichiro Oda'),
('Naruto', 'Action', 72, 700, 'Masashi Kishimoto'),
('Bleach', 'Supernatural', 74, 686, 'Tite Kubo'),
('Attack on Titan', 'Dark Fantasy', 34, 139, 'Hajime Isayama'),
('My Hero Academia', 'Superhero', 38, 406, 'Kohei Horikoshi'),
('Demon Slayer', 'Adventure', 23, 205, 'Koyoharu Gotouge'),
('Death Note', 'Psychological', 12, 108, 'Tsugumi Ohba'),
('Dragon Ball', 'Martial Arts', 42, 519, 'Akira Toriyama'),
('Spy x Family', 'Comedy', 14, 76, 'Tatsuya Endo'),
('Tokyo Revengers', 'Action', 31, 278, 'Ken Wakui');


CREATE TABLE chapter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the chapter
    manga_id BIGINT NOT NULL,              -- Foreign key linking to the manga table
    chapter_no INT NOT NULL,               -- Chapter number within the manga
    title VARCHAR(255) NOT NULL,           -- Title of the chapter
    pdf_path VARCHAR(255),                 -- Path to the PDF file for the chapter
    CONSTRAINT fk_manga_id FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
    UNIQUE (manga_id, chapter_no)          -- Ensure no duplicate chapter_no for the same manga_id
);

