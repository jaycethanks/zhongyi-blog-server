-- CreateTable
CREATE TABLE `t_blacklist` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `keyword` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_user` (
    `userid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `t_user_phone_key`(`phone`),
    UNIQUE INDEX `t_user_email_key`(`email`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_articles` (
    `artid` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL DEFAULT 0,
    `author_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `content` LONGTEXT NOT NULL,
    `keywords` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 0,
    `cover` VARCHAR(191) NOT NULL DEFAULT '',
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `password` VARCHAR(191) NULL,
    `allow_comment` BOOLEAN NOT NULL DEFAULT true,
    `liking` INTEGER NOT NULL DEFAULT 0,
    `readers` INTEGER NOT NULL DEFAULT 0,
    `banner` INTEGER NOT NULL DEFAULT -1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`artid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `article_id` VARCHAR(191) NOT NULL,
    `article_title` VARCHAR(191) NULL,
    `article_description` VARCHAR(191) NULL,
    `parent` VARCHAR(191) NULL,
    `parent_id` VARCHAR(191) NULL,
    `parent_nickname` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`comid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_category` (
    `catid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `relate_count` INTEGER NULL DEFAULT 0,
    `userid` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `t_category_name_key`(`name`),
    PRIMARY KEY (`catid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_articles` (
    `artid` VARCHAR(191) NOT NULL,
    `catid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artid`, `catid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_column` (
    `colid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cover` VARCHAR(191) NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,
    `userid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `t_column_name_key`(`name`),
    PRIMARY KEY (`colid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `columns_on_articles` (
    `artid` VARCHAR(191) NOT NULL,
    `colid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artid`, `colid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_tag` (
    `tagid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `relate_count` INTEGER NULL DEFAULT 0,
    `userid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `t_tag_name_key`(`name`),
    PRIMARY KEY (`tagid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_on_articles` (
    `artid` VARCHAR(191) NOT NULL,
    `tagid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artid`, `tagid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_articles` ADD CONSTRAINT `t_articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_comment` ADD CONSTRAINT `t_comment_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_category` ADD CONSTRAINT `t_category_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_artid_fkey` FOREIGN KEY (`artid`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_articles` ADD CONSTRAINT `categories_on_articles_catid_fkey` FOREIGN KEY (`catid`) REFERENCES `t_category`(`catid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_column` ADD CONSTRAINT `t_column_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `columns_on_articles` ADD CONSTRAINT `columns_on_articles_artid_fkey` FOREIGN KEY (`artid`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `columns_on_articles` ADD CONSTRAINT `columns_on_articles_colid_fkey` FOREIGN KEY (`colid`) REFERENCES `t_column`(`colid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_tag` ADD CONSTRAINT `t_tag_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_on_articles` ADD CONSTRAINT `tags_on_articles_artid_fkey` FOREIGN KEY (`artid`) REFERENCES `t_articles`(`artid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_on_articles` ADD CONSTRAINT `tags_on_articles_tagid_fkey` FOREIGN KEY (`tagid`) REFERENCES `t_tag`(`tagid`) ON DELETE RESTRICT ON UPDATE CASCADE;
