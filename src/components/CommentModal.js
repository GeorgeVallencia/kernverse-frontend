import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GoXCircle } from "react-icons/go";
import CommentCreate from "./CommentCreate";
import CommentShow from "./CommentShow";
import axios from "axios";

function CommentModal({ blogId, onComment, onAddComment }) {

  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [comments, setComments] = useState([]); // Manage comments here


  const handleClose = () => {
    onComment();
  };

  const handleCreateComment = () => {
    setOpenCommentBox(!openCommentBox);
  };

  //Add a new comment
  const handleAddComment = (newComment) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments, newComment];
      onAddComment(updatedComments.length); // Notify the parent component to update the count
      return updatedComments;
    });
  };

//   const handleAddComment = async (newComment) => {
//   try {
//     // Send the new comment to the backend
//     const response = await axios.post('https://kernverse-backend.onrender.com/comments', {
//       blogId,
//       text: newComment.text, // Include comment text or other necessary fields
//     });

//     if (response.status === 200) {
//       const updatedComments = [...comments, response.data];
//       setComments(updatedComments);

//       // Increment commentCount in the backend
//       await axios.put(`https://kernverse-backend.onrender.com/published-posts/${blogId}/commentCount`);

//       // Notify the parent about the updated count
//       onAddComment(updatedComments.length);
//     }
//   } catch (error) {
//     console.error('Error adding comment:', error);
//   }
// };


  useEffect(() => {

    if (!blogId) return;

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://kernverse-backend.onrender.com/comments/${blogId}`);
        console.log(response.data);
        setComments(response.data || []);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    };

    fetchComments();
  }, [blogId]);


  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  }, []);
 
  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80 flex"></div>
      <div className="fixed rounded inset-40 sm:inset-40 p-10 bg-white sm:mx-auto ml-8 items-center max-w-md">
        <div className="flex items-center justify-end">
          <GoXCircle size={30} onClick={handleClose} className="text-orange-600 mr-[-3.4rem] mt-[-6.6rem] cursor-pointer"/>
        </div>
        <p className="mb-8 mt-[5rem] tracking-wide text-xl text-gray-600">COMMENTS (<span className="">{comments.length}</span>)</p>
        { openCommentBox ?<CommentCreate onOpen={handleCreateComment} onAddComment={handleAddComment} blogId={blogId} // Pass handler to add comments
 /> : <div className="shadow-lg rounded-md pl-4 py-4">
          <input onClick={handleCreateComment} placeholder="What are your thoughts?" className="outline-none w-full"/>
        </div> }
        <div className="mt-20">
          <CommentShow comments={comments} />
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default CommentModal;