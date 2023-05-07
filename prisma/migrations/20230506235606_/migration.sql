/*
  Warnings:

  - Made the column `createdAt` on table `assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `wallets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `wallets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "wallets" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;
