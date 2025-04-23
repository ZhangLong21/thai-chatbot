const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  const userMessage = userInput.value;
  if (userMessage) {
    // แสดงข้อความผู้ใช้ใน chat
    messagesDiv.innerHTML += `<div><strong>คุณ:</strong> ${userMessage}</div>`;
    userInput.value = ''; // ลบข้อความหลังจากส่ง

    // ส่งข้อความไปยัง OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage + ' ตอบกลับเป็นภาษาไทยเท่านั้น' }],
      }),
    })
    .then(response => response.json())
    .then(data => {
      const botMessage = data.choices[0].message.content;
      // แสดงข้อความจากบอทใน chat
      messagesDiv.innerHTML += `<div><strong>บอท:</strong> ${botMessage}</div>`;
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // เลื่อนข้อความล่าสุดขึ้น
    })
    .catch(err => console.error(err));
  }
});
