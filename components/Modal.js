// Import React hooks and ReactDOM 
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

// Import AuthContext to access auth state
import { useAuth } from '../context/AuthContext'

// Modal component function
export default function Modal(props) {

    // Destructure setOpenModal from props
    const { setOpenModal } = props

    // State to hold document element
    const [_document, set_document] = useState(null)

    // Get logout function from AuthContext
    const { logout } = useAuth()

    // On mount, set _document to actual document 
    useEffect(() => {
        set_document(document)
    }, [])

    // Don't render anything if no _document
    if (!_document) { return null }

    // Render modal HTML using React Portal
    return ReactDom.createPortal(
        <div className='fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col'>

            {/* Modal header */}
            <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
                <h1 className='font-extrabold text-2xl sm:text-5xl select-none'>MENU</h1>

                {/* Close icon */}
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"></i>
            </div>

            {/* Modal content */}
            <div className='p-4 flex flex-col gap-3'>

                {/* Logout button */}
                <h2 onClick={() => {
                    logout()
                    setOpenModal(false)
                }} className='select-none duration-300 hover:pl-2 cursor-pointer'>Logout</h2>
            </div>

        </div>,

        // Portal element
        _document.getElementById('portal')
    )
}