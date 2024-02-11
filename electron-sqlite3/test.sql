-- CREATE TABLE manga(title,rank,chapters,volumes);

-- SELECT * FROM manga;

-- ALTER TABLE manga ADD COLUMN season TEXT;

-- INSERT INTO manga (title, rank, chapters, volumes)
-- VALUES ('Horimiya',120,125,17);

-- DELETE FROM manga WHERE title = 'Horimiya';

-- UPDATE manga SET rank = 99 WHERE title = 'Horimiya';






CREATE TABLE characters (
  id INTEGER PRIMARY KEY UNIQUE,
  name TEXT NOT NULL
);

INSERT INTO characters (id, name)
VALUES (1234,'Kyouko Hori');

SELECT * FROM characters;

-- DROP TABLE characters;