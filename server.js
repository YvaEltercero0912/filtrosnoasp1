const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'locoxriver22xdxd22', // Cambia 'password' por tu contraseña real
    database: 'productosDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
    const { codigo, descripcion, marca, precio, imagen } = req.body;

    const query = 'INSERT INTO productos (codigo, descripcion, marca, precio, imagen) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [codigo, descripcion, marca, precio, imagen], (err, result) => {
        if (err) {
            console.error('Error insertando producto: ', err);
            res.status(500).send('Error al agregar el producto');
        } else {
            res.status(200).send('Producto agregado exitosamente');
        }
    });
});

// Ruta para obtener productos con o sin filtro de búsqueda
app.get('/productos', (req, res) => {
    const busqueda = req.query.busqueda || ''; // Obtener el término de búsqueda de la query string

    let query = 'SELECT * FROM productos';
    let queryParams = [];

    // Si hay un término de búsqueda, ajustamos la query para buscar por descripción, marca o código
    if (busqueda) {
        query += ' WHERE descripcion LIKE ? OR marca LIKE ? OR codigo LIKE ?';
        queryParams = [`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`]; // Usamos % para búsqueda parcial
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error al obtener productos: ', err);
            res.status(500).send('Error al obtener productos');
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener producto: ', err);
            res.status(500).send('Error al obtener el producto');
        } else {
            res.json(results[0]);
        }
    });
});

// Ruta para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { codigo, descripcion, marca, precio, imagen } = req.body;

    const query = 'UPDATE productos SET codigo = ?, descripcion = ?, marca = ?, precio = ?, imagen = ? WHERE id = ?';
    connection.query(query, [codigo, descripcion, marca, precio, imagen, id], (err, result) => {
        if (err) {
            console.error('Error actualizando producto: ', err);
            res.status(500).send('Error al actualizar el producto');
        } else {
            res.status(200).send('Producto actualizado exitosamente');
        }
    });
});

// Ruta para borrar un producto
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM productos WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al borrar producto: ', err);
            res.status(500).send('Error al eliminar el producto');
        } else {
            res.status(200).send('Producto eliminado exitosamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
