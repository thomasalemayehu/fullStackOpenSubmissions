import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../slices/anecdoteSlice'
import Anecdote from './Anecdote'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../slices/anecdoteSlice'
import { setNotification } from '../slices/notificationSlice'

function AnecdoteList(props) {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [props.initializeAnecdotes])

  const filter = props.filter
  let anecdotes = props.anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.filterQuery.toLowerCase())
    )
    .sort((former, latter) => latter.votes - former.votes)

  const vote = (votes, id) => {
    props.voteAnecdote(votes, id)
    props.setNotification('Voted',5)
  }

  return (
    <>
      {anecdotes.length > 0 ? (
        anecdotes.map(({ id, content, votes }) => (
          <div key={id}>
            <Anecdote id={id} content={content} votes={votes} vote={vote} />
          </div>
        ))
      ) : (
        <h1>No Results</h1>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  initializeAnecdotes,
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
