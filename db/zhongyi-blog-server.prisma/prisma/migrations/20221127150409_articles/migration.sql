/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `t_blacklist` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `keyword` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles` (
    `artid` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `content` LONGTEXT NOT NULL,
    `keywords` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 0,
    `cover` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NULL,
    `allow_comment` BOOLEAN NOT NULL DEFAULT true,
    `liking` INTEGER NOT NULL DEFAULT 0,
    `readers` INTEGER NOT NULL DEFAULT 0,
    `banner` INTEGER NOT NULL DEFAULT -1,
    `categories` VARCHAR(191) NOT NULL DEFAULT '[]',

    UNIQUE INDEX `Articles_order_key`(`order`),
    PRIMARY KEY (`artid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
