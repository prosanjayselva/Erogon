-- Split gallery media into separate image and video tables with separate storage.
CREATE TABLE "gallery_images" (
    "id" SERIAL NOT NULL,
    "activity_name" TEXT NOT NULL,
    "activity_date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "caption" TEXT,
    "media" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "gallery_videos" (
    "id" SERIAL NOT NULL,
    "activity_name" TEXT NOT NULL,
    "activity_date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "caption" TEXT,
    "media" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "gallery_videos_pkey" PRIMARY KEY ("id")
);

-- The old combined table is empty and no longer used.
DROP TABLE "gallery_media";
