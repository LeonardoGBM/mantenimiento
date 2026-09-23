const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mantenimiento",
    password: "123",
    port: 5432
});

app.get('/revision', async (req, res) => {
    const resultado = await pool.query(
        'SELECT * FROM revision'
    );
    res.json(resultado.rows);
})

app.post('/revision', async (req, res) => {
    const { kilometraje, filtroaire, cambioaceite, tipoaceite, marca } = req.body;
    if (!kilometraje || !filtroaire || !cambioaceite || !tipoaceite || !marca) {
        return res.status(404).json({
            mensaje: 'Los campos deben estar llenos'
        })    
    }
    const resultado = await pool.query(
        'INSTER INTO revision (kilometraje, filtroaire, cambioaceite, tipoaceite, marca) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [kilometraje, filtroaire, cambioaceite, tipoaceite, marca]
    );
    res.json(resultado.rows[0])
})

app.listen(5000, () => {
    console.log('Puerto funcionando')
})