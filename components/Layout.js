import React from 'react'

export default function Layout(props) {
  const {children} = props;
  return (
    <div className='flex flex-col min-h-screen'>{children}</div>
  )
}
