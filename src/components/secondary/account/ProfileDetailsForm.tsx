import React from 'react'
import { Icon } from '@iconify/react';
import Input from '../../lib/custom/Input';
import { UseFormReturnType } from '@mantine/form';
import { UseMutationResult } from '@tanstack/react-query';
import { Box, Flex, UnstyledButton } from '@mantine/core';
import Form from '@/components/lib/custom/Form';
import { InitialValuesType } from '@/pages/account';
import { UpdateProfileData } from '@/services/types/user.types';
import avatar from '@/assets/imgs/avatar.png'
import { AxiosError } from 'axios';
import Image from 'next/image';
import { UserKey } from '@/redux/types/user.type';
import cookie from 'cookiejs';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/router';

interface Props {
  handleSubmit: (values: InitialValuesType) => void
  mutation: UseMutationResult<any, AxiosError<unknown, any>, UpdateProfileData, unknown>
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
}

export default function ProfileDetailsForm({
  form,
  mutation,
  handleSubmit
}: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(setUser(null))
    cookie.remove(UserKey.BOOKIED_USER)
    router.push('/login')
  }

  return (
    <Form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box>
        <Box className="lg:h-[200px] lg:w-[200px] mx-auto w-[135px] h-[135px] rounded-full">
          <Image
            priority
            src={avatar}
            width={100}
            height={100}
            alt="profile-image"
            className='object-cover mx-auto object-center w-full h-full'
          />
        </Box>

        <Box className='text-center mt-3'>
          <UnstyledButton onClick={handleLogout} className="w-20 py-2 transition duration-75 delay-75 ease-linear hover:bg-red-500 bg-red-400 rounded-full text-xs font-semibold text-white text-center">
            Logout
          </UnstyledButton>
        </Box>

        <Box className="space-y-4 mt-6">
          <Flex className='items-start space-x-6 justify-between'>
            <Box className='w-full'>
              <Input
                {...form.getInputProps('first_name')}
                type='text'
                label='First name'
                placeholder="John"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.first_name ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </Box>

            <Box className='w-full'>
              <Input
                {...form.getInputProps('last_name')}
                type='text'
                label='Last name'
                placeholder="Doe"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.last_name ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </Box>
          </Flex>

          <Box>
            <Input
              {...form.getInputProps('email')}
              type='email'
              label='Email'
              placeholder="john@example.com"
              readOnly
              disabled={mutation.isPending}
              className={`w-full border-[#D0D5DD] focus:outline-none border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </Box>

          <Box>
            <Input
              {...form.getInputProps('phone_number')}
              type='number'
              label='Phone number'
              placeholder="0915890267840"
              disabled={mutation.isPending}
              className={`w-full ${form.errors.phone_number ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </Box>
        </Box>

        <Box className='mt-14'>
          <UnstyledButton
            disabled={mutation.isPending || !form.isDirty()}
            type='submit'
            className='w-full disabled:cursor-not-allowed disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
          >
            {mutation.isPending ?
              <Icon
                className={`animate-spin mx-auto`}
                icon="icomoon-free:spinner2"
                color="white"
                width="20"
                height="20"
              /> :
              'Update profile'
            }
          </UnstyledButton>
        </Box>
      </Box>
    </Form>
  )
}