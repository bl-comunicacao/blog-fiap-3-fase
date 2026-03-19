import { Title, Button } from "../../components/Ui";

import { useParams } from "react-router-dom";
import { usePostById } from "../../hooks";

const Post = () => {
  const { idPost } = useParams();
  const { post } = usePostById(idPost);

  return (
    <>
      <div className="w-full p-4 text-center">
        <div className="w-full 2xl:max-w-[97.5rem] mx-auto flex flex-col items-center justify-center">
          <span className="font-normal uppercase block tracking-[0.2rem] text-[1.2rem] text-[var(--gray-4)] mb-[0.8rem]">
            {post?.created_at
              ? new Date(post.created_at).toLocaleDateString("pt-BR")
              : "-"}
          </span>
          <span className="font-normal uppercase block tracking-[0.2rem] text-[1.8rem] text-[var(--blue-light)] mb-[1.6rem]">
            {post?.author_name || "Sem autor"}
          </span>

          <Title className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4.8rem]" align="center">
            {post?.title}
          </Title>

          <p className="text-[1.6rem] font-light text-[var(--gray-5)] mt-[2rem] mb-0">
            {post?.content}
          </p>
        </div>
      </div>

      <div className="w-full text-center mt-[3.2rem]">
        <Button to="/">Voltar para home</Button>
      </div>
    </>
  );
};

export default Post;
