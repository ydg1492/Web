export default function BoardDetail({ post, goEdit }) {
  if (!post) return <div>loading...</div>;

  return (
    <div className="detail">
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <p>작성자: {post.user_id}</p>

      <button onClick={goEdit}>수정</button>
      <button>삭제</button>
    </div>
  );
}