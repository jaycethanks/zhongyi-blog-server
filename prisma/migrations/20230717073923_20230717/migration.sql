-- DropForeignKey
ALTER TABLE `t_articles` DROP FOREIGN KEY `t_articles_catid_fkey`;

-- AlterTable
ALTER TABLE `t_articles` MODIFY `catid` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `t_about` (
    `id` VARCHAR(191) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `links` VARCHAR(191) NULL,
    `userid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `t_about_msg_key`(`msg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_articles` ADD CONSTRAINT `t_articles_catid_fkey` FOREIGN KEY (`catid`) REFERENCES `t_category`(`catid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_about` ADD CONSTRAINT `t_about_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
