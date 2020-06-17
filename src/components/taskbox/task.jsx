import React, { useState } from "react";
import axios from 'axios';

const Task = (props) => {

  var pd;
  var val;
  var sty;
  if(props.isdone === true) {
    val = props.task;
    pd = "Redo";
    sty = {
      "textDecoration": "line-through"
    }
  }
  else {
    val = props.task;
    pd = "Done";
    sty = {
      "textDecoration": "none"
    }
  }

  const [done, setDone] = useState(pd);
  const [cut, setCut] = useState(val);

  const [styler, setstyler] = useState(sty);
  

  function striker() {
    var isdone =  document.querySelector(`#button${props.id}`);
    isdone.style.backgroundColor = "gainsboro";

    if(isdone.innerText === 'Done') {
      axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': props.task, 'is_done': "True",}, {headers: {'content-type': 'application/json'}})
        setDone("Redo");
        setstyler({
          "textDecoration": "line-through"
        })
    }
    else {
      isdone.style.backgroundColor = "transparent";
      axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': props.task, 'is_done': "False",}, {headers: {'content-type': 'application/json'}});
        setDone("Done");
        setstyler({
          "textDecoration": "none"
        }) 
    }
  }

  function deletetask() {
    var id =  document.querySelector(`.tbox${props.id}`);
    axios.delete(`https://djangoapitodo.herokuapp.com/tasks/api/${props.id}/`, {'id': props.id,}, {headers: {'content-type': 'application/json'}});
    id.remove();
  }

  function updateNote(event) {
    setCut(event.target.value);
  }

  function focusouthandler() {
    var ele = document.getElementById('taskbox' + props.id);
    axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': ele.value, 'is_done': props.isdone,}, {headers: {'content-type': 'application/json'}});
  }

  return (
      <div className={"task-container tbox" + props.id}>
        <div className="task-input-container">
            <input className="task-input" value={cut} id={'taskbox' + props.id} onChange={updateNote} style={styler} onBlur={focusouthandler} />
        </div>
        <div className="task-buttons">
            <div onClick={striker} id={"button" + props.id} className="task-button-checkbox">{done}</div>
            <button onClick={deletetask} id={"buttond" + props.id} className="task-button"><span role="img" aria-label="delete-button">❌</span></button>
        </div>
      </div>
  );
};

export default Task;
