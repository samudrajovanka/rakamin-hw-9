/*
  Warnings:

  - Made the column `id` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genres` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "id" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "genres" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
