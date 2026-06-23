-- CreateTable
CREATE TABLE "contact_sales_requests" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "workEmail" TEXT NOT NULL,
    "phone" TEXT,
    "plan" TEXT,
    "country" TEXT,
    "companyWebsite" TEXT,
    "companyName" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_sales_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_leads_pkey" PRIMARY KEY ("id")
);
