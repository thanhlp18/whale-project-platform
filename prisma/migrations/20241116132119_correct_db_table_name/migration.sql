/*
  Warnings:

  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Religion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_religion_id_fkey";

-- DropTable
DROP TABLE "BlogPost";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Religion";

-- CreateTable
CREATE TABLE "religion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT,
    "description" TEXT,
    "special_festival" TEXT,
    "reference_sources" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "religion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "religion_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_post" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userpic" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "religion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
