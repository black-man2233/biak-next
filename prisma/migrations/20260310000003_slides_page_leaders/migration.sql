ALTER TABLE "SlideImage" ADD COLUMN "page" TEXT NOT NULL DEFAULT 'home';

CREATE TABLE "Leader" (
  "id"        TEXT    NOT NULL PRIMARY KEY,
  "name"      TEXT    NOT NULL,
  "role"      TEXT    NOT NULL,
  "bio"       TEXT,
  "imageUrl"  TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  "isActive"  BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
