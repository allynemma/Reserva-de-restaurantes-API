import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function criarTabUsuarios () {
    const db = await open ({
        filename: './banco.db',
        driver: sqlite3.Database
    }) //abrindo conexão

    db.run(`CREATE TABLE IF NOT EXISTS usuarios 
        (id INTEGER PRIMARY KEY, nome TEXT,
         sobrenome TEXT, email TEXT UNIQUE,
          senha TEXT, papel TEXT)`)
}

async function InsereTabUsuarios (nome, sobrenome, email, senha, papel) {
    const db = await open ({
        filename: './banco.db',
        driver: sqlite3.Database
    }) 
    db.run(`INSERT INTO usuarios
    (nome, sobrenome, email, senha, papel)
    VALUES (?,?,?,?,?)`, [nome, sobrenome, email, senha, papel])
}

async function AttTabUsuarios(campo, campoAtt, id) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run(`UPDATE usuarios
            SET ${campo} = ${campoAtt}
            WHERE id = ${id}`)
}

async function DeletarConta(id) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run (`DELETE FROM usuarios WHERE id = ${id}`)
}

async function SelectLogin(email, senha) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run (`SELECT email, senha
            FROM usuarios
            WHERE email = ${email} AND senha =  ${senha}`)
}