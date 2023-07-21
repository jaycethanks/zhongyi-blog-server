/*
  Warnings:

  - Made the column `links` on table `t_about` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `t_about` MODIFY `links` LONGTEXT NOT NULL;
