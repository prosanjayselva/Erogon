-- Add donor detail fields: PAN, address, bank name, transaction number
ALTER TABLE "donors" ADD COLUMN "pan" TEXT;
ALTER TABLE "donors" ADD COLUMN "address" TEXT;
ALTER TABLE "donors" ADD COLUMN "bank_name" TEXT;
ALTER TABLE "donors" ADD COLUMN "transaction_number" TEXT;
