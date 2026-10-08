CREATE TABLE "home_stats" (
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "home_stats_pkey" PRIMARY KEY ("key")
);

INSERT INTO "home_stats" ("key", "value") VALUES
    ('lives-impacted', 373),
    ('free-medical-camp', 1),
    ('education-support', 3),
    ('meals-served', 160),
    ('trees-planted', 41),
    ('placement-support', 0),
    ('women-empowered', 0),
    ('youth-skilled', 0),
    ('animals-rescued', 0);
