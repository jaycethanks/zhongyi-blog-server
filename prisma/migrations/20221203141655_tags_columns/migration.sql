/*
  Warnings:

  - You are about to drop the column `relate_cout` on the `t_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_category` DROP COLUMN `relate_cout`,
    ADD COLUMN `relate_count` INTEGER NULL DEFAULT 0,
    ADD COLUMN `visible` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `Column` (
    `colid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cover` VARCHAR(191) NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`colid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `columns_on_articles` (
    `article_id` VARCHAR(191) NOT NULL,
    `column_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`article_id`, `column_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tagid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`tagid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_on_articles` (
    `article_id` VARCHAR(191) NOT NULL,
    `tag_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`article_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `columns_on_articles` ADD CONSTRAINT `columns_on_articles_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `columns_on_articles` ADD CONSTRAINT `columns_on_articles_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `Column`(`colid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_on_articles` ADD CONSTRAINT `tags_on_articles_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_on_articles` ADD CONSTRAINT `tags_on_articles_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`tagid`) ON DELETE RESTRICT ON UPDATE CASCADE;
