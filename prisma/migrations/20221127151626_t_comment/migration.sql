-- CreateTable
CREATE TABLE `t_comment` (
    `comid` VARCHAR(191) NOT NULL,
    `content` TINYTEXT NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `agent` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `sort` INTEGER NOT NULL DEFAULT 0,
    `liking` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `article_id` VARCHAR(191) NULL,
    `article_title` VARCHAR(191) NULL,
    `article_description` VARCHAR(191) NULL,
    `parent` VARCHAR(191) NULL,
    `parent_id` VARCHAR(191) NULL,
    `parent_nickname` VARCHAR(191) NULL,

    PRIMARY KEY (`comid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
