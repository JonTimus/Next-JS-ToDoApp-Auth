import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='header'>
      <Link href="/" className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
        Home
      </Link>
      <Link href="/login" className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
        Log In
      </Link>
      <Link href="/logout" className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
        Log Out
      </Link>
      <Link href="/user" className='block mt-4 lg:inline-block lg:mt-0 text-blue-400 hover:text-blue-800 mr-4'>
        User
      </Link>
    </div>
  )
}
