/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_religion_id_fkey";

-- DropTable
DROP TABLE "image";

-- CreateTable
CREATE TABLE "religion_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "religion_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "religion_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "religion_image" ADD CONSTRAINT "religion_image_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "religion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
