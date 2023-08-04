import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='header'>
      <Link href="/">
        Home
      </Link>
      <Link href="/login">
        Log In
      </Link>
      <Link href="/logout">
        Log Out
      </Link>
      <Link href="/user">
        User
      </Link>
    </div>
  )
}
