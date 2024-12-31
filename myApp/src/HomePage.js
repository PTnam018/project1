import React, { useState, useEffect } from "react";
import { getAllPost } from "./services/API.js";
import { useNavigate } from "react-router-dom";
import "./product.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
          image: post.data.image || "https://via.placeholder.com/150", // Sử dụng ảnh mặc định nếu không có
        }));
        setPosts(detailedPosts);
      } else {
        console.error("Dữ liệu trả về không phải là mảng");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = async (postId) => {
    try {
      // Chuyển sang trang Detail và truyền postId qua state
      console.log("Navigating to Detail with postId:", postId);
      navigate("/detail", { state: { postId } });
    } catch (error) {
      console.error("Error navigating to post details:", error);
    }
  };

  return (
    <section className="product">
      <div className="container">
        <div className="row">
          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
              >
                <div
                  className="card"
                  onClick={() => handlePostClick(post.id)}
                >
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt="Post"
                  />
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
  );
}
