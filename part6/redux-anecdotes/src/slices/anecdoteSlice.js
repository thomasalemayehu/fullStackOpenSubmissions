import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      console.log(action.payload)
      return action.payload
    },
    createNewAnecdote(state, action) {
      state.push(action.payload)
    },

    voteForAnecdote(state, action) {
      state = state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          anecdote.votes++
        }
        return anecdote
      })
    },
  },
})

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(createNewAnecdote(newAnecdote))
  }
}

const voteAnecdote = (votes, id) => {
  return async (dispatch) => {
    await anecdoteService.voteForAnecdote(votes, id)
    dispatch(voteForAnecdote(id))
  }
}

export const { createNewAnecdote, voteForAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
export { initializeAnecdotes, createAnecdote, voteAnecdote }
