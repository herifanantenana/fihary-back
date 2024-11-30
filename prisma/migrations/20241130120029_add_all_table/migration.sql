/*
  Warnings:

  - You are about to drop the column `email` on the `boxes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ref]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ref]` on the table `boxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `boxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ref]` on the table `stocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ref` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref` to the `boxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admins` ADD COLUMN `ref` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `boxes` DROP COLUMN `email`,
    ADD COLUMN `ref` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stocks` ADD COLUMN `ref` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price_unit` INTEGER NOT NULL,
    `unity` ENUM('KILO', 'UNITY', 'BOT') NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `products_ref_key`(`ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `stock_products_ref_key`(`ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `box_commands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'LIVERED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `box_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    UNIQUE INDEX `box_commands_ref_key`(`ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `box_command_Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `box_command_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `city_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,

    UNIQUE INDEX `users_ref_key`(`ref`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_commands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'LIVERED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `phone_number` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `net_amount` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,
    `spots` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_commands_ref_key`(`ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_command_Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_command_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admins_ref_key` ON `admins`(`ref`);

-- CreateIndex
CREATE UNIQUE INDEX `boxes_ref_key` ON `boxes`(`ref`);

-- CreateIndex
CREATE UNIQUE INDEX `boxes_phone_number_key` ON `boxes`(`phone_number`);

-- CreateIndex
CREATE UNIQUE INDEX `stocks_ref_key` ON `stocks`(`ref`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_products` ADD CONSTRAINT `stock_products_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_products` ADD CONSTRAINT `stock_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `box_commands` ADD CONSTRAINT `box_commands_box_id_fkey` FOREIGN KEY (`box_id`) REFERENCES `boxes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `box_command_Items` ADD CONSTRAINT `box_command_Items_box_command_id_fkey` FOREIGN KEY (`box_command_id`) REFERENCES `box_commands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `box_command_Items` ADD CONSTRAINT `box_command_Items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_commands` ADD CONSTRAINT `user_commands_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_commands` ADD CONSTRAINT `user_commands_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_commands` ADD CONSTRAINT `user_commands_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_command_Items` ADD CONSTRAINT `user_command_Items_user_command_id_fkey` FOREIGN KEY (`user_command_id`) REFERENCES `user_commands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_command_Items` ADD CONSTRAINT `user_command_Items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
