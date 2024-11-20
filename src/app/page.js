"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        setBlogPost(data.blog_post);
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
    <div className="container">
      <h1>YouTube to Blog Post Generator</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Blog'}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {blogPost && (
        <div className="result">
          <h2>Generated Blog Post</h2>
          {/* <Image src={imgUrl} width={500} height={500} alt="YouTube Video Thumbnail" /> */}
          <div className="blog-post">
            <p>{blogPost}</p>
          </div>
        </div>
      )}
    </div>
  );
}
