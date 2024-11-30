/*
  Warnings:

  - Added the required column `place_id` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boxes` ADD COLUMN `place_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `boxes` ADD CONSTRAINT `boxes_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
