/*
  Warnings:

  - You are about to drop the column `Anonymous` on the `Order` table. All the data in the column will be lost.
  - Added the required column `anonymous` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `Anonymous`,
    ADD COLUMN `anonymous` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OrderProduct` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `quantity` INTEGER NOT NULL;
