import React from "react";
import { Icon } from '@iconify/react';
import { UseMutationResult } from "@tanstack/react-query";
import { Text, Box, UnstyledButton, Modal } from '@mantine/core'

interface Props {
  opened: boolean;
  close: () => void;
  mutation: UseMutationResult<any, Error, void, unknown>;
}

const DeleteAccountModal = ({ mutation, opened, close }: Props) => {
  return (
    <React.Fragment>
      <Modal
        centered
        size={450}
        radius={12}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          style: { backgroundColor: '#D9D9D966' }
        }}
      >
        <Box className="p-3 space-y-6">
          <Text className="text-[#DC180C] text-lg font-semibold">
            Delete Account
          </Text>

          <Text className="text-[#475569]">
            Deleting your <span className='font-bold'>account</span> will permanently erase every data.
          </Text>

          <Box className="flex !mt-8 justify-between space-x-5 items-center">
            <Box className="w-[40%]">
              <UnstyledButton
                onClick={close}
                style={{ border: '2px solid #999999' }} className="text-neutral-500 font-semibold hover:bg-neutral-500 hover:text-white h-14 w-full text-center rounded-full transition duration-75 delay-[50ms] ease-linear"
              >
                Cancel
              </UnstyledButton>
            </Box>

            <Box className="w-[60%]">
              <UnstyledButton
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                style={{ border: '2px solid #D42620' }} className="font-semibold bg-[#DC180C] hover:bg-[#d42620d8] disabled:opacity-75 disabled:cursor-not-allowed text-white h-14 w-full text-center rounded-full transition duration-75 delay-[50ms] ease-linear"
              >
                {mutation.isPending ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Delete'
                }
              </UnstyledButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default DeleteAccountModal