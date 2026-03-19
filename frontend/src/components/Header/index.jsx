import logo from "../../assets/svg/logo.svg"
import useAuthStore from "../../stores/useAuthStore"
import { useNavigate } from "react-router-dom"
import Container from "../Ui/Container"

const Header = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    clearAuth()
    navigate("/login")
  }

  return (
    <header className="w-full mt-[3.2rem] mb-[12.8rem] max-[800px]:mb-[6.4rem]">
      <Container>
        <div className="flex items-center justify-between">
          <a href="/">
            <img src={logo} alt="" />
          </a>

          <div>
            <nav className="flex gap-[2rem]">
              {user ? (
                <>
                  <a className="block text-[1.8rem] text-[var(--white-light)] hover:opacity-80 transition-opacity" href="/dashboard">{user.name || user.email}</a>
                  <button className="block text-[1.8rem] text-[var(--white-light)] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity" type="button" onClick={handleLogout}>
                    Sair
                  </button>
                </>
              ) : (
                <a className="block text-[1.8rem] text-[var(--white-light)] hover:opacity-80 transition-opacity" href="/login">Login</a>
              )}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
