import { PostContainer, Actions, EditButton, DeleteButton } from "./styles"
import { Link } from "react-router-dom"
import { FiEdit, FiTrash2 } from "react-icons/fi"

const Post = ({ post, onDelete, showActions = false }) => {
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("pt-BR")
    : "-"
  const excerpt = post.content ? `${post.content.slice(0, 120)}...` : ""

  return (
    <PostContainer>
      <Link to={`/post/${post.id}`} className="postLink">
        <div className="description">
          <span className="date">{formattedDate}</span>
          <span className="category">{post.author_name || "Sem autor"}</span>

          <h3 className="title">{post.title}</h3>
          <p className="resume">{excerpt}</p>
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
