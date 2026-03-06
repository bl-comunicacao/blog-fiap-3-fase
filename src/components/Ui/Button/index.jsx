import { Link } from "react-router-dom"
import { StyledButton } from "./styles"

const Button = ({ to, href, variant = "primary", children, ...props }) => {
  const Component = to ? Link : href ? "a" : "button"

  return (
    <StyledButton
      as={Component}
      to={to}
      href={href}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
