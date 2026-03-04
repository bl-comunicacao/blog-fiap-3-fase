import { Link } from "react-router-dom"
import { StyledButton } from "./styles"

const Button = ({ to, href, ...props }) => {
  if (to) {
    return <StyledButton as={Link} to={to} {...props} />
  }

  if (href) {
    return <StyledButton as="a" href={href} {...props} />
  }

  return <StyledButton {...props} />
}

export default Button
