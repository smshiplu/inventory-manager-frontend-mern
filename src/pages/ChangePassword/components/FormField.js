import { useState } from "react"

export const FormField = ({item}) => {
  const [showHideToggle, setShowHideToggle] = useState(false);

  const handleShowHide = (e) => {
    setShowHideToggle(!showHideToggle);

    let element;
    if(e.target.tagName === "path") {
      element = e.target.parentElement.parentElement.previousElementSibling;
    }
    if(e.target.tagName === "svg") {
      element = e.target.parentElement.previousElementSibling;
    }
    if(e.target.tagName === "BUTTON") {
      element = e.target.previousElementSibling;
    }

    if(showHideToggle) {
      element.setAttribute("type", "password");
    } else {
      element.setAttribute("type", "text");
    }
  }

  return (
    <div className="mb-5">
      {item.label}
      <div className="flex items-center justify-between gap-2">
        {item.input}
        {showHideToggle 
          ? (<button onClick={handleShowHide} type="button" className="text-2xl z-20 w-6 h-6">{item.icon1}</button>)
          : (<button onClick={handleShowHide} type="button" className="text-2xl z-20 w-6 h-6">{item.icon2}</button>)
        }
      </div>
    </div>
  )
}
