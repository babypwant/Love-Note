import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Notebook from './components/Notebook'
import Note from "./components/Note";
import Home from "./components/Homepage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


///Backgrounds
import notebookBackground from '../src/images/LzRdnr.jpg'
///

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Route path='/notebooks'>
        <div style={{
          height: '100%',
          backgroundImage: `url(${notebookBackground})`
        }}>
          <Notebook />
        </div>
      </Route>
      <Route path='/note'>
        <Note />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </>
  );
}

export default App;