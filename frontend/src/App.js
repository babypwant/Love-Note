import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Notebook from './components/Notebook'
import Note from "./components/Note";
import Home from "./components/Homepage/Home.js";
import NotebookEdit from "./components/Notebook/NotebookEdit";
import AllNotes from "./components/Note/AllNotes";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import FrontPage from "./components/Homepage";
import EditNote from "./components/Note/EditNote";


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
      <Route path='/edit/notebook/:id'>
        <div style={{
          height: '937',
          backgroundColor: `rgba(47,49,60,255)`,
        }}>
          <NotebookEdit />
        </div>
      </Route>
      <Route path='/notes/:id' exact>
        <Note />
      </Route>
      <Route path='/edit/note/:id'>
        <EditNote />
      </Route>
      <Route path='/all/notes/:id'>
        <AllNotes />
      </Route>
      <Route path='/' exact>
        <FrontPage />
      </Route>
      <Route path='/home' exact>
        <Home />
      </Route>
    </>
  );
}

export default App;