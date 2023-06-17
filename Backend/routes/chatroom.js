const express = require("express");
const router = express.Router();
const chatRoom = require('../controllers/chatroom');


router
  .get('/', chatRoom.myConversations)
  .get('/:id', chatRoom.getMessages)
  //.get('/:roomId', chatRoom.getConversationByRoomId)
  .post('/create', chatRoom.initiate)
  .post('/sendMessage', chatRoom.postMessage)
  //.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

module.exports = router;