import React, { useState } from "react";
import axios from 'axios';

const Task = (props) => {

  var pd;
  var val;
  if(props.isdone === true) {
    val = <del>{props.task}</del>;
    pd = "Redo";
  }
  else {
    val = props.task;
    pd = "Done";
  }

  const [done, setDone] = useState(pd);
  const [cut, setCut] = useState(val);
  

  function striker() {
    var isdone =  document.querySelector(`#button${props.id}`).innerText;
    if(isdone === 'Done') {
      axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': props.task, 'is_done': "True",}, {headers: {'content-type': 'application/json'}});
        setCut(<del>{props.task}</del>);
        setDone("Redo");
    }
    else {
      axios.put('https://djangoapitodo.herokuapp.com/tasks/api/', {'id': props.id, 'task': props.task, 'is_done': "False",}, {headers: {'content-type': 'application/json'}});
        setCut(props.task);
        setDone("Done"); 
    }
  }

  function deletetask() {
    var id =  document.querySelector(`.tbox${props.id}`);
    axios.delete(`https://djangoapitodo.herokuapp.com/tasks/api/${props.id}/`, {'id': props.id,}, {headers: {'content-type': 'application/json'}});
    id.remove();
  }

  return (
      <div className= {"p-2 text-center tbox" + props.id}>
        <div style={{"display": "inline-block", "wordWrap": "break-word"}} className="w-50">
            <p className="d-inline">{cut}</p>
        </div>
        <div style={{"display": "inline-block"}} className="w-50">
          <button onClick={striker} id={"button" + props.id} className="btn btn-primary btn-sm">{done}</button>
          <button onClick={deletetask} id={"buttond" + props.id} className="ml-3 btn btn-danger btn-sm">Delete</button>
        </div>
          <hr/>
      </div>
  );
};

export default Task;
