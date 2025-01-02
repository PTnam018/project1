import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createPost, getAllPost, updatePost, deletePost } from './services/API.js';

Modal.setAppElement('#root');

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPost();
      const allPosts = response.data.data;  // `data` chứa mảng các bài viết
  
      console.log("nam", allPosts)
      console.log('Type of allPosts:', typeof allPosts);
      console.log('Is allPosts an array?', Array.isArray(allPosts));
      // Kiểm tra nếu `allPosts` là mảng
      if (Array.isArray(allPosts)) {
        // Lặp qua từng bài viết và lấy dữ liệu từ trường `data` của mỗi bài viết
        const detailedPosts = allPosts.map(post => ({
          id: post.id,  // Lấy `id` của bài viết
          title: post.data.title,  // Lấy `title` từ trường `data`
          content: post.data.content,  // Lấy `content` từ trường `data`
          image: post.data.image  // Lấy `image` từ trường `data`
        }));
  
        // Đặt giá trị cho state `posts`
        setPosts(detailedPosts);
        console.log("Fetched posts:", detailedPosts);  // Kiểm tra dữ liệu sau khi xử lý
      } else {
        console.error("Dữ liệu trả về không phải là mảng");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  const handleAddPost = async () => {
    try {
      const response = await createPost(title, content, imageUri);
      if (response.status === 200 || response.status === 201) {
        fetchPosts();
        resetForm();
        setIsModalOpen(false);

        console.log("Bài viết đã được tạo addPost:");
        console.log("Tiêu đề:", title);
        console.log("Nội dung:", content);
        console.log("Ảnh:", imageUri);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = (id) => {
        
    const postToEdit = posts.find((post) => post.id === id);
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setImageUri(postToEdit.image);
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await updatePost(title, content, imageUri, editingId);
      if (response.status === 200) {
        fetchPosts();
        resetForm();
        setIsModalOpen(false);

        console.log("Bài viết đã được updatePost:");
        console.log("Tiêu đề:", title);
        console.log("Nội dung:", content);
        console.log("Ảnh:", imageUri);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleImagePick = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUri('');
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Trang Chủ</h1>

      <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>
        Thêm bài post
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyles}>
        <h2>{editingId ? 'Sửa bài post' : 'Thêm bài post'}</h2>

        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Nội dung"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          onChange={handleImagePick}
          style={styles.input}
        />
        {imageUri && <img src={imageUri} alt="Preview" style={styles.imagePreview} />}

        <div style={styles.modalActions}>
          {editingId ? (
            <button onClick={handleSaveEdit} style={styles.modalButton}>Lưu thay đổi</button>
          ) : (
            <button onClick={handleAddPost} style={styles.modalButton}>Thêm bài post</button>
          )}
          <button onClick={() => setIsModalOpen(false)} style={styles.modalButton}>Đóng</button>
        </div>
      </Modal>

      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <ul style={styles.postList}>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} style={styles.postCard}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Post" style={styles.postImage} />}
                <div style={styles.actions}>
                  <button onClick={() => handleEditPost(post.id)} style={styles.postButton}>Sửa</button>
                  <button onClick={() => handleDeletePost(post.id)} style={styles.postButton}>Xóa</button>
                </div>
              </li>
            ))
          ) : (
            <p>Không có bài viết nào</p>
          )}
        </ul>
      )}
    </div>
  );
};

const modalStyles = {
  content: {
    width: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  header: {
    textAlign: 'center',
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto 20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    marginBottom: '12px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  modalButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  postList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  postCard: {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  postImage: {
    width: '100px',
    height: '100px',
    marginTop: '10px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  postButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
