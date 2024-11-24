document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Останавливает стандартное поведение формы

  // Собираем данные формы
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Отправка данных с использованием fetch API
  fetch('http://localhost:3000/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }
    return response.text();
  })
  .then(data => {
    // Показ уведомления об успешной отправке
    const notification = document.getElementById('notification');
    notification.style.display = 'block';

    // Скрыть уведомление через 5 секунд
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);

    // Очистка формы
    document.getElementById('contactForm').reset();
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке сообщения.');
  });
});
