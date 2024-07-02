import React, { InputHTMLAttributes, useState } from "react";
import { Icon } from '@iconify/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: any
  label?: string
  icon?: boolean
}

const Input: React.FC<Props> = ({
  error, 
  label, 
  className, 
  onChange,
  type,
  icon,
  disabled, 
  value,
  placeholder,
  ...rest 
}) => {
  const [passwordType, setPasswordType] = useState("password")

  const togglePassword = () => {
    if (passwordType === 'password') {
      return setPasswordType('text')
    }
    
    setPasswordType('password')
  }

  return (
    <>
      {label && 
        <label className="text-sm text-[#090A04]">
          {label}
        </label> 
      }

      {type === 'password' ?
        <div className="relative w-full mt-[0.2rem]">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input 
              className="hidden js-password-toggle" 
              type="checkbox" 
            />
            
            <button 
              type="button" 
              disabled={disabled} 
              onClick={togglePassword} 
              className="text-xs px-2 text-[#464646] cursor-pointer js-password-label" 
            >
              {passwordType === "password" ? 
                <Icon 
                  icon="ion:eye" 
                  color="#C4C4C4" 
                  height="20" 
                  width="20" 
                /> : 

                <Icon 
                  icon="ion:eye-off" 
                  color="#C4C4C4" 
                  height="20" 
                  width="20" 
                />
              }
            </button>
          </div>

          <input 
            placeholder={placeholder} 
            className={`${className}`}
            type={passwordType} 
            onChange={onChange} 
            disabled={disabled} 
            value={value} 
            {...rest}
          />
        </div> : 

        <div className="mt-[0.2rem] relative">
          {icon &&
            <div className="absolute inset-y-0 left-0 flex items-center px-2">
              <input
                className="hidden js-password-toggle"
                type="checkbox"
              />

              <button
                type="button"
                disabled={disabled}
                onClick={togglePassword}
                className="text-xs px-2 text-[#464646] cursor-pointer js-password-label"
              >
                <Icon 
                  icon="lucide:search" 
                  width="20" 
                  height="20" 
                  color="#C4C4C4"
                />
              </button>
            </div>
          }

          <input
            className={`${className}`}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            value={value}
            type={type}
            {...rest}
          />
        </div>
      }

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

export default Input