import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(() => ({
  defaultForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  formControlHolder: {
    margin: "10px 0"
  }
}))

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const classes = useStyles()
  const owner = useContext(StateContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:5000/projects/create", { title, desctiprion, owner })
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "You have successfully logged in!" })
        const id = response.data.user.id
        props.history.push(`users/${id}`)
      } else {
        console.log("Incorrect username or password.")
        appDispatch({ type: "flashMessage", value: "Invalid Username/Password" })
      }
    } catch (e) {
      console.log("There was a problem!" + e)
    }
  }

function CreateProject() {
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit} className={classes.defaultForm}>
      <div className={classes.defaultFormHolder}>
        <div className={classes.formControlHolder}>
          <input onChange={e => setTitle(e.target.value)} name="title" className={classes.formControl} type="text" placeholder="Title" autoComplete="off" />
        </div>
        <div className={classes.formControlHolder}>
          <input onChange={e => setDescription(e.target.value)} name="description" className={classes.formControl} type="description" placeholder="Description" />
        </div>
        <div className={classes.formControlHolder}>
          <button className={clsx(classes.btn, classes.btnSuccess)}>Create Project</button>
        </div>
      </div>
    </form>
  )
}

export default CreateProject
