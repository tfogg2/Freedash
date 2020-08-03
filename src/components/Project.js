import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import {Link} from 'react-router-dom'

const useStyles = createUseStyles(theme => ({
  project: {
   display: "flex",
   flex: 1,
   flexDirection: "column",
   background: "#fff",
   border: "1px solid #f9f9f9",
   padding: "0px 20px",
   margin: -1,
   minWidth: 300,
   '&:hover': {
     background: "#e0e0e0"
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
