/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Category_categoryId_key` ON `category`;

-- DropIndex
DROP INDEX `Product_productId_key` ON `product`;

-- DropIndex
DROP INDEX `User_userId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `cartId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,

    UNIQUE INDEX `Cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartProducts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CartProducts_AB_unique`(`A`, `B`),
    INDEX `_CartProducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_cartId_key` ON `User`(`cartId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
