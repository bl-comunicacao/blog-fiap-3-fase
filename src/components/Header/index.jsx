import {
  Container,
  Logo,
  Search,
  SearchInput,
  Menu,
  Nav,
  NavLink,
} from "./styles"
import LogoSvg from "../../assets/svg/logo.svg"

const Header = () => {
  return (
    <Container>
      <Logo>
        <img src={LogoSvg} alt="Blog FIAP" />
      </Logo>

      <Search>
        <SearchInput
          type="text"
          name="search"
          id="search"
          placeholder="Buscar"
        ></SearchInput>
      </Search>

      <Menu>
        <Nav>
          <NavLink href="#">Posts</NavLink>
        </Nav>
      </Menu>
    </Container>
  )
}

export default Header
