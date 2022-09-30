/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `categories`;

-- CreateTable
CREATE TABLE `users` (
    `index` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(10) NOT NULL,
    `email_local` VARCHAR(64) NOT NULL,
    `email_domain` INTEGER UNSIGNED NOT NULL,
    `password` CHAR(60) NOT NULL,
    `army_type` TINYINT UNSIGNED NOT NULL,
    `army_rank` TINYINT UNSIGNED NOT NULL,
    `enlistment_date` DATE NOT NULL,
    `discharge_date` DATE NOT NULL,

    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todolists` (
    `index` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todos` (
    `index` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `todolist` BIGINT UNSIGNED NOT NULL,
    `content` VARCHAR(50) NOT NULL,
    `datetime` DATETIME NOT NULL,
    `is_done` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shares` (
    `todolist` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `image` VARCHAR(150) NOT NULL,
    `hit` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `like` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `datetime` DATETIME NOT NULL,

    PRIMARY KEY (`todolist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_domains` (
    `index` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `domain` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email_domains_domain_key`(`domain`),
    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `army_types` (
    `index` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` CHAR(9) NOT NULL,

    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `army_ranks` (
    `index` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `rank` CHAR(9) NOT NULL,

    PRIMARY KEY (`index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_email_domain_fkey` FOREIGN KEY (`email_domain`) REFERENCES `email_domains`(`index`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_army_type_fkey` FOREIGN KEY (`army_type`) REFERENCES `army_types`(`index`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_army_rank_fkey` FOREIGN KEY (`army_rank`) REFERENCES `army_ranks`(`index`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_todolist_fkey` FOREIGN KEY (`todolist`) REFERENCES `todolists`(`index`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shares` ADD CONSTRAINT `shares_todolist_fkey` FOREIGN KEY (`todolist`) REFERENCES `todolists`(`index`) ON DELETE RESTRICT ON UPDATE CASCADE;
