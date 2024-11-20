"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import showdown from 'showdown';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const conv = new showdown.Converter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states before submitting
    setBlogPost('');
    setImgUrl('');
    setError('');
    setLoading(true);

    if (!youtubeUrl) {
      setError('Please enter a valid YouTube URL.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending POST request to Flask backend...');
      // Send POST request to Flask backend using fetch
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: youtubeUrl }),
      });

      const data = await response.json();
      if (response.ok && data.blog_post && data.img_url) {
        // Convert markdown to HTML
        const htmlContent = conv.makeHtml(data.blog_post);
        setBlogPost(htmlContent);
        console.log("Image URL:", data.img_url);

        setImgUrl(data.img_url);
      } else {
        setError(data.error || 'Error generating the blog post. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error contacting the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center font-mont">
      <h1 className='font-bold text-2xl'>YouTube to Blog Post Generator</h1>
      
      <form onSubmit={handleSubmit}  className='flex gap-5 justify-center mt-10'>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          className='border-[1px] border-black font-medium p-2'
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Blog'}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {blogPost && (
        <div className="result flex flex-col items-center w-[53vw] font-mont">
          {/* <h2>Generated Blog Post</h2> */}
          <Image src={imgUrl} width={500} height={500} alt="YouTube Video Thumbnail" className='mt-10' unoptimized/>
          <div className="blog-post text-left" dangerouslySetInnerHTML={{ __html: blogPost }} />
        </div>
      )}
    </div>
  );
}
