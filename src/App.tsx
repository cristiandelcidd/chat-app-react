import { ChatBox, NavBar, Spinner, Welcome } from "./components";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="h-screen">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
};

export default App;
