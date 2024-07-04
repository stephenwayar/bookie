import React, { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: any
  className?: string
  label?: string
}

const TextArea: React.FC<Props> = ({
  error,
  label,
  className,
  onChange,
  disabled,
  value,
  placeholder,
  ...rest
}) => {
  return (
    <>
      {label &&
        <label className="text-sm font-semibold text-[#343434]">
          {label}
        </label>
      }

      <div className="mt-[0.2rem] relative">
        <textarea
          className={`${className}`}
          onChange={onChange}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          {...rest}
        ></textarea>
      </div>

      <div className="mt-[0.2rem]">
        {error &&
          <label className="text-red-500 text-sm">
            {error}
          </label>
        }
      </div>
    </>
  )
}

export default TextArea