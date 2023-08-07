import React, { useState } from 'react'
// Import AuthContext to access authentication state and info
import { useAuth } from '../context/AuthContext'

// Import TodoCard child component 
import TodoCard from './TodoCard'

// Firebase SDK imports for Firestore database
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'

// Custom hook to handle fetching user's todos from Firestore
import useFetchTodos from '../hooks/fetchTodos'

export default function UserDashboard() {

    // Get authentication context values
    // This provides access to user info and currentUser object
    const { currentUser } = useAuth()

    // Local state for managing edit mode and new todo values
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [edittedValue, setEdittedValue] = useState('')

    // Destructure todos state and state update function from custom hook
    // Also tracks loading and error states
    const { todos, setTodos, loading, error } = useFetchTodos()

    // Handler to add a new todo
    // Async to handle updating Firestore
    async function handleAddTodo() {

        // Validation - return early if no todo text
        if (!todo) {
            return
        }

        // Generate a unique key for the new todo
        // Use length if first todo, otherwise max + 1
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1

        // Update the local todos state with the new todo
        setTodos({ ...todos, [newKey]: todo })

        // Create a reference to the user doc in Firestore
        const userRef = doc(db, 'users', currentUser.uid)

        // Update the user doc, merging the new todo data  
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true })

        // Reset the todo text input  
        setTodo('')
    }

    // Handler to edit an existing todo
    async function handleEditTodo() {

        // Validation - return early if no editted value 
        if (!edittedValue) { return }

        // Get the key of the todo being edited
        const newKey = edit

        // Update the local todos state with the edited todo
        setTodos({ ...todos, [newKey]: edittedValue })

        // Create a reference to the user doc in Firestore
        const userRef = doc(db, 'users', currentUser.uid)

        // Update the user doc, merging the edited todo data
        await setDoc(userRef, {
            'todos': {
                [newKey]: edittedValue
            }
        }, { merge: true })

        // Reset the edit state fields
        setEdit(null)
        setEdittedValue('')
    }

    // Handler to set a todo into edit mode
    // Saves the key and text value
    function handleAddEdit(todoKey) {
        return () => {
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }

    // Handler to delete a todo
    function handleDelete(todoKey) {
        // Async to handle updating Firestore
        return async () => {

            // Create a new object without the target key
            const tempObj = { ...todos }
            delete tempObj[todoKey]

            // Update local state
            setTodos(tempObj)

            // Create a reference to the user doc in Firestore
            const userRef = doc(db, 'users', currentUser.uid)

            // Update the user doc, removing the todo  
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true })

        }
    }

    return (
        <div className='w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5'>
            <div className='flex items-stretch'>
                <input type='text' placeholder="Enter todo" value={todo} onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
                <button onClick={handleAddTodo} className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-medium text-base duration-300 hover:opacity-40'>ADD</button>
            </div>
            {(loading) && (<div className='flex-1 grid place-items-center'>
                <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
            </div>)}
            {(!loading) && (
                <>
                    {Object.keys(todos).map((todo, i) => {
                        return (
                            <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} edit={edit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue} handleDelete={handleDelete}>
                                {todos[todo]}
                            </TodoCard>
                        )
                    })}
                </>
            )}
        </div>
    )
}