import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostByPostId } from "./services/API.js";
import "./detail.css";

export default function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = location.state;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getPostByPostId(postId);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  return (
    <div className="detail-container">
      {isPreviewOpen ? (
        <div className="preview-modal">
          <button className="close-button" style={{color: "black"}} onClick={() => setIsPreviewOpen(false)}>
            X
          </button>
          <img
            src={post?.image || "https://via.placeholder.com/500"}
            className="preview-image"
            alt="Full Preview"
          />
        </div>
      ) : (
        <>
          <div className="detail-header">
            <button className="close-button" onClick={() => navigate(-1)}>
              X
            </button>
          </div>
          {isLoading ? (
            <p className="loading-text">Đang tải chi tiết bài viết...</p>
          ) : post ? (
            <div className="detail-content">
              <div
                className="image-section"
                onClick={() => setIsPreviewOpen(true)}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <img
                  src={post.image || "https://via.placeholder.com/500"}
                  className="detail-image"
                  alt="Post Detail"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <div className="image-overlay">
                  <span className="overlay-text">Preview</span>
                </div>
              </div>
              <div className="text-section">
                <h3 className="detail-title">{post.title}</h3>
                <p className="detail-description">{post.content}</p>
              </div>
            </div>
          ) : (
            <p className="error-text">Bài viết không tồn tại!</p>
          )}
        </>
      )}
    </div>
  );
}
