CREATE TABLE "book" (
  "id" serial PRIMARY KEY,
  "author_id" int,
  "title" varchar(100),
  "description" varchar(1000),
  "cover_url" varchar(200)
);

CREATE TABLE "author" (
  "id" serial PRIMARY KEY,
  "name" varchar(100)
);

CREATE TABLE "readlist" (
  "id" serial PRIMARY KEY,
  "book_id" int
);

CREATE TABLE "loanedlist" (
  "id" serial PRIMARY KEY,
  "book_id" int,
  "contact_id" int 
);

CREATE TABLE "contacts" (
  "id" serial PRIMARY KEY,
  "name" varchar(100),
  "date_loaned" varchar(100),
  "phone" varchar(100)
);

ALTER TABLE "book" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("id");
ALTER TABLE "readlist" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");
ALTER TABLE "loanedlist" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");
ALTER TABLE "loanedlist" ADD FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id");
ALTER TABLE "author" ADD UNIQUE ("name");
