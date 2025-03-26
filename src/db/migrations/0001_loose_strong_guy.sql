ALTER TABLE "business_hours" ADD COLUMN "monday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "tuesday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "wednesday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "thursday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "friday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "saturday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" ADD COLUMN "sunday_periods" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "monday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "tuesday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "wednesday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "thursday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "friday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "saturday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "sunday_status";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "monday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "tuesday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "wednesday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "thursday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "friday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "saturday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "sunday_opening";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "monday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "tuesday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "wednesday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "thursday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "friday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "saturday_closing";--> statement-breakpoint
ALTER TABLE "business_hours" DROP COLUMN IF EXISTS "sunday_closing";