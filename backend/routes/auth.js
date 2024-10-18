import express from 'express';
import { signup, login, logout, verifyemail, forgotpassword, resetpassword, checkAuth, checkRole,checkApprove } from '../controllers/auth.js';
import { verifyToken } from '../Middleware/verifyToken.js';


const router = express.Router();


router.post('/signup', signup);
router.post('/check-approve',checkApprove);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verifyemail', verifyemail);
router.post('/forgotpassword', forgotpassword)
router.post('/resetpassword/:token', resetpassword)

router.post('/check-auth', verifyToken, checkAuth);
router.post('/check-role', verifyToken, checkRole);


export default router;