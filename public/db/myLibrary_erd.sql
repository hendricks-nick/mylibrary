CREATE TABLE "book" (
  "book_id" serial PRIMARY KEY,
  "author_id" int,
  "name" varchar(100),
  "desc" varchar(500),
  "cover_url" varchar(100),
  "wish_list" boolean,
  "read_list" boolean,
  "loaned_out" boolean,
  "loaned_who" varchar(100)
);

CREATE TABLE "author" (
  "author_id" serial PRIMARY KEY,
  "name" varchar(100)
);

ALTER TABLE "book" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("author_id");
