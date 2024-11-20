import Image from "next/image";

export default function VideoThumbnail({ imgUrl }) {
    return <Image src={imgUrl} alt="Video Thumbnail" style={{ maxWidth: "100%" }} />;
  }
  