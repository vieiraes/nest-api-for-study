/*
  Warnings:

  - You are about to drop the column `amount` on the `wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "walletId" TEXT;

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "amount",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
