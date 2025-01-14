import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

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

async function DeletarReserva(id) {
    const db = await open ({
        filename: '../banco.db',
        driver: sqlite3.Database
    })
    db.run (`DELETE FROM reservas WHERE id = ${id}`)
}
