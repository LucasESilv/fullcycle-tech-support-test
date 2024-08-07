const express = require('express');
const app = express();
const mysql = require('mysql');

const port = 3000;

const config = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'database'
};

const connection = mysql.createConnection(config);

function sqlInsert(connection) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO people(name) VALUES ?';
    const peoples = [['Obi-Wan Kenobi'], ['R2-D2'], ['Darth Vader']];
    connection.query(sql, [peoples], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Foram inseridas ${result.affectedRows} pessoas!`);
        resolve(result);
      }
    });
  });
}

function sqlSelect(connection) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM people';
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const insert = sqlInsert(connection);

insert
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error('Erro ao inserir dados:', err);
  });

const listPeople = async () => {
  try {
    const allPeople = await sqlSelect(connection);
    console.log(allPeople);
    return allPeople;
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    return [];
  }
};

app.get('/', async (req, res) => {
  try {
    const peoples = await listPeople();
    const listPeoples = '<ul>' + peoples.map(item => `<li align="center">${item.name}</li>`).join('') + '</ul>';
    res.send(`<h1 align="center">Full Cycle Rocks!</h1>\n${listPeoples}`);
  } catch (err) {
    res.status(500).send('Erro ao carregar dados');
  }
});

app.listen(port, () => {
  console.log(`Ouvindo na porta: ${port}`);
});
