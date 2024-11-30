/*
  Warnings:

  - Made the column `stock_id` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_stock_id_fkey`;

-- AlterTable
ALTER TABLE `admins` MODIFY `stock_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
