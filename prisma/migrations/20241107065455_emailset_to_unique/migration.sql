/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `reset_password_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_email_key" ON "reset_password_token"("email");
