import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeleteAccountModal from "./DeleteAccountModal";
import { useMutation } from "@tanstack/react-query";
import cookie from "cookiejs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { UserKey } from "@/redux/types/user.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AxiosError } from "axios";
import { setUser } from "@/redux/slices/userSlice";
import { deleteAccount } from "@/services/api/user";

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
        cookie.remove(UserKey.BOOKIED_USER)
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
                icon='heroicons:trash' color='#DC180C'
                width="20" height="20"
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
        mutation={mutation}
        opened={opened}
        close={close}
      />
    </React.Fragment>
  )
}