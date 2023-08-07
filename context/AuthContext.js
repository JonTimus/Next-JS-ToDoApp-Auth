import React, { useContext, useState, useEffect, useRef } from 'react'

// Firebase imports
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

// Create context for managing auth state
const AuthContext = React.createContext()

// Custom hook to use the auth context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    // State for the user object and loading status
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Sign up with email and password
    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        return
    }

    // Log in with email and password
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Log out the current user
    function logout() {
        return signOut(auth)
    }

    // Listen for auth state changes
    // Set user and loading state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    // Context value exposes auth methods and state
    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (

        // Provide context value to tree
        <AuthContext.Provider value={value}>

            {/* Only render children when loading complete */}
            {!loading && children}

        </AuthContext.Provider>
    )
}