import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import fbase from "fbase";
import { appAuth } from "fbase";

console.log(fbase);
//FirebaseAppImpl type

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    appAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing.."}

      <br></br>
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
