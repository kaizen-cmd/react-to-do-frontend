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
    var isdone =  document.querySelector(`#button${props.id}`).innerText;
    if(isdone === 'Done') {
      axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': props.task, 'is_done': "True",}, {headers: {'content-type': 'application/json'}})
        setDone("Redo");
        setstyler({
          "textDecoration": "line-through"
        })
    }
    else {
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

  function focushandler() {
    var ele = document.getElementById('taskbox' + props.id);
    ele.style.backgroundColor = "white";
    ele.style.boxShadow = "1px 1px 3px grey"
    ele.style.padding = "5px";
  }

  function focusouthandler() {
    var ele = document.getElementById('taskbox' + props.id);
    ele.style.backgroundColor = "#ffcd3c";
    ele.style.boxShadow = "none"
    ele.style.padding = "none";
    axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': ele.value, 'is_done': props.isdone,}, {headers: {'content-type': 'application/json'}});
  }

  return (
      <div className= {"text-center tbox" + props.id}>
        <div style={{"display": "inline-block", "wordWrap": "break-word"}} className="widthr">
            <input className="d-inline taskbox-task" value={cut} id={'taskbox' + props.id} onChange={updateNote} style={styler} onFocus={focushandler} onBlur={focusouthandler} />
        </div>
        <div style={{"display": "inline-block"}} className="widther">
          <button onClick={striker} id={"button" + props.id} className="btn btn-primary btn-sm">{done}</button>
          <button onClick={deletetask} id={"buttond" + props.id} className="ml-3 btn btn-danger btn-sm">Delete</button>
        </div>
          <hr/>
      </div>
  );
};

export default Task;
