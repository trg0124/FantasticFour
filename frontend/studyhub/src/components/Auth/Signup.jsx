import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav("/home"); // redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button>Sign Up</button>
        {error}
      </form>
    </div>
  );
}