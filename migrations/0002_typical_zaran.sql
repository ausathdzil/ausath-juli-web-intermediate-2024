ALTER TABLE "reviews" ALTER COLUMN "movie_id" SET DATA TYPE integer USING movie_id::INTEGER;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE integer USING rating::INTEGER;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_movie_id_unique" UNIQUE("user_id","movie_id");