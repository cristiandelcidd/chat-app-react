import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase";

const NavBar = () => {
  const user = auth.currentUser;

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const signOut = () => auth.signOut();

  return (
    <nav className="px-8 h-20 bg-slate-900 flex justify-between items-center fixed w-full">
      <h1 className="font-bold text-white">React Chat</h1>
      {user ? (
        <button
          onClick={signOut}
          className="font-bold border px-2 py-1 rounded text-white"
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <button className="text-white" onClick={googleSignIn}>
          <FaGoogle />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
