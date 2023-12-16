import React from 'react'
import { UserProfile } from '../features/user/components/UserProfile'
import {Navbar} from '../features/navigation/components/Navbar'

export const UserProfilePage = () => {
  return (
    <>
    <Navbar/>
    <UserProfile/>
    </>
  )
}
