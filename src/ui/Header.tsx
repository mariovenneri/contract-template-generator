type HeaderProps = {
  children: React.ReactNode,
  className?: string
}

const Header = ({ className = '', children }: HeaderProps) => {
  return (
    <h1 className={`${className} text-2xl py-6 font-bold`}>{children}</h1>
  )
}

export default Header