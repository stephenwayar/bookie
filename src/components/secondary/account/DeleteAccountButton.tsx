import React from "react";
import cookie from "cookiejs";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { setUser } from "@/redux/slices/user";
import { useDisclosure } from '@mantine/hooks';
import { UserKey } from "@/redux/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/services/api/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeleteAccountModal from "./DeleteAccountModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";

export default function DeleteAccountButton() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [opened, { open, close }] = useDisclosure(false);
  const user = useAppSelector((state) => state.user.value)

  const mutation = useMutation({
    mutationFn: () => deleteAccount(user?.id as string),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      toast.error(errorData.message || 'There was a problem deleting your account.')
    },

    onSuccess: () => {
      toast.success('Your account has been deleted')

      close()

      setTimeout(() => {
        dispatch(setUser(null))
        cookie.remove(UserKey.BOOKIE_USER)
        push('/')
      }, 2000)
    },
  })

  return (
    <React.Fragment>
      <Box className="w-full">
        <UnstyledButton onClick={open} className='w-fit transition duration-75 delay-50 ease-linear'>
          <Flex className="items-center space-x-[10px]">
            <Box className="w-[20px] h-[20px]">
              <Icon
                color='#DC180C'
                width="20" height="20"
                icon='heroicons:trash'
              />
            </Box>

            <Box>
              <Text className="text-[#DC180C]">
                Delete Account
              </Text>
            </Box>
          </Flex>
        </UnstyledButton>
      </Box>

      <DeleteAccountModal
        close={close}
        opened={opened}
        mutation={mutation}
      />
    </React.Fragment>
  )
}