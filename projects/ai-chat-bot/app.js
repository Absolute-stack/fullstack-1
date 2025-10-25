'use strict';

let messageInput = document.querySelector('.message-input');
const form = document.querySelector('.chat-form');
const introBotMessage = document.querySelector('.intro');
const chatBody = document.querySelector('.chat-body');
const API_KEY = 'AIzaSyAYZrwhnxwLS1Z6N3_d3d7JvQP9dnXjO8E';
const fileUploadBtn = document.querySelector('.file-upload');
const fileInput = document.getElementById('file-input');
const emojiBtn = document.querySelector('.emoji-btn');
const emojiPicker = document.querySelector('emoji-picker');
let userData;

// Initialize emoji picker as hidden
if (emojiPicker) {
  emojiPicker.style.display = 'none';
}

messageInput.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // creating UserMessage
  const userText = messageInput.value.trim();
  if (!userText) return;

  userData = userText;
  // user-message
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  // message-text
  const messageText = document.createElement('div');
  messageText.classList.add('message-text');
  messageText.textContent = userText;

  userMessage.append(messageText);
  chatBody.append(userMessage);

  // Clear input and scroll
  messageInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    createBotResponse(userData, messageText);
  }, 800);
});

function createBotResponse(userData, messageText) {
  // create bot response
  const thinking = document.createElement('div');
  thinking.classList.add('bot-message', 'thinking', 'fade');
  thinking.innerHTML = `<svg
    class="bot-avatar"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 1024 1024"
  >
    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
  </svg>
  <div class="thinking-indicator">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>`;

  chatBody.append(thinking);
  chatBody.scrollTop = chatBody.scrollHeight;
  generateResponse(userData, messageText);
}

async function generateResponse(userData) {
  const Url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  try {
    const req = await fetch(Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${userData}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await req.json();
    const response = data['candidates'][0]['content']['parts'][0]['text'];
    const thinking = document.querySelector('.thinking');
    thinking.remove();
    const botResponse = document.createElement('div');
    botResponse.classList.add('message', 'bot-message', 'fade');
    botResponse.innerHTML = `
  <svg
    class="bot-avatar"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 1024 1024"
  >
    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
  </svg>
  <div class="message-text">${response}</div>`;

    chatBody.append(botResponse);
    chatBody.scrollTop = chatBody.scrollHeight;
  } catch (error) {
    const errorMsg = error.message || 'Something went wrong';
    const thinking = document.querySelector('.thinking');
    if (thinking) thinking.remove();
    const botResponse = document.createElement('div');
    botResponse.classList.add('message', 'bot-message', 'fade');
    botResponse.innerHTML = `
  <svg
    class="bot-avatar"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 1024 1024"
  >
    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
  </svg>
  <div class="message-text">${errorMsg}</div>`;
    chatBody.append(botResponse);
    chatBody.scrollTop = chatBody.scrollHeight;
    console.log(error);
  }
}

// File upload functionality
fileUploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
  };
  reader.readAsDataURL(file);
});

// Emoji picker functionality
if (emojiBtn && emojiPicker) {
  // Toggle emoji picker visibility
  emojiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    emojiPicker.style.display =
      emojiPicker.style.display === 'none' ? 'block' : 'none';
  });

  // Handle emoji selection
  emojiPicker.addEventListener('emoji-click', (e) => {
    const emoji = e.detail.unicode;
    messageInput.value += emoji;
    messageInput.focus();
  });

  // Close emoji picker when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.emoji-btn') && !e.target.closest('emoji-picker')) {
      emojiPicker.style.display = 'none';
    }
  });
}
