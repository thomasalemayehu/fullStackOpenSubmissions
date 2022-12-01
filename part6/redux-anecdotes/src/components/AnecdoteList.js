import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

function AnecdoteList() {
  const anecdotes = useSelector((state) =>
    state.sort((former, latter) => latter.votes - former.votes)
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <>
      {anecdotes.map(({ id, content, votes }) => (
        <div key={id}>
          <Anecdote id={id} content={content} votes={votes} vote={vote} />
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
