![image](https://github.com/user-attachments/assets/404caea7-03a1-4124-a271-5735b515c259)


# YouTube to Blog Post Generator

### AI-Powered Blog Generator from YouTube Videos

This **Next.js** and **Flask** application transforms YouTube video URLs into **AI-generated blog posts** with integrated video thumbnails. It offers a streamlined workflow, combining robust backend logic with a polished frontend experience.

#### Key Features:
- **Markdown to HTML Conversion**: Automatically converts AI-generated content into styled HTML for seamless rendering.
- **YouTube Transcript Processing**:  
  - Extracts the **Video ID** from the provided URL.  
  - Fetches the video transcript and preprocesses it by **removing unwanted formatting** or artifacts for clean input.
- **AI-Powered Content Generation**: Uses the processed transcript to create **engaging, structured blog posts**.
- 
This project demonstrates the integration of advanced AI processing with clean, user-friendly web design, offering a powerful tool for content creators.

![Screenshot 2024-11-21 000704](https://github.com/user-attachments/assets/43f2e3be-5c2c-44c3-83ff-46dfd3fb7cd9)

## 🚀 Features

- Convert YouTube video content into well-written blog posts.
- Automatically fetch video thumbnails.
- AI-powered blog generation using Flask backend.
- Markdown to styled HTML conversion.
- Responsive and user-friendly interface.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with Tailwind CSS
- **Backend**: [Flask](https://flask.palletsprojects.com/)

---

## 📦 Installation and Setup

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- A Gemini API Key

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```

---
### Create .env in root
```bash
   GENAI_API_KEY = "your gemini api key"
   ```

## 🌐 Usage

1. Enter a valid YouTube URL in the input box.
2. Click **Generate Blog**.
3. View the AI-generated blog post along with the video thumbnail.

---
