import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore"
import db from '../firebase.js'

export const createPost = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;
    
    const promises = []
    // Sau khi tất cả các promise đã được resolve thì thực hiện thêm dữ liệu vào firestore
    Promise.all(promises).then(() => {
        // form-data
        addDoc(collection(db, "posts"), {
            title: title,
            content: content,
            image: image
            
        }).then((docRef) => {
            res.status(200).json({  
                status: 200,          
                message: "Tạo bài đăng thành công.",
                post: {
                    title: title,
                    content: content,
                    image: image,
                    id: docRef.id
                }
            })
        }).catch((error) => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
    })
}


export const getAllPost = async (req, res) => {
    let posts = []

    try {
        const querySnapshot = await getDocs(collection(db, "posts"))
        querySnapshot.forEach((doc) => {
            if (!doc.data().isComment) posts.push({id: doc.id, data: doc.data()})
        })

        if (querySnapshot.empty) {
            res.status(402).json({
                message: "No post found!"
            })
        } else res.status(200).json({
            message: "Found all posts",
            data: posts
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
}

export const getPostByPostId = async (req, res) => {
    const postId = req.query.postId

    try {
        getDoc(doc(db, "posts", postId))
            .then((doc) => {
                if (doc.exists()) {
                    res.status(200).json({
                        message: `Found post with id ${postId}`,
                        data: doc.data()
                    })
                } else {
                    res.status(404).json({
                        message: `No post with id ${postId} found`
                    })
                }
            })
            .catch((error) => {
                res.status(400).json({
                    message: error.message
                })
            })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
}

export const updatePost = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;
    const postId = req.body.postId;

    console.log(title)
    console.log(image)

    const promises = []

    // Sau khi tất cả các promise đã được resolve thì thực hiện thêm dữ liệu vào firestore
    Promise.all(promises).then(() => {
        try {
            let docSnap
            const docRef = doc(db, "posts", postId)
            getDoc(docRef).then((doc) => {
                docSnap = doc.data()
            })

            // form-data
            updateDoc(docRef, {
                title: title,
                content: content,
                image: image,
            }).then(() => {
                res.status(200).json({
                    status: true,
                    message: "Cập nhật bài đăng thành công.",
                    post: {
                        title: title,
                        content: content,
                        image: image,
                        id: docRef.id
                    }
                })
            })
        } catch (e) {
            console.log(e.message)
            res.status(400).json({
                message: "Error update file"
            })
        }
        }).catch((error) => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

export const deletePost = async (req, res) => {
    const postId = req.query.postId

    try {
        const postRef = doc(db, "posts", postId)

        await deleteDoc(postRef)
        res.status(200).json({
            message: `Post with id ${postId} deleted`
        })
    } catch (e) {
        res.status(400).json({
            message: `Failed to delete post with id ${postId}`
        })
    }
}







