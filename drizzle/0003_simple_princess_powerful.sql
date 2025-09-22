ALTER TABLE "jobs" ADD COLUMN "salary" varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_min";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_max";