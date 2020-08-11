import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import clsx from 'clsx'
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCheck, faPenSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip"

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
    color: "#6767ff"
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
  }

}))

function Step(props) {
  const classes = useStyles()
  return (
    <div className={props.step.isCompleted ? clsx(classes.step, classes.stepCompleted) : classes.step}>
      <div className={classes.stepBody}>
        <h3>{props.step.name}</h3>

      </div>
      <div className={classes.stepDuration}>
        <p>{props.step.duration} minutes</p>
      </div>
      <div className={classes.stepSpan}>
        <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />{" "}
        {props.step.isCompleted ? <span data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span> : <span className={classes.incomplete} data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span>}
      </div>
      <div className={classes.stepSpan}>
        <span className={classes.editSpan} data-tip="Completed"><FontAwesomeIcon icon={faEdit} /></span>
      </div>


    </div>
  )
}

export default Step