// Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName, password: password })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Redirect to the landing page on successful login
        router.push('/Landing', { scroll: false });
      } else {
        // Handle error messages
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={handleUserNameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
