import React, { useState, useEffect, useRef } from 'react'

// Firebase SDK imports
import { doc, getDoc } from 'firebase/firestore'

// Get auth context
import { useAuth } from '../context/AuthContext'

// Import Firestore db
import { db } from '../firebase'

export default function useFetchTodos() {

    // Loading and error state
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Todos state
    const [todos, setTodos] = useState(null)

    // Get currentUser from auth context
    const { currentUser } = useAuth()

    // Fetch user's todos on mount
    useEffect(() => {

        async function fetchData() {

            // Try getting the user doc
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)

                // If exists, set todos state 
                if (docSnap.exists()) {
                    setTodos(docSnap.data().todos)

                    // If doesn't exist, set empty object
                } else {
                    setTodos({})
                }

                // Catch errors  
            } catch (err) {
                setError('Failed to load todos')
                console.log(err)

                // Always reset loading state  
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    // Return state, state updater fn, and helpers
    return { loading, error, todos, setTodos }

}