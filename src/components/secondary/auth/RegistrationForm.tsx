import React from 'react'
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Input from '../../lib/custom/Input';
import Form from '@/components/lib/custom/Form';
import { UseFormReturnType } from '@mantine/form';
import Logo from '@/components/secondary/common/Logo';
import type { InitialValuesType } from '@/pages/register';
import { UseMutationResult } from '@tanstack/react-query';
import { RegistrationData } from '@/services/types/auth.types';
import { Box, Flex, Text, Title, UnstyledButton } from '@mantine/core';

interface Props {
  handleRegister: (values: InitialValuesType) => void
  mutation: UseMutationResult<any, any, RegistrationData, unknown>;
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
}

export default function RegistrationForm({
  form,
  mutation,
  handleRegister
}: Props) {
  return (
    <Form onSubmit={form.onSubmit((values) => handleRegister(values))} className='px-4 sm:px-8 py-14 sm:py-20'>
      <Box className='mx-auto max-w-[37rem]'>
        <Box className='mx-auto w-fit lg:hidden'>
          <Logo />
        </Box>

        <Box className='px-4 sm:px-6 py-8 bg-white shadow-sm rounded-[10px] mt-5 lg:mt-0'>
          <Box className='text-center sm:text-left'>
            <Title className='text-[#000000] !font-bold text-2xl'>
              Create your bookie account
            </Title>
          </Box>

          <Box className='mt-2 w-fit'>
            <Link href='/login'>
              <Text className='underline font-semibold text-[#090A04]'>
                I already have an account
              </Text>
            </Link>
          </Box>

          <Box className="mt-5 space-y-4">
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
                disabled={mutation.isPending}
                className={`w-full ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
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

            <Box>
              <Input
                {...form.getInputProps('password')}
                type="password"
                label='Create password'
                placeholder="******"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </Box>
          </Box>

          <Box className='mt-14'>
            <UnstyledButton
              disabled={mutation.isPending}
              type='submit'
              className='w-full disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ?
                <Icon
                  width="20"
                  height="20"
                  color="white"
                  icon="icomoon-free:spinner2"
                  className={`animate-spin mx-auto`}
                /> :
                'Create Account'
              }
            </UnstyledButton>
          </Box>
        </Box>
      </Box>
    </Form>
  )
}