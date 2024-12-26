import express from 'express';
import multer from 'multer';

import {
  register,
  login,

} from '../controllers/userController.js';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);


export default router;