import express from 'express';
import { signup, login, logout, verifyemail, forgotpassword, resetpassword, checkAuth } from '../controllers/auth.js';
import { verifyToken } from '../Middleware/verifyToken.js';
import { verify } from 'crypto';
import { check } from 'express-validator';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verifyemail', verifyemail);
router.post('/forgotpassword', forgotpassword)
router.post('/resetpassword/:token', resetpassword)

router.post('/checkauth', verifyToken, checkAuth);

export default router;