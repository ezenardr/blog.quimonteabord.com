CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"author_name" text NOT NULL,
	"author_id" text NOT NULL,
	"post_id" text NOT NULL,
	"created_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	"updated_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	CONSTRAINT "comment_comment_id_unique" UNIQUE("comment_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"author_name" text NOT NULL,
	"count" serial NOT NULL,
	"post_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"post_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"text" text NOT NULL,
	"image" text NOT NULL,
	"author_name" text NOT NULL,
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	"updated_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	CONSTRAINT "post_post_id_unique" UNIQUE("post_id"),
	CONSTRAINT "post_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"image" text,
	"emailVerified" boolean DEFAULT false,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	"updated_at" timestamp DEFAULT '2023-10-26 15:25:40.310',
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
