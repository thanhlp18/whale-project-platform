/*
  Warnings:

  - You are about to drop the column `accessToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_id,provider_account_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[access_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_type` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "account_providerId_providerAccountId_key";

-- DropIndex
DROP INDEX "session_accessToken_key";

-- DropIndex
DROP INDEX "session_sessionToken_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpires",
DROP COLUMN "createdAt",
DROP COLUMN "providerAccountId",
DROP COLUMN "providerId",
DROP COLUMN "providerType",
DROP COLUMN "refreshToken",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "access_token_expires" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "provider_id" TEXT NOT NULL,
ADD COLUMN     "provider_type" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "accessToken",
DROP COLUMN "createdAt",
DROP COLUMN "sessionToken",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_id_provider_account_id_key" ON "account"("provider_id", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "session_access_token_key" ON "session"("access_token");
