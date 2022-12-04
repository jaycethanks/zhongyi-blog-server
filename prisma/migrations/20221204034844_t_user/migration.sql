-- AlterTable
ALTER TABLE `t_articles` ADD COLUMN `visible` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `t_user` (
    `userid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_articles` ADD CONSTRAINT `t_articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `t_user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
