import axios from 'axios'

const API_BASE_URL = "http://localhost:5001";


export function register(email, password) {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        password: password
    })
}

export function login(email, password) {
    return axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password
    })
}


export function createPost(title, content, image) {
    return axios.post(`${API_BASE_URL}/post/createPost`, {
        title: title,
        content: content,
        image: image
    });
}

export function getAllPost() {
    return axios.get(`${API_BASE_URL}/post/getAllPost`);
}

export function getPostByPostId(postId) {
    return axios.get(`${API_BASE_URL}/post/getPostByPostId`, {
        params: {
            postId: postId
        }
    });
}

export function updatePost(title, content, image, postId) {
    return axios.post(`${API_BASE_URL}/post/updatePost`,
        {
            title: title,
            content: content,
            image: image,
            postId: postId

        });
}

export function deletePost(postId) {
    return axios.post(`${API_BASE_URL}/post/deletePost`, null, {
        params: {
            postId: postId
        }
    });
}