import { auth } from '@/auth'
import LogoutButton from '@/components/LogoutBtn';
import React from 'react'

const page = async () => {
  const session = await auth();
  console.log("SESSION:",session)
  return (
    <div>
      Today

      <h1 className='font-semibold'>{JSON.stringify(session, null, 2)}</h1>

      <LogoutButton />
    </div>
  )
}

export default page
  