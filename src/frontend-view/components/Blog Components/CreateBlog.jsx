import React, { useState } from 'react';
import { createBlog } from '../../../controller/HelperFetch';

const CreateBlog = ({setCreatePage, user}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrorTitle(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setErrorContent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || title.length < 5) {
      setErrorTitle(true);
      return
    }

    if (content.trim().split(' ').length < 50) {
      setErrorContent(true);
      return
    }

    if (!errorTitle && !errorContent) {
      // Handle the form submission here, as it has passed validation
        createBlog(user, title, content).then(success => {
            if(success){
                setCreatePage(false)
                alert("Upload successful!")
            } else {
                alert("Uh oh, an error occured")
            }
        })
        
    }
  };

  return (
    <div className="bg-gray-dark p-4 border-l-2 border-r-2 border-orange rounded-lg shadow-lg pt-20">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-white text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className={`block w-full mt-1 p-2 border rounded-lg focus:ring-orange focus:border-orange ${
              errorTitle ? 'border-red-500' : 'border-white'
            } bg-white text-gray-dark`}
            placeholder="Enter title..."
            required
          />
          {errorTitle && (
            <p className="text-red-500 text-sm mt-1">Enter a valid and descriptive title. Titles matter!</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-white text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            rows="4"
            className={`block w-full mt-1 p-2 border rounded-lg focus:ring-orange focus:border-orange ${
              errorContent ? 'border-red-500' : 'border-white'
            } bg-white text-gray-dark`}
            placeholder="Enter content..."
            required
          />
          {errorContent && (
            <p className="text-red-500 text-sm mt-1">
              Content must have at least 50 words. Start getting creative
            </p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block text-white text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="block w-full mt-1 p-2 border rounded-lg bg-gray-light text-gray-dark cursor-not-allowed"
            value={user.displayName}
            disabled
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-opacity-80 transition duration-300"
          >
            Upload Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog ;
