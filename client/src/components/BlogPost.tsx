export default function BlogPost({ content }: {content: string}) {
    return (
      <div>
        <h2>Generated Blog Post</h2>
        <p>{content}</p>
      </div>
    );
  }
  