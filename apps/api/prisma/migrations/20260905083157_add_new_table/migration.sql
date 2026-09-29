-- CreateTable
CREATE TABLE "RegistrationVerificationCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RegistrationVerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationVerificationCode_userId_key" ON "RegistrationVerificationCode"("userId");
