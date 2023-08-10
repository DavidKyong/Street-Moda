set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL unique,
	"hashedPassword" TEXT NOT NULL,
  "email" TEXT NOT NULL ,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
);



CREATE TABLE "public"."listings" (
	"listingId" serial NOT NULL,
	"userId" integer NOT NULL,
	"category" TEXT not null,
	"brand" TEXT not null,
	"name" TEXT not null,
	"description" TEXT not null,
	"price" integer not null,
	"size" TEXT not null,
	"condition" TEXT not null,
	"images" TEXT not null,
	"contact" TEXT not null,
	"lastUpdated" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "listings_pk" PRIMARY KEY ("listingId")
);



ALTER TABLE "listings" ADD CONSTRAINT "listings_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
