-- CreateTable
CREATE TABLE `Box` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `stock_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Box` ADD CONSTRAINT `Box_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
