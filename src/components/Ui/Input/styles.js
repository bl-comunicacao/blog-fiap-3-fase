import styled from "styled-components"

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 46rem;
`

export const StyledInput = styled.input`
  width: 100%;
  height: 4.8rem;

  font-size: 1.6rem;
  color: var(--white-light);
  background-color: var(--black-light);

  border: 0;
  border-radius: 0.4rem;

  padding: ${({ $hasIcon }) => ($hasIcon ? "0 1.6rem 0 4.8rem" : "0 1.6rem")};

  transition: 0.3s ease;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--white-light);
    opacity: 0.4;
  }
`

export const IconContainer = styled.span`
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  color: var(--blue-light);

  svg {
    width: 2.2rem;
    height: 2.2rem;
  }
`
