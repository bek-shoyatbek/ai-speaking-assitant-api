/*
  Warnings:

  - You are about to drop the column `topicId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `category` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('PART1', 'PART2', 'PART3');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topicId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "topicId",
ADD COLUMN     "category" "QuestionCategory" NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;
