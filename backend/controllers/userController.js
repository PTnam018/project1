import Fuse from 'fuse.js';
import db from '../firebase.js';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut  
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendNotificationEmail } from "./sendEmail.js"

// POST /register
export const register = async (req, res, next) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;



  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(doc(db, "profiles", userCredential.user.uid), {})
        .then(() => {
          sendNotificationEmail(email)
          res.status(200).json({
            status: true,
            user: userCredential.user,
            message: "Đăng ký thành công"
          })
        })
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        res.status(200).json({
          status: false,
          message: "Email đã được sử dụng"
        })
      }
      else {
        res.status(400).json({
          status: false,
          message: error.message
        })
      }
    });
}

// POST /login
export const login = async (req, res, next) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.status(200).json({
        status: true,
        user: userCredential.user,
        message: "Đăng nhập thành công"
      })
    })
    .catch((error) => {
      if (error.code == 'auth/invalid-credential' || error.code == 'auth/missing-email') {
        res.status(200).json({
          status: false,
          userId: null,
          message: "Email hoặc mật khẩu không đúng"
        })
      }
      else {
        res.status(400).json({
          status: false,
          userId: null,
          message: error.message
        })
      }
    });
}
// tao card
export const createCard = async (req, res) => {
  

}