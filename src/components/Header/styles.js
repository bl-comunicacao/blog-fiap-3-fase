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

export const Logo = styled.a``

export const Menu = styled.div``

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

export const NavLink = styled.a`
  display: block;
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--white-light);
  transtion: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`
