import React from 'react'
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Form from '../../lib/custom/Form';
import Input from '../../lib/custom/Input';
import { UseFormReturnType } from '@mantine/form';
import type { InitialValuesType } from '@/pages/login';
import Logo from '@/components/secondary/common/Logo';
import { UseMutationResult } from '@tanstack/react-query';
import type { LoginData } from '@/services/types/auth.types';
import { Box, Flex, Text, Title, UnstyledButton } from '@mantine/core';

type Props = {
  handleLogin: (values: InitialValuesType) => void;
  mutation: UseMutationResult<any, Error, LoginData, unknown>;
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
}

export default function LoginForm({
  form,
  mutation,
  handleLogin
}: Props) {
  return (
    <Form onSubmit={form.onSubmit((values) => handleLogin(values))} className='px-4 sm:px-8 py-14 sm:py-20'>
      <Box className='mx-auto max-w-[37rem]'>
        <Box className='mx-auto w-fit lg:hidden'>
          <Link href='/'>
            <Logo />
          </Link>
        </Box>

        <Box className='px-4 sm:px-6 py-8 bg-white shadow-sm rounded-[10px] mt-5 lg:mt-0'>
          <Box className='text-center sm:text-left space-y-2'>
            <Title className='text-[#000000] !font-bold text-2xl'>
              Welcome Back!
            </Title>
          </Box>

          <Box className="mt-5 space-y-4">
            <Box>
              <Input
                {...form.getInputProps('email')}
                type='email'
                label='Email'
                placeholder="john@example.com"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </Box>

            <Box>
              <Input
                {...form.getInputProps('password')}
                type="password"
                label='Password'
                placeholder="******"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </Box>

            <Flex className='w-full items-center justify-between'>
              <Box className='w-fit'>
                <Link href='/register'>
                  <Text className='underline font-semibold text-[#090A04]'>
                    Register Account
                  </Text>
                </Link>
              </Box>
            </Flex>
          </Box>

          <Box className='mt-14'>
            <UnstyledButton
              disabled={mutation.isPending}
              type='submit'
              className='w-full disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="white"
                  width="20"
                  height="20"
                /> :
                'Login'
              }
            </UnstyledButton>
          </Box>
        </Box>
      </Box>
    </Form>
  )
}