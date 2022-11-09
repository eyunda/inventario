const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const asciify = require('asciify-image')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'proyecto_inventario'
}


app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM login WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username,
					"picture": result[0].picture,
					"isAuth": true
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

//el inventario

app.get('/api/listar', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM todo", (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.post('/api/eliminar', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM todo WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Inventario Eliminado" })
		}
	})
	connection.end()
})

app.post('/api/guardar', (req, res) => {
	nDate = new Date().toLocaleString('en-CO', {
        timeZone: 'America/Bogota'
    });
    
    console.log(nDate);
    const { referencia, cantidad, marca, descripcion, precio, fecha } = req.body
    const params = [
        [referencia, cantidad, marca, descripcion, precio, fecha]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO todo ( referencia, cantidad, marca, descripcion, precio, fecha ) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Inventarios creado" })
        }
    })
    connection.end()
})

app.post('/api/editar', (req, res) => {
	const { id, referencia, cantidad, marca, descripcion, precio } = req.body
	const params = [referencia, cantidad, marca, descripcion, precio, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE todo set referencia = ?, cantidad = ?, marca = ?, descripcion = ?, precio = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Inventario editado" })
		}
	})
	connection.end()
})

//el inventario de ventas

app.get('/api/listarven', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT v.id, v.usuario, t.referencia, v.cantidad, v.fecha FROM ventas v, todo t WHERE v.referencia = t.id", (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})


app.post('/api/eliminarven', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM ventas WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Inventario Eliminado" })
		}
	})
	connection.end()
})

app.post('/api/guardarven', (req, res) => {
	
    const { usuario, referencia, cantidad, fecha } = req.body
    const params = [
        [usuario, referencia, cantidad, fecha]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO ventas ( usuario, referencia, cantidad, fecha ) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Inventarios creado" })
        }
    })
    connection.end()
})

app.post('/api/editarven', (req, res) => {
	const { id, usuario, referencia, cantidad, fecha } = req.body
	const params = [usuario, referencia, cantidad, fecha, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE ventas set usuario = ?, referencia = ?, cantidad = ?, fecha = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Inventario editado" })
		}
	})
	connection.end()
})
app.listen(4000, async () => {
	
	console.log(figlet.textSync('Inventario'))
})