const express = require('express');
const cors = require('cors'); // Импортируем cors
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Используем cors для разрешения запросов с других доменов
app.use(cors());

// Middleware для обработки данных формы
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Обработчик формы "Contact"
app.post('/contact', (req, res) => {
  console.log('Получен запрос на /contact');
  console.log(req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Все поля обязательны!');
  }

  const contactEntry = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  fs.readFile('contacts.json', (err, data) => {
    let contacts = [];
    if (!err && data.length > 0) {
      contacts = JSON.parse(data);
    }
    contacts.push(contactEntry);

    fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Ошибка при сохранении данных:', err);
        return res.status(500).send('Ошибка при сохранении данных.');
      }
      res.send('Сообщение успешно отправлено!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
