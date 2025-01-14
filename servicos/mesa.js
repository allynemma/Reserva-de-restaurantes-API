import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function criarTabMesa () {
    const db = await open ({
        filename: 'banco.db',
        driver: sqlite3.Database
    })

    db.run(`CREATE TABLE IF NOT EXISTS mesa (id INTEGER PRIMARY KEY, numero NUMBER UNIQUE, capacidade NUMBER, status NUMBER)`)
}

async function PopularTabMesa(numero, capacidade, status) {
    const db = await open ({
        filename: "banco.db",
        driver: sqlite3.Database
    })
    db.run(`INSERT INTO mesas (numero, capacidade, status) VALUES (?,?,?)`, [numero, capacidade, status])
}

async function AttTabUsuarios(campo, campoAtt, id) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run(`UPDATE mesa
            SET ${campo} = ${campoAtt}
            WHERE id = ${id}`)
}

async function DeletarMesa(id) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run (`DELETE FROM mesa WHERE id = ${id}`)
}