import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import clsx from 'clsx'
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip"

const useStyles = createUseStyles(theme => ({
  step: {
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "row"
  },
  stepBody: {
    display: "flex",
    flexDirection: "column",
    flex: 4
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
        <p>{props.step.duration}</p>
      </div>

      <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />{" "}
      {props.step.isCompleted && <span data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span>}
    </div>
  )
}

export default Step