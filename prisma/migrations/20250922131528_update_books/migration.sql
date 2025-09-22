-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "codLivro" TEXT,
    "dataEmprestimo" DATETIME,
    "dataEntrega" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_livro" ("author", "codLivro", "createdAt", "dataEmprestimo", "dataEntrega", "description", "id", "title", "updatedAt") SELECT "author", "codLivro", "createdAt", "dataEmprestimo", "dataEntrega", "description", "id", "title", "updatedAt" FROM "livro";
DROP TABLE "livro";
ALTER TABLE "new_livro" RENAME TO "livro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
