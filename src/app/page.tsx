import Login from '@/components/LoginBtn'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      Home Page
    <Link href={'/login'}>Login</Link>
      {/* <Login /> */}
    </div>
  )
}

export default page
