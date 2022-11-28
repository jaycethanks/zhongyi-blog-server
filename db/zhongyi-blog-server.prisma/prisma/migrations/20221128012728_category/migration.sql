/*
  Warnings:

  - You are about to drop the column `categories` on the `t_articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_articles` DROP COLUMN `categories`;

-- CreateTable
CREATE TABLE `t_category` (
    `catid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `relate_cout` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`catid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_articles` (
    `articleId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`articleId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `t_category`(`catid`) ON DELETE RESTRICT ON UPDATE CASCADE;
