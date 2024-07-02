import React from "react";

interface Props {
  children: React.ReactNode,
  className?: string,
  style?: any
}

const NavElement: React.FC<Props> = ({
  children,
  className,
  style
}) => {
  return (
    <nav style={style} className={className}>
      {children}
    </nav>
  )
}

export default NavElement