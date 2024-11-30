-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_place_id_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `image_url` VARCHAR(191) NULL,
    MODIFY `city_id` INTEGER NULL,
    MODIFY `place_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
