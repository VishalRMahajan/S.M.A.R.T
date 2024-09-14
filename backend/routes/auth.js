import express from 'express';
import { signup, login, logout, verifyemail, forgotpassword, resetpassword } from '../controllers/auth.js';
import { verify } from 'crypto';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verifyemail' , verifyemail);
router.post('/forgotpassword', forgotpassword)
router.post('/resetpassword/:token', resetpassword)

export default router;