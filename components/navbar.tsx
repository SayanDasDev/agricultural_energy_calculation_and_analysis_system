"use client"

import { signOutAction } from '@/lib/signout'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <Button onClick={async () => signOutAction()}>Sign out</Button>
  )
}

export default Navbar
