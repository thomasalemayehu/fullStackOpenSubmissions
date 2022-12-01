import React from "react";
import PropTypes from "prop-types";
function Anecdote({ id, content, votes, vote }) {
  return (
    <>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </>
  );
}

Anecdote.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired,
};
export default Anecdote;
