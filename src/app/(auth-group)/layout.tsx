import UserContextProvider from '@/Components/contexts/UserContext';
import Header from '@/Components/Header';
import { getUserFromCookies } from '@/lib/helper'
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

export default async function Layout({children} : {
    children : ReactNode
})
 {
  const user = await getUserFromCookies();
  

  return (
    <div className='w-full'>
    <UserContextProvider CurrUser={user} >
      <Header />
      {children}
    </UserContextProvider>
    </div>
  )
}
