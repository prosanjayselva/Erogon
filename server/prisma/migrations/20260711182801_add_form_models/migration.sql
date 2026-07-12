-- CreateTable
CREATE TABLE "volunteers" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT,
    "area_of_interest" TEXT,
    "availability" TEXT,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_seekers" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "dob" TEXT,
    "gender" TEXT,
    "qualification" TEXT,
    "address" TEXT,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "experience" TEXT,
    "skills" TEXT,
    "preferred_role" TEXT,
    "preferred_industry" TEXT,
    "preferred_location" TEXT,
    "current_ctc" TEXT,
    "expected_ctc" TEXT,
    "notice_period" TEXT,
    "languages" TEXT,
    "resume" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_seekers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employers" (
    "id" SERIAL NOT NULL,
    "organization" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "designation" TEXT,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "industry_type" TEXT,
    "job_role" TEXT,
    "vacancies" INTEGER,
    "qualification" TEXT,
    "experience" TEXT,
    "salary_range" TEXT,
    "job_location" TEXT,
    "employment_type" TEXT,
    "expectations" TEXT,
    "jd" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_email_key" ON "newsletters"("email");
