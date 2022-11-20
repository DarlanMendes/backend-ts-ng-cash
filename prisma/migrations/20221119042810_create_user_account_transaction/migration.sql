/*
  Warnings:

  - You are about to drop the column `accountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `credited` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `debited` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `creditedAccountId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debitedAccountId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "accountId",
DROP COLUMN "credited",
DROP COLUMN "debited",
ADD COLUMN     "creditedAccountId" TEXT NOT NULL,
ADD COLUMN     "debitedAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
