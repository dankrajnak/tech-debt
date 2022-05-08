/*
  Warnings:

  - You are about to drop the column `workAround` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "workAround",
ADD COLUMN     "workArounds" TEXT[];
