/*
  Warnings:

  - Added the required column `name` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "name" TEXT NOT NULL;
