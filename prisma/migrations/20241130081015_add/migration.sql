/*
  Warnings:

  - You are about to drop the `box` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `box` DROP FOREIGN KEY `Box_stock_id_fkey`;

-- DropTable
DROP TABLE `box`;

-- CreateTable
CREATE TABLE `boxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `stock_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boxes` ADD CONSTRAINT `boxes_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
