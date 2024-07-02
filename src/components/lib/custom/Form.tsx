import React, { FormHTMLAttributes } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode,
  className?: string
}

const Form: React.FC<Props> = ({ 
  children, 
  className,
  onSubmit,
  style
}) => {
  return (
    <form 
      style={style} 
      onSubmit={onSubmit}
      className={className} 
    >
      {children}
    </form>
  )
}

export default Form