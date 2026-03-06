import { PostContainer, Actions, EditButton, DeleteButton } from "./styles"
import { Link } from "react-router-dom"
import { FiEdit, FiTrash2 } from "react-icons/fi"

const Post = ({ post, onDelete, showActions = false }) => {
  return (
    <PostContainer>
      <Link to={`/post/${post.id}`} className="postLink">
        <div className="description">
          <span className="date">{post.date}</span>
          <span className="category">{post.category}</span>

          <h3 className="title">{post.title}</h3>
          <p className="resume">{post.resume}</p>
        </div>
      </Link>

      {showActions && (
        <Actions>
          <Link
            to={`/edit-post/${post.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <EditButton
              to={`/edit-post/${post.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <FiEdit />
            </EditButton>
          </Link>

          <DeleteButton
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete(post.id)
            }}
          >
            <FiTrash2 />
          </DeleteButton>
        </Actions>
      )}
    </PostContainer>
  )
}

export default Post
