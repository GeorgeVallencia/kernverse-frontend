import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

function CommentCreate({ onOpen, onAddComment, blogId }) {

  const { userInfo } = useContext(UserContext);

  //const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  const handleCloseComment = () => {
    onOpen(false);
  }

  // const handleChange = (event) => {
  //   setComments(event.target.value);
  // };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment:', newComment); // Log the comment value
    console.log('Blog ID:', blogId); // Log the blogId
    console.log('Comment:', newComment);
    console.log('Blog ID:', blogId);
    console.log('Author (User ID):', userInfo?._id);


    // Check for empty fields
  if (!newComment || !blogId) {
    console.error('Comment and blogId are required');
    return;
  }

    try {
      const response = await axios.post('https://kernverse-backend.onrender.com/comments', { comment: newComment, blogId }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
      //setComments([...comments, response.data]);

      console.log('Comment posted successfully:', response.data); // Log successful response

      const addedComment = response.data; // Assuming the response contains the added comment object
      onAddComment(addedComment);
      setNewComment(''); // Clear the input field
    } catch (err) {
      console.error('Error posting comment', err);
    }
  };


  // return(
  //   <div className="flex flex-col text-sm border shadow-lg rounded-lg p-4">
  //     <div className="flex items-center">
  //       <div className="border rounded-full w-10 p-3 h-10"/>
  //       <p className="ml-4">{userInfo?.fullName}</p>
  //     </div>
  //     <div>
  //       <input value={comments} onChange={handleChange} placeholder="What are your thoughts?" className="outline-none w-full mt-10"/>
  //     </div>
  //     <form onSubmit={handleCommentSubmit} className="flex items-center justify-end text-sm mt-20">
  //       <button onClick={handleCloseComment}>Cancel</button>
  //       <button disabled={!comments} className={`ml-4 font-semibold rounded-full px-4 py-1 ${comments ? 'bg-orange-600 text-white' : 'bg-orange-200 text-white'}`}>Comment</button>
  //     </form>
  //   </div>
  // );

  return (
    <div>
      <h2 className="my-2">Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="outline-none w-full p-4 border-2 border-gray-300 focus:border-teal-500 resize-none rounded"
        />
        <div className="flex items-center justify-end text-sm mt-20">
          <button onClick={handleCloseComment}>Cancel</button>
          <button disabled={!newComment} className={`ml-4 font-semibold rounded-full px-4 py-1 ${newComment ? 'bg-teal-600 text-white' : 'bg-teal-200 text-white'}`}>Post Comment</button>
        </div>
      </form>
    </div>
  );

}

export default CommentCreate;