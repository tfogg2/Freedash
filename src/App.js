import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import { ThemeProvider } from "react-jss"
import theme from "./Styles/theme"
import HeaderLoggedOut from "./components/HeaderLoggedOut"
import HomeGuest from "./components/HomeGuest"
import Login from "./components/Login"
import Register from "./components/Register"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login": {
        draft.loggedIn = true
        draft.user = action.data
        return
      }
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <HeaderLoggedOut />
          <Switch>
            <Route path="/" component={HomeGuest} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </ThemeProvider>
  )
}

export default App
