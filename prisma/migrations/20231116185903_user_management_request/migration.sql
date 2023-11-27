-- CreateTable
CREATE TABLE "UserManagementRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmationCode" TEXT NOT NULL,
    "dateExpires" TIMESTAMP(3) NOT NULL,
    "appId" INTEGER NOT NULL,
    "changeRequest" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateCompleted" TIMESTAMP(3),
    "dateConfirmed" TIMESTAMP(3),

    CONSTRAINT "UserManagementRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserManagementRequest" ADD CONSTRAINT "UserManagementRequest_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
