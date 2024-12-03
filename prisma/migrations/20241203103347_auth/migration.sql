/*
  Warnings:

  - You are about to drop the column `expires` on the `reset_password_token` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `verification_token` table. All the data in the column will be lost.
  - Added the required column `expired` to the `reset_password_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired` to the `verification_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reset_password_token" DROP COLUMN "expires",
ADD COLUMN     "expired" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "verification_token" DROP COLUMN "expires",
ADD COLUMN     "expired" TIMESTAMP(3) NOT NULL;
