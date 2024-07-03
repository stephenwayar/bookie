import React from 'react'
import { Box, Text } from '@mantine/core'
import AccountNavLink from './AccountNavLink'
import DeleteAccountButton from '../account/DeleteAccountButton'

export default function AccountSideNav() {
  const links = [
    {
      text: 'Personal Details',
      linkTarget: '/account',
      icon: 'heroicons:user'
    },
    {
      text: 'Add Book',
      linkTarget: '/account/add-book',
      icon: 'bx:book-add'
    },
    {
      text: 'Reading List',
      linkTarget: '/account/reading-list',
      icon: 'fluent:reading-list-28-filled'
    }
  ]

  return (
    <Box className='w-[20rem] xl:w-[25rem] h-[90vh] fixed overflow-y-auto border-r-2 border-neutral-200 pt-8 pb-20'>
      <Box>
        <Text className='font-semibold text-lg text-[#090A04]'>
          Account
        </Text>
      </Box>

      <Box className='mt-10 space-y-10 relative' style={{ height: 'calc(100% - 15vh)' }}>
        {links.map((link, i) => (
          <AccountNavLink
            key={i}
            icon={link.icon}
            text={link.text}
            linkTarget={link.linkTarget}
          />
        ))}
      </Box>

      <DeleteAccountButton />
    </Box>
  )
}