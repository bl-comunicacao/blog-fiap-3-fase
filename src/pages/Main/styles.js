import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  padding-left: 3.2rem;
  padding-right: 3.2rem;

  h1 {
    font-size: 3.6rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 3.2rem;
  }
`

export const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-bottom: 6.4rem;
`

export const SearchInput = styled.input`
  width: 100%;
  max-width: 46rem;
  height: 4.8rem;
  font-size: 1.6rem;
  color: var(--white-light);
  background-color: var(--black-light);
  border: 0;
  border-radius: 0.4rem;
  padding: 0.8rem 1.6rem;
  transition: 0.3s ease;
  position: relative;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--white-light);
    opacity: 0.4;
  }
`

export const ButtonInput = styled.button`
  display: block;
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--white-light);
  transtion: opacity 0.3s ease;
  border-radius: 0.4rem;
  border: 0;
  background: linear-gradient(224.78deg, #5390e3 8.12%, #1357b3 92.21%);
  padding: 0.8rem 2.4rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const Items = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6.4rem;
`
