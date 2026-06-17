import { auth } from '@/auth'
import React from 'react'

const page = async () => {
  const session = await auth();
  console.log("SESSION:",session)
  return (
    <div>
      Today

      <h1 className='font-semibold'>{JSON.stringify(session, null, 2)}</h1>
    </div>
  )
}

export default page

// app/dashboard/page.tsx

// import { auth } from "@/auth";

// export default async function Dashboard() {
//   const session = await auth();

//   console.log("SESSION:", session);

//   return (
//     <pre>{JSON.stringify(session, null, 2)}</pre>
//   );
// }