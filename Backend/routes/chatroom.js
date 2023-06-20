const express = require("express");
const router = express.Router();
const chatRoom = require('../controllers/chatroom');


router
  .get('/', chatRoom.myConversations)
  .get('/:id', chatRoom.getMessages)
  .post('/create', chatRoom.initiate)
  .post('/sendMessage', chatRoom.postMessage)
  .post('/addUser/:id', chatRoom.addUserToConversation)
  .delete('/removeUser/:id', chatRoom.removeUserFromConversation)
  .delete('/:id', chatRoom.deleteConversation)
  

module.exports = router;