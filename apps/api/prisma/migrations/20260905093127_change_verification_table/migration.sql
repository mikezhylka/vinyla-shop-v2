/*
  Warnings:

  - You are about to drop the column `userId` on the `RegistrationVerificationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `RegistrationVerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `RegistrationVerificationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `RegistrationVerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RegistrationVerificationCode_userId_key";

-- AlterTable
ALTER TABLE "RegistrationVerificationCode" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationVerificationCode_email_key" ON "RegistrationVerificationCode"("email");
