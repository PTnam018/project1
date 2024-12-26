import express from 'express'

import {
    createPost,
    getAllPost,
    getPostByPostId,
    updatePost,
    deletePost,
} from '../controllers/postController.js'

const router = express.Router()


router.post('/createPost', createPost)
router.get('/getAllPost', getAllPost)
router.get('/getPostByPostId', getPostByPostId)
router.post('/updatePost', updatePost)
router.post('/deletePost', deletePost)


export default router