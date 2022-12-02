import React, { useRef } from 'react'

import { useDispatch } from 'react-redux'
import { createAnecdote } from '../slices/anecdoteSlice'
import { setNotification } from '../slices/notificationSlice'

function AnecdoteForm() {
  const anecdoteRef = useRef()
  const dispatch = useDispatch()

  const createNewAnecdote = async(event) => {
    event.preventDefault()
    dispatch(createAnecdote(anecdoteRef.current.value))
    dispatch(setNotification(`${anecdoteRef.current.value} added!`))
    anecdoteRef.current.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input ref={anecdoteRef} />
        </div>
        <button type="submit" onClick={createNewAnecdote}>
          create
        </button>
      </form>
    </>
  )
}

export default AnecdoteForm
