import express from 'express';
import { signup, login, logout, verifyemail } from '../controllers/auth.js';
import { verify } from 'crypto';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('verifyemail' , verifyemail);


export default router;