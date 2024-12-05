import { auth } from "./firebase";
import { ChatBox, NavBar, Welcome } from "./components";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
};

export default App;
