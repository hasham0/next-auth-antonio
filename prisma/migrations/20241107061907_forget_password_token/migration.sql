-- CreateTable
CREATE TABLE "reset_password_token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reset_password_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_token_key" ON "reset_password_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_email_token_key" ON "reset_password_token"("email", "token");
