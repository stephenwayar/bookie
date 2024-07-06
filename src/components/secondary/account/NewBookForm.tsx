import React from 'react'
import { AxiosError } from 'axios';
import { Icon } from '@iconify/react';
import Input from '../../lib/custom/Input';
import Form from '@/components/lib/custom/Form';
import { UseFormReturnType } from '@mantine/form';
import { UseMutationResult } from '@tanstack/react-query';
import { Box, Text, UnstyledButton } from '@mantine/core';
import { InitialValuesType } from '@/pages/account/add-book';

interface Props {
  mutation: UseMutationResult<any, AxiosError<unknown, any>, void, unknown>
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>
}

export default function NewBookForm({
  form,
  mutation
}: Props) {
  return (
    <Form onSubmit={form.onSubmit(() => mutation.mutate())}>
      <Box className='space-y-6'>
        <Text className='font-semibold text-lg dark:text-[#e0e0e0] text-[#090A04]'>
          New Book 
        </Text>

        <Box className='space-y-6 w-full'>
          <Box className='w-full'>
            <Input
              {...form.getInputProps('title')}
              type='text'
              label='Book title'
              placeholder="56 Days"
              disabled={mutation.isPending}
              className={`w-full ${form.errors.title ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition dark:bg-[#e0e0e0] duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </Box>

          <Box className='w-full'>
            <Input
              {...form.getInputProps('description')}
              type='text'
              label='Book description'
              placeholder="When lockdown threatens to keep them apart..."
              disabled={mutation.isPending}
              className={`w-full ${form.errors.description ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition dark:bg-[#e0e0e0] duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </Box>

          <Box>
            <UnstyledButton
              disabled={mutation.isPending}
              type='submit'
              className='w-full disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#333333] h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="white"
                  width="20"
                  height="20"
                /> :
                'Add book'
              }
            </UnstyledButton>
          </Box>
        </Box>
      </Box>
    </Form>
  )
}