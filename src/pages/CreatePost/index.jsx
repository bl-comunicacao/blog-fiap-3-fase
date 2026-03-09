import Input from "../../components/Ui/Input"
import Textarea from "../../components/Ui/Textarea"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Form } from "./styles"
import { FiType, FiFileText, FiUser } from "react-icons/fi"

const CreatePost = () => {
  return (
    <>
      <Container>
        <Title size="md" align="center">
          Adicionar post
          <p>Preencha os campos abaixo para adicionar um novo post ao blog</p>
        </Title>

        <Form action="#">
          <div className="form-group">
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Digite um título"
              autoComplete="off"
              icon={FiType}
              maxLength={120}
              required
            />

            <Input
              type="text"
              name="resume"
              id="resume"
              placeholder="Digite um resumo curto"
              autoComplete="off"
              icon={FiFileText}
              maxLength={200}
              required
            />

            <Input
              type="text"
              name="author"
              id="author"
              placeholder="Digite o nome do autor"
              autoComplete="name"
              icon={FiUser}
              maxLength={80}
              required
            />
          </div>

          <Textarea
            name="description"
            id="description"
            placeholder="Digite o conteúdo completo"
            rows={12}
            required
          />

          <div className="actions">
            <Button>Criar post</Button>
            <Button to="/dashboard" variant="secondary">
              Voltar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default CreatePost
