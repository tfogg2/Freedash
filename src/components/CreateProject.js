import React, { useEffect, useContext, useState } from "react"
import { createUseStyles } from "react-jss"
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'
import Axios from 'axios'
import clsx from 'clsx'


const useStyles = createUseStyles(theme => ({
  defaultFormPage: {
    display: "flex",
    background: "#6767ff",
    padding: "100px 0",
    flexDirection: "row"
  },
  defaultForm: {
    display: "flex",
    flex: 4,
    background: "#f9f9f9",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  defaultFormTitle: {
    textAlign: "center",
    "& h2": {
      fontSize: 28,
      color: "#1d1d1d",
      marginTop: 0, 
      "& span": {
        color: "#6767ff"
      }
    },
   
  },
  defaultSideBar: {
    display: "flex",
    flex: 2
  },
  defaultFormHolder: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  formControlHolder: {
    margin: "10px 0",
    display: "flex",
    flex: 1,
    "& input": {
      height: "40px",
      display: "flex",
      textAlign: "center",
      background: "#fff",
      fontSize: 14,
      flex: 1,
      borderRadius: 5,
      border: "1px solid #f1f1f1"
    },
    "& button[type='submit']": {
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#6767ff",
      color: "#fff",
      fontSize: 18,
      flex: 2,
      borderRadius: 5,
      boxSizing: "border-box",
      border: "1px solid #f1f1f1"
    }
  }
}))

function CreateProject(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const loggedInUser = appState.user
  const [email, setEmail] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {

  }, [])

  // const user = state.user
  // const {userId} = user.id

  async function handleSubmit(e) {
    e.preventDefault()
    try {

      const token = appState.user.token
      // const check = await appDispatch({type: "checkToken"})
      // const check = await Axios.post("http://localhost:5000/users/checkToken", { token: loggedInUser.token }, { cancelToken: ourRequest.token })
      const response = await Axios.post("http://localhost:5000/projects/create", { title, description, userId: appState.user.id }, { headers: { "freedashToken": token } })
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "createProject", data: response.data })
        props.history.push("/")
        appDispatch({ type: "flashMessage", value: "You have successfully created a project!" })
      } else {
        appDispatch({ type: "flashMessage", value: "" })
      }


    } catch (e) {
      console.log("There was a problem!" + e)
    }
  }


  const classes = useStyles()
  return (
    <div className={classes.defaultFormPage}>
      <div className={classes.defaultSideBar}></div>
      <form onSubmit={handleSubmit} className={classes.defaultForm}>
        <div className={classes.defaultFormHolder}>
          <div className={classes.defaultFormTitle}>
              <h2>
                Create a Project
              </h2>
          </div>
          <div className={classes.formControlHolder}>
            <input onChange={e => setTitle(e.target.value)} name="title" className={classes.formControl} type="text" placeholder="Title" autoComplete="off" />
          </div>
          <div className={classes.formControlHolder}>
            <input onChange={e => setDescription(e.target.value)} name="description" className={classes.formControl} type="description" placeholder="Description" />
          </div>
          <div className={classes.formControlHolder}>
            <button type="submit">Create Project</button>
          </div>
        </div>
      </form>
      <div className={classes.defaultSideBar}></div>
    </div>
  )
}

export default CreateProject
