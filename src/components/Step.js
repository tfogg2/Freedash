import React, { useEffect, useContext } from "react"
import { useParams } from 'react-router-dom'
import { createUseStyles } from "react-jss"
import { useImmerReducer } from 'use-immer'
import clsx from 'clsx'
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCheck, faPenSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip"
import Axios from "axios"
import StateContext from "../StateContext"

const useStyles = createUseStyles(theme => ({
  step: {
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "row",
    "& span": {
      fontSize: "20px"
    }
  },
  stepBody: {
    display: "flex",
    flexDirection: "column",
    flex: 8
  },
  stepDuration: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 2
  },
  stepSpan: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  },
  editSpan: {
    color: "#6767ff",
    cursor: "pointer"
  },
  incomplete: {
    color: "#fff",
    opacity: 0
  },
  stepCompleted: {
    "& span": {
      color: "#6767ff",
      display: "flex",
      flex: 1,
      fontSize: "24px",
      justifyContent: "flex-end",
      alignItems: "center"
    }
  },
  stepFormHolder: {
    position: "fixed",
    bottom: 0,
    left: 0,
    transition: ".33s all ease-in-out",
    width: "100%",
    background: "#6767ff",
    alignItems: "center",
    justifyContent: "center",

  },
  stepInfo: {
    display: "flex",
    flex: 1,
    width: "50%",
    margin: "0 auto",
    color: "#fff",
    "& h2": {
      display: "flex",
      justifyContent: "flex-start",
      flex: 1
    },
    "& span": {
      marginTop: "10px",
      cursor: "pointer",
      fontSize: "24px"
    }
  },
  stepForm: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "50%",
    margin: "0 auto",
    "& button": {
      background: "#6767ff",
      color: "#fff",
      marginTop: "20px",
      border: "1px solid #fff",

    },
  },
  stepSegment: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 0",
    "& input": {
      flex: 1,
      display: "flex",
      height: 40,
      boxSizing: "border-box",
      padding: 5,
      margin: "0 10px 0 0 ",
      border: "0",
      borderRadius: 5,
    },
    "& span": {
      flex: 1,
      display: "flex",
    },
    "& label": {
      margin: "0 10px 0 0 ",
      color: "#fff",
      lineHeight: "40px",
      justifyContent: "flex-end"
    },
    "& select": {
      padding: "0 10px",
      height: 40,
      borderRadius: 5,
      border: "0"
    },
  },

}))



function Step(props) {
  const classes = useStyles()

  const initialState = {
    step: {
      name: props.step.name,
      duration: props.step.duration,
      isCompleted: props.step.isCompleted
    },
    isStepEditing: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "toggleEdit":
        draft.isStepEditing = !draft.isStepEditing
        return

      case "updateStep":
        draft.step.name = action.data.name
        draft.step.duration = action.data.duration
        draft.step.isCompleted = action.data.isCompleted
        return

      case "stepName":
        draft.step.name = action.value
        return

      case "stepName":
        draft.step.duration = action.value
        return



    }
  }



  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const appState = useContext(StateContext)
  const { id } = useParams()


  function toggleStepEdit(e) {
    e.preventDefault()
    dispatch({ type: "toggleEdit" })
  }

  async function handleStepEdit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post(`http://localhost:5000/projects/${id}/edit/${props.step._id}`, { name: state.step.name, duration: state.step.duration, isCompleted: state.step.isCompleted, id: props.step_id }, { headers: { "freedashToken": appState.user.token } })
      console.log(response.data)
      dispatch({ type: "toggleEdit" })
      dispatch({ type: "updateStep", data: response.data })
    } catch {
      console.log("There was an error.")
    }
  }

  return (
    <div>
      <div className={state.step.isCompleted ? clsx(classes.step, classes.stepCompleted) : classes.step}>
        <div className={classes.stepBody}>
          <h3>{state.step.name}</h3>

        </div>
        <div className={classes.stepDuration}>
          <p>{state.step.duration} minutes</p>
        </div>
        <div className={classes.stepSpan}>
          <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />{" "}
          {state.step.isCompleted ? <span data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span> : <span className={classes.incomplete} data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span>}
        </div>
        <div className={classes.stepSpan}>
          <span onClick={toggleStepEdit} className={classes.editSpan} data-tip="Completed"><FontAwesomeIcon icon={faEdit} /></span>
        </div>
      </div>
      {state.isStepEditing && (

        <div className={classes.stepFormHolder}>
          <div className={classes.stepInfo}>
            <h2>Edit Step</h2>
            <span onClick={() => { dispatch({ type: "toggleEdit" }) }}>&times;</span>
          </div>
          <form onSubmit={handleStepEdit} className={classes.stepForm}>
            <div className={classes.stepSegment}>
              <input className={classes.stepName} value={state.step.name} placeholder={state.step.name !== "" ? "" : "What's next?"} onChange={e => dispatch({ type: "stepName", value: e.target.value })} />
              <input type="number" value={state.step.duration} placeholder={state.step.duration ? "" : "Duration (In minutes)"} className={classes.stepDuration} onChange={e => dispatch({ type: "stepDuration", value: e.target.value })} />
            </div>
            <br />
            <div className={classes.stepSegment}>
              <label>Has this step been completed?</label>
              <select selected={state.step.isCompleted} onChange={e => dispatch({ type: "toggleCompleted", value: e.target.value })}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <button type="submit" >Update</button>
          </form>

        </div>

      )}
    </div>
  )
}

export default Step