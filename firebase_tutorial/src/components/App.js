import React, { useState } from "react";
import AppRouter from "components/Router";
import fbase from "fbase";
import { appAuth } from "fbase";

console.log(fbase);
//FirebaseAppImpl type

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(appAuth.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
