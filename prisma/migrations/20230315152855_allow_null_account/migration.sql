-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_accountId_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `accountId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
