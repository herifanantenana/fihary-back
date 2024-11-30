-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'STOCK_ADMIN') NOT NULL DEFAULT 'SUPER_ADMIN',

    UNIQUE INDEX `admins_email_key`(`email`),
    UNIQUE INDEX `admins_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
