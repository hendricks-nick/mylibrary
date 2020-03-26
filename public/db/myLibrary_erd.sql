CREATE TABLE "book" (
  "book_id" serial PRIMARY KEY,
  "author_id" int,
  "title" varchar(100),
  "description" varchar(3000),
  "cover_url" varchar(200),
  "loaned" boolean,
  "readlist" boolean
);

CREATE TABLE "author" (
  "author_id" serial PRIMARY KEY,
  "name" varchar(100)
);

CREATE TABLE "loanedlist" (
  "ll_id" serial PRIMARY KEY,
  "book_id" int,
  "contact_id" int 
);

CREATE TABLE "contact" (
  "contact_id" serial PRIMARY KEY,
  "name" varchar(100),
  "date_loaned" varchar(100),
  "phone" varchar(100)
);

ALTER TABLE "book" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("author_id");
ALTER TABLE "loanedlist" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("book_id");
ALTER TABLE "loanedlist" ADD FOREIGN KEY ("contact_id") REFERENCES "contact" ("contact_id");
ALTER TABLE "author" ADD UNIQUE ("name");
