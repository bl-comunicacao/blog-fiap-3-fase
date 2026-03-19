const Container = (props) => {
  const { className = "", ...rest } = props
  return (
    <div
      className={`w-full max-w-[144rem] mx-auto px-[3.2rem] ${className}`}
      {...rest}
    />
  )
}

export default Container
