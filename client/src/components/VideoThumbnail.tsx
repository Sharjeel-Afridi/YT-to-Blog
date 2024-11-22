
export default function VideoThumbnail({ imgUrl }: {imgUrl: string}) {
    return <img src={imgUrl} alt="Video Thumbnail" style={{ maxWidth: "100%" }} />;
  }
  