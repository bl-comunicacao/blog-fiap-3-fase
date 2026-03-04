import styled from "styled-components"

export const StyledButton = styled.button`
  width: ${({ $full }) => ($full ? "100%" : "fit-content")};
  height: 4.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--white-light);
  transition: opacity 0.3s ease;
  border-radius: 0.4rem;
  border: 0;
  background: linear-gradient(224.78deg, #5390e3 8.12%, #1357b3 92.21%);
  padding: 0.8rem 2.4rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
