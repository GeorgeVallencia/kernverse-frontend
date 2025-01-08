import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostsPage () {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [files, setFiles] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  async function PublishPost() {

    if(!files || files.length === 0) {
      console.log('No files selected');
      
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('story', story);
    data.set('file', files[0]);

    try {
    const response = await fetch('http://localhost:4000/published-posts', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if(!response.ok) {
      throw new Error('Failed to publish the post');
    }

    const result = await response.json();
    console.log(result);
  } catch(error) {
    console.error('Error publishing post:', error)
  }
  };

  const handleFile = (event) => {
    setFiles(event.target.files);
  };

  const handlePublish = (event) => {
    event.preventDefault();
    PublishPost();
    navigate('/published-posts');
  };

 return(
    <form onSubmit={handlePublish} className="flex flex-col mt-10 px-5 max-w-xl sm:max-w-3xl mx-auto">
      <input 
        value={title}
        onChange={handleTitleChange} 
        type='title' 
        placeholder="Title" 
        // className="outline-none text-3xl break-words max-w-full w-full"
        className="outline-none text-3xl overflow-x-auto break-words border-b-2 border-gray-300 focus:border-teal-500 p-2"
    style={{ whiteSpace: 'nowrap' }}
 
      />
      <textarea value={story} onChange={handleStoryChange} placeholder="Tell your Story..." className="my-4 outline-none p-4 border-2 border-gray-300 focus:border-teal-500 resize-none rounded"></textarea>
      {/* <input type='summary' placeholder="summary" /> */}
      <input onChange={handleFile} type='file' placeholder="Tell your story..." className="outline-none"/>
      <button className="ml-auto my-4 bg-teal-500 text-white rounded py-1 px-3">Publish</button>
    </form>
  );
};

export default PostsPage;