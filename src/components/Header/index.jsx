import {
  HeaderContainer,
  Container,
  Items,
  Logo,
  Menu,
  Nav,
  NavLink,
} from "./styles"

import logo from "../../assets/svg/logo.svg"

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Items>
          <Logo>
            <img src={logo} alt="" />
          </Logo>

          <Menu>
            <Nav>
              <NavLink href="/login">Login</NavLink>
            </Nav>
          </Menu>
        </Items>
      </Container>
    </HeaderContainer>
  )
}

export default Header
