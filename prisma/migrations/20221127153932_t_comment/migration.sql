/*
  Warnings:

  - Added the required column `updated_at` to the `t_comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `article_id` on table `t_comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `t_comment` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `article_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `t_comment` ADD CONSTRAINT `t_comment_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;
