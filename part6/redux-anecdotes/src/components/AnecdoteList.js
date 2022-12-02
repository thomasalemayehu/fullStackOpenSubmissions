import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../slices/anecdoteSlice'
import Anecdote from './Anecdote'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../slices/anecdoteSlice'

function AnecdoteList() {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const filter = useSelector((state) => state.filter)
  let anecdotes = useSelector((state) => state.anecdotes)
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.filterQuery.toLowerCase()))
    .sort((former,latter) => latter.votes - former.votes)

  const vote = (votes,id) => {
    dispatch(voteAnecdote(votes,id))
  }

  return (
    <>
      {
        anecdotes.length > 0
          ?
          anecdotes.map(({ id, content, votes }) => (
            <div key={id}>
              <Anecdote id={id} content={content} votes={votes} vote={vote} />
            </div>
          ))
          :
          <h1>No Results</h1>
      }
    </>
  )
}

export default AnecdoteList
