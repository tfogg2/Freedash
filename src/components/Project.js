import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import { Link } from 'react-router-dom'

const useStyles = createUseStyles(theme => ({
  project: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    background: "#fff",
    transition: ".2s all ease-in-out",
    overflow: "hidden",
    justifyContent: "center",
    borderBottom: ".5px solid #f7f7f7",
    // backgroundImage: "linear-gradient(to bottom, transparent, #f9f9f9)",
    padding: "30px",
    '&:hover': {
      background: "#6767ff36"
    },
    '& p': {
      margin: 0,
      height: "20px"
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
