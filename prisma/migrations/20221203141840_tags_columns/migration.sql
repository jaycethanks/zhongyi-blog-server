/*
  Warnings:

  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `columns_on_articles` DROP FOREIGN KEY `columns_on_articles_column_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags_on_articles` DROP FOREIGN KEY `tags_on_articles_tag_id_fkey`;

-- DropTable
DROP TABLE `Column`;

-- DropTable
DROP TABLE `Tag`;

-- CreateTable
CREATE TABLE `t_column` (
    `colid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cover` VARCHAR(191) NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`colid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_tag` (
    `tagid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`tagid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `columns_on_articles` ADD CONSTRAINT `columns_on_articles_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `t_column`(`colid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_on_articles` ADD CONSTRAINT `tags_on_articles_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `t_tag`(`tagid`) ON DELETE RESTRICT ON UPDATE CASCADE;
