import {useEffect, useState} from 'react';
import { format } from 'date-fns'
import { FaHandsClapping, FaComment } from "react-icons/fa6";
import CommentModal from '../components/CommentModal';

function PublishPage() {

  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState({ isOpen: false, blogId: null });

  // const handleClapCount = (id) => {
  //   setBlogs((prevBlogs) =>
  //     prevBlogs.map((blog) =>
  //       blog._id === id ? { ...blog, clapCount: (blog.clapCount || 0) + 1 } : blog
  //     )
  //   );
  // }

  const handleClap = async (blogId, commentText) => {
    try {
      const response = await fetch('http://localhost:4000/claps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({ comment: commentText, blogId }),
      });

      if (response.ok) {

        // After successfully clapping, fetch the latest blog data with updated clap count
      const updatedBlog = await fetch(`http://localhost:4000/claps/${blogId}`).then(res => res.json());

        // Update the clap count locally
        setBlogs(prevBlogs =>
          prevBlogs.map(blog =>
            blog._id === blogId
              ? { ...blog, clapCount: updatedBlog.totalClaps }
              : blog
          )
        );
      } else {
        const error = await response.json();
        console.error('Failed to clap:', error.error || 'Unexpected error');
        alert(error.error || 'Failed to add clap');
      }
    } catch (err) {
      console.error('Error clapping:', err);
      alert('Something went wrong');
    }
  };


  const fetchCommentCount = async (blogId) => {
  try {
    const response = await fetch(`http://localhost:4000/comments/${blogId}/count`);
    const data = await response.json();
    return data.commentCount;
  } catch (error) {
    console.error('Error fetching comment count:', error);
    return null;
  }
};

  const handleCommentIconClick = async(blogId) => {
    setComment({ isOpen: true, blogId }); // Open modal and set the associated blog ID
    // Fetch the latest comment count and update the blog state
    const updatedCommentCount = await fetchCommentCount(blogId);
    if (updatedCommentCount !== null) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, commentCount: updatedCommentCount } : blog
      )
    );
  }
  };

  const closeCommentModal = () => {
    setComment({ isOpen: false, blogId: null }); // Close modal
  };



  const incrementCommentCount = async (blogId, updatedLength) => {

    // Optionally fetch the count from the backend
    const updatedCommentCount = await fetchCommentCount(blogId);

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === blogId ? { ...blog, commentCount: updatedCommentCount || updatedLength } : blog
      )
  );
  };

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:4000/published-posts');
            const blogs = await response.json();

            // const blogsWithCounts = blogs.map((blog) => ({
            //     ...blog,
            //     clapCount: blog.clapCount || 0,
            //     commentCount: blog.commentCount || 0,
            // }));

            setBlogs(blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    fetchBlogs();
}, []);


  // useEffect(() => {
  //   fetch('http://localhost:4000/published-posts').then(response => {
  //     response.json().then(blogs => {

  //       // const [commentCount, setCommentCount] = useState(0);
  //       //const [clapCount, setClapCount] = useState(0);

  //       const blogsWithCounts = blogs.map((blog) => ({
  //         ...blog,
  //         clapCount: blog.clapCount || 0,
  //         commentCount: blog.commentCount || 0,
  //       }));
  //       setBlogs(blogsWithCounts);
  //     });
  //   });
  // }, []);

  const renderedBlogs = blogs.map((blog) => {

    const authorName = blog.author?.fullName || 'Unknown Author';

    return(
      <div key={blog._id} className="mx-auto tracking-wide px-5 max-w-5xl flex flex-col">
        <div className="my-4 flex items-center justify-between">
          <h1 className="font-semibold text-5xl mb-8 underline text-teal-500">{blog.title}</h1>
          <p className="text-sm text-gray-300">
            <time>{ format(new Date(blog.createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
        </div>
        <div className="flex flex-col tracking-widest">
          <div className="mb-3 sm:mr-3">
            {blog.cover && <img src={'http://localhost:4000/'+blog.cover} alt={blog.title} className="rounded" />}
          </div>
          <div className="flex flex-col mt-8">
            <p>{blog.story}</p>
            <div className='flex items-center'>
              <div className='cursor-pointer flex items-center mr-8'>
                <FaHandsClapping size={20} onClick={() => handleClap(blog._id)} className='text-teal-500 mr-2' />
                <div className='text-gray-400 items-center'>
                  {blog.clapCount}
                </div>
              </div>
              { 
              comment.isOpen && comment.blogId === blog._id ? (<CommentModal onComment={closeCommentModal} blogId={comment.blogId}  onAddComment={(updatedLength) => incrementCommentCount(comment.blogId, updatedLength)} /> ):  <div className='cursor-pointer flex items-center'>
                <FaComment size={20} onClick={() => handleCommentIconClick(blog._id)} className='text-teal-500 mr-2' />
                <div className='text-gray-400'>
                  {blog.commentCount}
                </div>
              </div> 
              }
              <p className='ml-auto my-3 text-gray-400'>Author: {authorName}</p>
            </div>
          </div>
        </div>
    </div>
    );
  })

  return(
    <div className='max-w-2xl mx-auto'>
      {renderedBlogs}
      {/* {comment.isOpen && (
        <CommentModal
          // blogId={comment.blogId}
          onComment={closeCommentModal} // Pass a function to close the modal
        />
      )} */}
    </div>
  );
};

export default PublishPage;