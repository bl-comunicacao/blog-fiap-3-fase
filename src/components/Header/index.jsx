import {
  HeaderContainer,
  Container,
  Items,
  Logo,
  Search,
  SearchInput,
  Menu,
  Nav,
  NavLink,
} from "./styles"

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Items>
          <Logo>
            <h1>BFIAP</h1>
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
        </Items>
      </Container>
    </HeaderContainer>
  )
}

export default Header
