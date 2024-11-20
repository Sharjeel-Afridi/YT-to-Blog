import re
from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# YouTube Video ID Extraction Function
def get_youtube_video_id(url):
    video_id_regex_list = [
        r'(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]+)'
    ]
    for regex in video_id_regex_list:
        match = re.search(regex, url)
        if match:
            return match.group(1)
    return None

# Function to get transcript from YouTube video
def get_transcript(url):
    video_id = get_youtube_video_id(url)
    img_url = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript_text = " ".join(entry['text'] for entry in transcript_list)
    return [transcript_text, img_url]

load_dotenv()

# Get API key from environment variable
KEY = os.getenv("GENAI_API_KEY")
genai.configure(api_key=KEY)

# Route for handling POST requests
@app.route("/", methods=["POST"])
def home():
    data = request.get_json()  
    youtube_url = data.get('youtube_url')

    if youtube_url:
        # Fetch the transcript and video thumbnail
        transcript, img_url = get_transcript(youtube_url)
        if transcript:
            # Generate the blog post using Gemini
            prompt = f"Create this a blog and remove any part related to sponsorships create multiple small headings(h3), these should be relevent. It should have a catchy intresting title(h2) in the start: {transcript}"
            model_name = "gemini-1.5-pro"
            generation_config = {}  
            model = genai.GenerativeModel(model_name=model_name, generation_config=generation_config)
            response = model.generate_content(prompt)

            blog_post = response.text
            return jsonify({
                "blog_post": blog_post,
                "img_url": img_url
            })
        else:
            return jsonify({"error": "Failed to retrieve transcript."}), 400
    return jsonify({"error": "No YouTube URL provided."}), 400

if __name__ == "__main__":
    app.run(debug=True)
