const express = require("express");
const router = express.Router();
const chatRoom = require('../controllers/chatroom');

const auth = require('../middlewares/auth');

router
  .get('/', auth,chatRoom.myConversations)
  .get('/:id', auth,chatRoom.getMessages)
  .post('/create',auth, chatRoom.initiate)
  .post('/sendMessage', auth,chatRoom.postMessage)
  .post('/addUser/', auth,chatRoom.addUserToConversation)
  .put ('/updateName', auth,chatRoom.changeConversationName)
  .delete('/removeUser/', auth,chatRoom.removeUserFromConversation)
  .delete('/', auth,chatRoom.deleteConversation)
  

module.exports = router;