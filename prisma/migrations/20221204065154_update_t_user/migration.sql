/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `t_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `t_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `t_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `t_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_user` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `t_user_phone_key` ON `t_user`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `t_user_email_key` ON `t_user`(`email`);
