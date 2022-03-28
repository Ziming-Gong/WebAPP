const { messages } = require("./chat");

const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <style>
            p.one {
              border-style:dotted;
              border-width:thick;
            }
            </style>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            <p class = "one">
            ${chatWeb.getOutgoing(chat)}
            </p>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">`+
    Object.values(chat.messages).map( message =>
      `<li>
        <span>Username:${message.sender}</span>
        <span>Message:${message.text}</span>
        </li>
        `).join('')+
       `</ol>` 
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="Username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    return `
    <label>
      <form action = "/chat" method = "POST">
      Username:
      <input type = "text" name = "sender" id="sender"/>
      Message:
      <input type = "text" name = text id = "text"/>
      <button type = "submit">submit</button>
      </form>
    </label>
    `}
};
module.exports = chatWeb;


