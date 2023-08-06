// ./components/Header.js
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react';
import { data } from 'autoprefixer';

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className='header'>
      <Link href="/" className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
        Home
      </Link>
      {session && (  // the "User" link will only be displayed when the user is signed in. 
        <Link href={`/user/${session.user.name}`} className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
          User
        </Link>
      )}
    </div>
  )
}
