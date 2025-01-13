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

async function PopularTabUsuarios (nome, sobrenome, email, senha, papel) {
    const db = await open ({
        filename: './banco.db',
        driver: sqlite3.Database
    }) 
    db.run(`INSERT INTO usuarios
    (nome, sobrenome, email, senha, papel)
    VALUES (?,?,?,?,?)`, [nome, sobrenome, email, senha, papel])
}

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

async function DeletarTab (nmTabela) {
    const db = await open ({
        filename: 'banco.db',
        driver: sqlite3.Database
    })

    db.run(`DROP TABLE ${[nmTabela]}`)
}

async function criarTabReservas () {
    const db = await open ({
        filename: "./banco.db",
        driver: sqlite3.Database
    })

    db.run(`CREATE TABLE IF NOT EXISTS reservas
        (id INTEGER PRIMARY KEY, usuario_id INTEGER,
         mesa_id, data_reserva TEXT, ativo INTEGER,
         FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
         FOREIGN KEY (mesa_id) REFERENCES mesa(id))`) 
}

async function PopularTabReservas(usuario_id, mesa_id, data_reserva, ativo) {
    const db = await open ({
        filename: "banco.db",
        driver: sqlite3.Database
    })
    db.run (`INSERT INTO reservas (usuario_id, mesa_id, data_reserva, ativo)
            VALUES (?,?,?,?)`, [usuario_id, mesa_id, data_reserva, ativo])
}

criarTabUsuarios();
criarTabMesa();
criarTabReservas();
//PopularTabUsuarios('Allyne', 'Alves', 'allynemmalves@gmail.com', '123456', 'adm');
//PopularTabMesa(20, 4, 1);

//DeletarTab('usuarios');