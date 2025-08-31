import Database from './database.js';
 
 async function up() {
   const db = await Database.connect();
    
      const livroSql = `
          CREATE TABLE livro (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                      title VARCHAR(50) NOT NULL,
                            author VARCHAR(50) NOT NULL,
                                  description VARCHAR(50) NOT NULL
                                      )
                                        `;
                                         
                                           await db.run(livroSql);
                                           }
                                            
                                            export default { up };
 