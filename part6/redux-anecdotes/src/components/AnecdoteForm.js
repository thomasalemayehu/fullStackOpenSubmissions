import React, { useRef } from "react";

import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const anecdoteRef = useRef();
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    dispatch(createNewAnecdote(anecdoteRef.current.value));
    anecdoteRef.current.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input ref={anecdoteRef} />
        </div>
        <button type="submit" onClick={createAnecdote}>
          create
        </button>
      </form>
    </>
  );
}

export default AnecdoteForm;
