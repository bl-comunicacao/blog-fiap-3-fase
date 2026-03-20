import Container from "../Ui/Container"

const Footer = () => {
  return (
    <footer className="w-full mt-[3.2rem] mb-[12.8rem] max-[800px]:mb-[6.4rem]">
      <Container>
        <div className="w-full flex justify-center">
          <p className="text-[1.8rem] text-[var(--white-light)] my-[6.4rem] mb-[3.2rem]">2026 | Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
