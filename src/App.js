import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import { ThemeProvider } from "react-jss"
import theme from "./Styles/theme"
import HeaderLoggedOut from "./components/HeaderLoggedOut"
import HeaderLoggedIn from "./components/HeaderLoggedIn"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import Login from "./components/Login"
import Projects from "./components/Projects"
import Register from "./components/Register"
import Footer from "./components/Footer"
import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("freedashToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("auth-token"),
      displayName: localStorage.getItem("freedashUsername")
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login": {
        draft.loggedIn = true
        draft.user = action.data
        return
      }
      case "logout":
        draft.loggedIn = false
        return

      case "register":
        draft.loggedIn = true
        draft.user = action.data
        return

      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }
      const response = await Axios.post("http://localhost:5000/users/tokenIsValid", null, { headers: { "x-auth-token": token } })

      if (response.data) {
        const userRes = await Axios.get("http://localhost:5000/users/:id", { headers: { "x-auth-token": token } })
        dispatch({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  }, [])

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("freedashToken", state.user.token)
      localStorage.setItem("freedashUsername", state.user.displayName)
    } else {
      localStorage.removeItem("freedashToken")
      localStorage.removeItem("freedashUsername")
    }
  }, [state.loggedIn])

  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <BrowserRouter>
            {state.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
            <Switch>
              {state.loggedIn ? <Route path="/" component={Home} exact /> : <Route path="/" component={HomeGuest} exact />}
              <Route path="/login" component={Login} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/register" component={Register} exact />
            </Switch>
            <Footer />
          </BrowserRouter>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  )
}

export default App
