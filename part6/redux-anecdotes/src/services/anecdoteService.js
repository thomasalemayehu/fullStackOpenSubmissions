import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const request = await axios.get(baseUrl)

  if (request.status === 200) {
    return request.data
  }
  return null
}

const createNewAnecdote = async (anecdote) => {
  const request = await axios.post(baseUrl, { content: anecdote, votes: 0 })

  if (request.status === 201) {
    return request.data
  }

  return null
}

const voteForAnecdote = async (votes, id) => {
  const request = await axios.patch(`${baseUrl}/${id}`, { votes: votes + 1 })

  return request.data
}

export default { getAllAnecdotes, createNewAnecdote, voteForAnecdote }
