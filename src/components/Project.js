import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import { Link } from 'react-router-dom'

const useStyles = createUseStyles(theme => ({
  project: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    background: "#fff",
    minHeight: "90px",
    boxSizing: "border-box",
    overflow: "hidden",
    justifyContent: "center",
    borderBottom: ".5px solid #f3f3f3",
    padding: "10px 20px",
    minWidth: 300,
    '&:hover': {
      background: "#e0e0e0"
    },
    '& h2': {
      margin: "10px 0"
    },
    '& p': {
      margin: 0
    }
  }
}))

function Project(props) {
  const classes = useStyles()
  const project = props.project
  return (
    <Link to={`/projects/${props.project._id}`} key={project._id}>
      <div className={classes.project}>
        <div className={classes.projectHeader}>
          <h2>{props.project.title}</h2>
          <p>{props.project.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default Project
