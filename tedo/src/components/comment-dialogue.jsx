import React, { useEffect, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { useModal } from "../hooks/useModal";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


function CommentDialogue() {
  const { editableProduct } = useModal();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return; 
  
    try {
      
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("User not authenticated");
      }
  
      const response = await axios.post(
        `${SERVER_URL}/comments/`,
        {
          taskId:editableProduct._id,
          content: comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
  
      
      const newComment = response.data.comment;
      setComments([...comments, newComment]);
      setComment(""); // Clear the input field
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const fetchCommentsByTaskId = async (taskId) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/comments/task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token || ""
            }`,
          },
        }
      );
console.log(response.data.comments || response.data)
      setComments(response.data.comments || response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    //   setError("Failed to load comments");
    } finally {
    }
  };

  useEffect(() => {
    console.log(editableProduct._id.$oid)
    fetchCommentsByTaskId(editableProduct._id);
  }, []);

  return (
    <Modal>
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Scrollable Comments Section */}
        <div className="flex-1 max-h-[400px] overflow-y-scroll p-4 space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index} // Use a unique ID if available (e.g., comment._id)
              className="border border-gray-200 dark:border-gray-700 px-6 py-4 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 text-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center ">
                <img
                  src="https://plus.unsplash.com/premium_photo-1739283664366-abb2b1c6f218?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500 dark:border-blue-400"
                />
                <div className="flex flex-col">
                  <div className="text-md font-semibold text-gray-900 dark:text-white">
                    @{comment.user.username} 
                  </div>
                  <p className="text-sm  leading-relaxed  text-gray-200 dark:text-gray-200">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Input Section */}
        <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
            onChange={(e)=>setComment(e.target.value)}
            value={comment}
              type="text"
              placeholder="Write a comment..."
              className="flex-1 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button onClick={handleAddComment} className="p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default CommentDialogue;
