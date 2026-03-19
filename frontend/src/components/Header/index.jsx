import {
  HeaderContainer,
  Container,
  Items,
  Logo,
  Menu,
  Nav,
  NavLink,
  NavButton,
} from "./styles"

import logo from "../../assets/svg/logo.svg"
import useAuthStore from "../../stores/useAuthStore"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    clearAuth()
    navigate("/login")
  }

  return (
    <HeaderContainer>
      <Container>
        <Items>
          <Logo href="/">
            <img src={logo} alt="" />
          </Logo>

          <Menu>
            <Nav>
              {user ? (
                <>
                  <NavLink href="/dashboard">{user.name || user.email}</NavLink>
                  <NavButton type="button" onClick={handleLogout}>
                    Sair
                  </NavButton>
                </>
              ) : (
                <NavLink href="/login">Login</NavLink>
              )}
            </Nav>
          </Menu>
        </Items>
      </Container>
    </HeaderContainer>
  )
}

export default Header
