const fs = require('fs');
require('dotenv').config();

function readArticleFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('dane.txt', 'utf-8', (err, data) => {
      if (err) reject('Błąd podczas wczytywania pliku: ' + err);
      else resolve(data);
    });
  });
}

readArticleFile()
  .then((articleContent) => {
    console.log('Zawartość pliku dane.txt:', articleContent);
  })
  .catch((error) => {
    console.error('Błąd:', error);
  });
