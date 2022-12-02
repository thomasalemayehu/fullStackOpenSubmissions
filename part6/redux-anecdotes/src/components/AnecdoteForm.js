import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../slices/anecdoteSlice'
import { setNotification } from '../slices/notificationSlice'

function AnecdoteForm(props) {
  const anecdoteRef = useRef()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    props.createAnecdote(anecdoteRef.current.value)
    props.setNotification(`${anecdoteRef.current.value} added!`)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
