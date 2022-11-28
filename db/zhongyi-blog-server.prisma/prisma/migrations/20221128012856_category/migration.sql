/*
  Warnings:

  - The primary key for the `categories_on_articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `articleId` on the `categories_on_articles` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `categories_on_articles` table. All the data in the column will be lost.
  - Added the required column `article_id` to the `categories_on_articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `categories_on_articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categories_on_articles` DROP FOREIGN KEY `categories_on_articles_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `categories_on_articles` DROP FOREIGN KEY `categories_on_articles_categoryId_fkey`;

-- AlterTable
ALTER TABLE `categories_on_articles` DROP PRIMARY KEY,
    DROP COLUMN `articleId`,
    DROP COLUMN `categoryId`,
    ADD COLUMN `article_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`article_id`, `category_id`);

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `t_category`(`catid`) ON DELETE RESTRICT ON UPDATE CASCADE;
