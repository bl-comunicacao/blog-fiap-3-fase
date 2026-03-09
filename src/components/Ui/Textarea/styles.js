import styled from "styled-components"

export const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 46rem;
`

export const StyledTextarea = styled.textarea`
  width: 100%;

  font-size: 1.6rem;
  color: var(--white-light);
  background-color: var(--black-light);

  border: 0;
  border-radius: 0.4rem;

  padding: 1.6rem;

  transition: 0.3s ease;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: "Rubik", sans-serif;
    font-size: 1.4rem;
    color: var(--white-light);
    opacity: 0.4;
  }
`
