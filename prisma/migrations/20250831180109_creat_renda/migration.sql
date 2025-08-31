-- CreateTable
CREATE TABLE "renda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rendaMensal" REAL NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "documentoUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "renda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
