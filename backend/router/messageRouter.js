import express from 'express';

import { sendMessage, getAllMessages, delteMessage } from '../controller/messageController.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/send', sendMessage);  // for send message
router.get('/getall', isAdminAuthenticated, getAllMessages); 
router.delete('/delete/:id', isAdminAuthenticated, delteMessage);

export default router;