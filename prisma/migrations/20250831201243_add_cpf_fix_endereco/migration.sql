/*
  Warnings:

  - You are about to drop the column `enedereco` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `renda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_renda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "rendaMensal" REAL NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "documentoUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "renda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_renda" ("documentoUrl", "id", "rendaMensal", "tipoDocumento", "userId") SELECT "documentoUrl", "id", "rendaMensal", "tipoDocumento", "userId" FROM "renda";
DROP TABLE "renda";
ALTER TABLE "new_renda" RENAME TO "renda";
CREATE UNIQUE INDEX "renda_email_key" ON "renda"("email");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_user" ("dataNascimento", "email", "id", "nome", "password") SELECT "dataNascimento", "email", "id", "nome", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
