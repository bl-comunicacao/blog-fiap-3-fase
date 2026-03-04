import { StyledTitle } from "./styles"

const Title = ({ size, align, children, ...rest }) => {
  return (
    <StyledTitle $size={size} $align={align} {...rest}>
      {children}
    </StyledTitle>
  )
}

export default Title
