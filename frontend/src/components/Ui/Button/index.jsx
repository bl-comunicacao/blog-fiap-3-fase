import { Link } from "react-router-dom"

const Button = ({ to, href, variant = "primary", children, $full, ...props }) => {
  const Component = to ? Link : href ? "a" : "button"
  const baseClass =
    "inline-flex h-[4.8rem] items-center justify-center rounded text-[1.6rem] no-underline px-[2.4rem] transition-opacity duration-300 appearance-none hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
  const widthClass = $full ? "w-full" : "w-fit"
  const variantClass =
    variant === "secondary"
      ? "bg-transparent border border-[var(--blue-light)] text-[var(--blue-light)]"
      : "bg-gradient-to-br from-[#5390e3] to-[#1357b3] text-[var(--white-light)] border-0"

  return (
    <Component
      className={`${baseClass} ${widthClass} ${variantClass}`}
      to={to}
      href={href}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
