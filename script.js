const API_KEY = "OpenAI API Key"; // แทนที่ด้วย API Key ของคุณ
const API_URL = "https://api.openai.com/v1/chat/completions";

const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");
const messagesDiv = document.getElementById("messages");

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    // แสดงข้อความผู้ใช้
    addMessage(userMessage, "user");

    // ส่งข้อความไปยัง API และแสดงข้อความตอบกลับ
    const botReply = await getBotReply(userMessage);

    addMessage(botReply, "bot");
    userInput.value = ""; // ล้างข้อความ
  }
});

function addMessage(content, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = sender;
  messageElement.textContent = content;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // เลื่อนลงอัตโนมัติ
}

async function getBotReply(userMessage) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return "ขอโทษค่ะ เกิดข้อผิดพลาด!";
  }
}