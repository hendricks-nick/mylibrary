CREATE TABLE "location" (
    "location_id" serial   NOT NULL,
    "name" varchar(50)   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "location_id"
     )
);

CREATE TABLE "meat" (
    "meat_id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" varchar(50)   NOT NULL,
    "qty" varchar(50)   NULL,
    "other_notes" varchar(150)   NULL,
    CONSTRAINT "pk_meat" PRIMARY KEY (
        "meat_id"
     )
);

CREATE TABLE "dairy" (
    "dairy_id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" varchar(50)   NOT NULL,
    "qty" varchar(50)   NULL,
    "other_notes" varchar(150)   NULL,
    CONSTRAINT "pk_dairy" PRIMARY KEY (
        "dairy_id"
     )
);

CREATE TABLE "produce" (
    "produce_id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" varchar(50)   NOT NULL,
    "qty" varchar(50)   NULL,
    "other_notes" varchar(150)   NULL,
    CONSTRAINT "pk_produce" PRIMARY KEY (
        "produce_id"
     )
);

CREATE TABLE "grains" (
    "grains_id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" varchar(50)   NOT NULL,
    "qty" varchar(50)   NULL,
    "other_notes" varchar(150)   NULL,
    CONSTRAINT "pk_grains" PRIMARY KEY (
        "grains_id"
     )
);

CREATE TABLE "other" (
    "other_id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" varchar(50)   NOT NULL,
    "qty" varchar(50)   NULL,
    "other_notes" varchar(150)   NULL,
    CONSTRAINT "pk_other" PRIMARY KEY (
        "other_id"
     )
);

ALTER TABLE "meat" ADD CONSTRAINT "fk_meat_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("location_id");

ALTER TABLE "dairy" ADD CONSTRAINT "fk_dairy_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("location_id");

ALTER TABLE "produce" ADD CONSTRAINT "fk_produce_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("location_id");

ALTER TABLE "grains" ADD CONSTRAINT "fk_grains_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("location_id");

ALTER TABLE "other" ADD CONSTRAINT "fk_other_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("location_id");

