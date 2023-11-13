// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dentista',
});

// ... (resto del código de db.js)

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }else{connection.query("select * from obrasocial;", function(err,result){
    if(err){
      console.log(err);
    }else{
      for(var elemento of result){console.log(elemento)}
    }
  });}
  
});

function closeConnection() {
  connection.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión a la base de datos:', err);
    } else {
      console.log('Conexión cerrada correctamente');
    }
  });
}

function createTurno(turno) {
  const query = 'INSERT INTO turnos SET ?';

  connection.query(query, turno, (err, results) => {
    if (err) {
      console.error('Error al insertar turno:', err);
      return;
    }

    console.log('Nuevo turno insertado con ID:', results.insertId);
  });
}

function readTurnos() {
  const query = 'SELECT * FROM turnos';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta de turnos:', err);
      return;
    }

    console.log('Turnos obtenidos desde la base de datos:', results);
  });
}

function updateTurno(turnoId, updatedTurno) {
  const query = 'UPDATE turnos SET ? WHERE id = ?';

  connection.query(query, [updatedTurno, turnoId], (err, results) => {
    if (err) {
      console.error('Error al actualizar turno:', err);
      return;
    }

    console.log('Turno actualizado correctamente');
  });
}

function deleteTurno(turnoId) {
  const query = 'DELETE FROM turnos WHERE id = ?';

  connection.query(query, turnoId, (err, results) => {
    if(err) {
      console.error('Error al eliminar turno:', err);
      return;
    }

    console.log('Turno eliminado correctamente');
  });
}

module.exports = {
  connection,
  closeConnection,
  createTurno,
  readTurnos,
  updateTurno,
  deleteTurno,
};
