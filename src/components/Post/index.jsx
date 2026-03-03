import { PostContainer } from "./styles"

const Post = ({ post }) => {
  return (
    <PostContainer>
      <div className="description">
        <span className="date">{post.date}</span>
        <span className="category">{post.category}</span>

        <h3 className="title">{post.title}</h3>
        <p className="resume">{post.resume}</p>
      </div>
    </PostContainer>
  )
}

export default Post
