import React, { useState } from "react"
import { createUseStyles } from "react-jss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faBars, faTimesCircle, faBorderNone } from "@fortawesome/free-solid-svg-icons"
import onClickOutside from "react-onclickoutside"

const useStyles = createUseStyles(theme => ({
  ddWrapper: {
    width: "100%",
    display: "none",
    "@media (max-width: 640px)": {
      display: "flex",
      flex: "1"
    }
  },
  ddWrapperOpen: {
    height: "100vh"
  },
  ddSpacer: {
    display: "flex",
    flex: "3"

  },
  ddHeaderAction: {
    display: "flex",
    flex: "1",
    "& p": {
      cursor: "pointer",
      display: "flex",
      outline: "none",
      flex: "2"
    }
  },
  noOutline: {
    outline: "0"
  }
}))

function Dropdown({ title, items = [], multiSelect = false }) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const classes = useStyles()
  const ddWrapperClass = open ? classes.ddWrapperOpen : classes.ddWrapper
  const toggle = () => setOpen(!open)
  Dropdown.handleClickOutside = () => setOpen(false)

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item])
      } else if (multiSelect) {
        setSelection([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(current => current.id != item.id)
      setSelection([...selectionAfterRemoval])
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div className={ddWrapperClass}>
      <div className={classes.noOutline} tabIndex={0} className={classes.ddHeader} role="button" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
        <div className={classes.ddHeaderTitle}>
          <p className={classes.ddHeaderTitleBold}></p>
        </div>
        <div className={classes.ddHeaderAction}>
          <p>{open ? <FontAwesomeIcon icon={faTimesCircle} /> : <FontAwesomeIcon icon={faBars} />}</p>
        </div>
        {open && (
          <>
            <ul className={classes.ddList}>
              {items.map(item => (
                <li className={classes.ddListItem} key={item.id}>
                  <button type="button" onClick={() => handleOnClick(item)}>
                    <span>{item.value}</span>
                    <span>{isItemInSelection(item) && "Selected"}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className={classes.rightNav}>
              <button>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button>HELPDESK</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
}

export default onClickOutside(Dropdown, clickOutsideConfig)