/*
  Warnings:

  - A unique constraint covering the columns `[appId]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "App_appId_key" ON "App"("appId");
