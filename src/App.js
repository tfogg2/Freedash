import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import { ThemeProvider } from "react-jss"
import theme from "./Styles/theme"
import HeaderLoggedOut from "./components/HeaderLoggedOut"
import HeaderLoggedIn from "./components/HeaderLoggedIn"
import HomeGuest from "./components/HomeGuest"
import Login from "./components/Login"
import Register from "./components/Register"
import Footer from "./components/Footer"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("freedashToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("freedashToken"),
      username: localStorage.getItem("freedashUsername")
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

      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("freedashToken", state.user.token)
      localStorage.setItem("freedashUsername", state.user.username)
    } else {
      localStorage.removeItem("freedashToken")
      localStorage.removeItem("freedashUsername")
    }
  }, [state.loggedIn])

  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {state.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
          <Switch>
            <Route path="/" component={HomeGuest} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/projects" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </ThemeProvider>
  )
}

export default App
