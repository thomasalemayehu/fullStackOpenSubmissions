import React, { useState } from 'react';

function LoginForm({ onLoginFormSubmit }) {
  const [username, setUsername] = useState('Thomas');
  const [password, setPassword] = useState('mypasswordisgood');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  return (
    <form
      id='loginForm'
      onSubmit={(e) => {
        e.preventDefault();
        onLoginFormSubmit(username, password);
      }}
    >
      <h1>Login</h1>

      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id='usernameInput'
          value={username}
          onChange={onUsernameChange}
        />
      </div>

      <br />

      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id='passwordInput'
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>

      <br />

      <div>
        <input type="submit" value="Login" id='loginButton'/>
      </div>
    </form>
  );
}

export default LoginForm;
