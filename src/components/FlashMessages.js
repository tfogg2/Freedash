import React from "react"
import { CSSTransition } from "react-transition-group"

function message() {
  
}

function FlashMessages(props) {
  return (
    <div  className="floating-alerts" unmountOnExit>
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages