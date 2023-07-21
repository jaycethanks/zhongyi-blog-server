/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `t_about` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `t_about_userid_key` ON `t_about`(`userid`);
