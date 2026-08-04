CREATE TABLE "gallery_media" (
    "id" SERIAL NOT NULL,
    "activity_name" TEXT NOT NULL,
    "activity_date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "caption" TEXT,
    "media_type" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "gallery_media_pkey" PRIMARY KEY ("id")
);
