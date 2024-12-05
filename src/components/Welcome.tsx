import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="bg-slate-700 h-full text-white flex justify-center items-center flex-col gap-4">
      <h2 className="text-2xl font-bold">Welcome to React Chat.</h2>

      <p className="text-lg">
        Sign in with Google to chat with with your fellow React Developers.
      </p>

      <button
        className="flex items-center gap-2 border rounded-md p-2"
        onClick={googleSignIn}
      >
        <FaGoogle /> Iniciar Sesión con Google
      </button>
    </main>
  );
};

export default Welcome;
