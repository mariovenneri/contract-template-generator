const Header = ({className: className, children }) => {
  return (
    <h1 className={`${className} text-2xl py-6 font-bold`}>{children}</h1>
  )
}

export default Header