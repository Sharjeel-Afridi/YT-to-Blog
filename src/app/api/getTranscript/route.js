import { NextResponse } from "next/server";
import { getTranscript } from "youtube-transcript";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    const videoId = getYoutubeVideoId(url);

    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const transcript = await getTranscript(videoId);
    const transcriptText = transcript.map((entry) => entry.text).join(" ");
    const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return NextResponse.json({ transcript: transcriptText, imgUrl });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch the transcript" }, { status: 500 });
  }
}

function getYoutubeVideoId(url) {
  const videoIdRegexList = [
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  ];

  for (const regex of videoIdRegexList) {
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
  }
  return null;
}
