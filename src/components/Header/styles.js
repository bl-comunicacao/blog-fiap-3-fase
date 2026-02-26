import styled from "styled-components"

export const HeaderContainer = styled.header`
  width: 100%;
  margin-top: 3.2rem;
  margin-bottom: 12.8rem;
`

export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`

export const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.div`
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--white);
  }
`
export const Search = styled.div``

export const SearchInput = styled.input`
  width: 100%;
  min-width: 38rem;
  height: 4.8rem;
  font-size: 1.6rem;
  color: var(--white);
  background-color: #151b26;
  border: 0;
  border-radius: 8px;
  padding: 0.8rem 1.6rem;
  transition: 0.3s ease;
  position: relative;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--white);
    opacity: 0.4;
  }
`

export const Menu = styled.div``

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

export const NavLink = styled.a`
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--white);
  transtion: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`
