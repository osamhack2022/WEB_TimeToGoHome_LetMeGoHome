-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `army_type` CHAR(10) NOT NULL,
    `army_rank` CHAR(10) NOT NULL,
    `enlistment` DATE NOT NULL,
    `discharge` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `goal` VARCHAR(50) NOT NULL,
    `duration` INTEGER NOT NULL,
    `start` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end` DATE NOT NULL,
    `is_done` BOOLEAN NOT NULL DEFAULT false,
    `is_share` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Todo_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `todoId` INTEGER UNSIGNED NOT NULL,
    `content` VARCHAR(50) NOT NULL,
    `datetime` DATE NOT NULL,
    `is_done` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Todo_todoId_fkey`(`todoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Share` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `todoId` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `image` TEXT NOT NULL,
    `hit` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `like` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `hash_tag` VARCHAR(50) NOT NULL,
    `post_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Share_todoId_key`(`todoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
