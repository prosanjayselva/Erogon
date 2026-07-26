-- AlterTable
ALTER TABLE "events" ADD COLUMN     "reminder_days_before" INTEGER;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "event_id" INTEGER;
