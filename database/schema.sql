set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL unique,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
);



CREATE TABLE "public"."listings" (
	"listingId" serial NOT NULL,
	"userId" integer NOT NULL,
	"category" TEXT NOT NULL,
	"brand" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"size" TEXT NOT NULL,
	"condition" TEXT NOT NULL,
	"images" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phoneNumber" TEXT,
	"lastUpdated" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "listings_pk" PRIMARY KEY ("listingId")
);



ALTER TABLE "listings" ADD CONSTRAINT "listings_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
