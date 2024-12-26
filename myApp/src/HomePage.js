import React, { useState, useEffect } from 'react';
import { getAllPost, getPostByPostId } from './services/API.js';
import './product.css';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy danh sách bài viết từ API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPost();
      const allPosts = response.data.data;

      if (Array.isArray(allPosts)) {
        const detailedPosts = allPosts.map((post) => ({
          id: post.id,
          title: post.data.title,
          content: post.data.content,
          image: post.data.image || 'https://via.placeholder.com/150', // Sử dụng ảnh mặc định nếu không có
        }));
        setPosts(detailedPosts);
      } else {
        console.error('Dữ liệu trả về không phải là mảng');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = async (postId) => {
    try {
      const response = await getPostByPostId(postId);
      setSelectedPost(response.data.data);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  return (
    <>
      <section className="product">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item">
                  <div className="card" onClick={() => handlePostClick(post.id)}>
                    <img src={post.image} className="card-img-top" alt="Post" />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Hiển thị chi tiết bài post khi người dùng nhấp vào */}
      {selectedPost && (
        <div className="post-detail">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="card">
                  <img
                    src={selectedPost.image || 'https://via.placeholder.com/500'}
                    className="card-img-top"
                    alt="Post Detail"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{selectedPost.title}</h3>
                    <p className="card-text">{selectedPost.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
