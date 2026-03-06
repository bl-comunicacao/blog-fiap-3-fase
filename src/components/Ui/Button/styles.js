import styled, { css } from "styled-components"

const variants = {
  primary: css`
    background: linear-gradient(224.78deg, #5390e3 8.12%, #1357b3 92.21%);
    color: var(--white-light);
    border: none;
  `,

  secondary: css`
    background: transparent;
    color: var(--blue-light);
    border: 1px solid var(--blue-light);
  `,
}

export const StyledButton = styled.button`
  width: ${({ $full }) => ($full ? "100%" : "fit-content")};
  height: 4.8rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
  font-family: inherit;

  text-decoration: none;

  border-radius: 0.4rem;

  padding: 0 2.4rem;

  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;

  transition: opacity 0.3s ease;

  ${({ $variant }) => variants[$variant || "primary"]}

  &:hover {
    opacity: 0.8;
  }
`
