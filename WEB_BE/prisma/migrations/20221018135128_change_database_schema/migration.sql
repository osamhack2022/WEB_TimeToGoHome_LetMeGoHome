/*
  Warnings:

  - You are about to drop the column `hash_tag` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `post_time` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `is_done` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `is_done` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `is_share` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `army_rank` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `army_type` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashtag` to the `Share` table without a default value. This is not possible if the table is not empty.
  - Added the required column `armyRank` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `armyType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Share` DROP COLUMN `hash_tag`,
    DROP COLUMN `post_time`,
    ADD COLUMN `hashtag` VARCHAR(50) NOT NULL,
    ADD COLUMN `postTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `is_done`,
    ADD COLUMN `isDone` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `datetime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Todo` DROP COLUMN `is_done`,
    DROP COLUMN `is_share`,
    ADD COLUMN `isDone` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isShared` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `start` DATE NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `army_rank`,
    DROP COLUMN `army_type`,
    ADD COLUMN `armyRank` CHAR(10) NOT NULL,
    ADD COLUMN `armyType` CHAR(10) NOT NULL,
    ADD COLUMN `image` TEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
