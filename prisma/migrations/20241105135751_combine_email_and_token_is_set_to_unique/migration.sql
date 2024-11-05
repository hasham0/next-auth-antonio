/*
  Warnings:

  - A unique constraint covering the columns `[email,token]` on the table `verification_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "verification_token_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_email_token_key" ON "verification_token"("email", "token");
