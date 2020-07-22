import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "../actions/index";

import ModalEdit from "./ModalEdit";

import deleteIcon from "../Assets/icons/delete-24px.svg";
import editIcon from "../Assets/icons/edit-24px.svg";

function Main({ match }) {
  console.log("main");
  const dispatch = useDispatch();
  const dateNow = new Date().toLocaleDateString();

  let mm = parseInt(dateNow.substring(0, dateNow.indexOf("/")));
  let dd = parseInt(
    dateNow.substring(dateNow.indexOf("/") + 1, dateNow.lastIndexOf("/"))
  );
  let yyyy = parseInt(dateNow.substring(dateNow.lastIndexOf("/") + 1));
  const fd = `${mm}-${dd}-${yyyy}`;

  const [show, setShow] = useState(false);
  const [task, setTask] = useState({});

  useEffect(() => {
    if (match.params.date) {
      const date1 = new Date(match.params.date).toLocaleDateString();
      let mm = parseInt(date1.substring(0, date1.indexOf("/")));
      let dd = parseInt(
        date1.substring(date1.indexOf("/") + 1, date1.lastIndexOf("/"))
      );
      let yyyy = parseInt(date1.substring(date1.lastIndexOf("/") + 1));
      const formatedDate = `${mm}-${dd}-${yyyy}`;

      dispatch(getTasks(formatedDate));
    } else {
      dispatch(getTasks(fd));
    }
  }, []);

  const showModal = (task) => {
    setTask(task);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const tasksss = useSelector((state) => state.tasks.tasks);

  let sum = 0;
  for (let i = 0; i < tasksss.length; i++) {
    sum += tasksss[i].hours;
  }

  const taskList = tasksss.map((task, index) => (
    <div key={index} className="item-row">
      <div className="check-flag">
        <span className="small-text-label">Title</span>
        <span className="small-text-label hours">Hours</span>
        <span className="check-flag-label">{task.title}</span>
        <div className="editDelete">
          <span className="hours-box">{task.hours}</span>
          <button
            style={{ marginRight: 20 }}
            onClick={() => dispatch(deleteTask(task._id))}
          >
            <img src={deleteIcon} alt="add new item" />
          </button>
          <button onClick={() => showModal(task)} style={{ marginRight: 20 }}>
            <img src={editIcon} alt="add new item" />
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="main">
      <div className="wrap" readOnly>
        {taskList}
        <div className="total align-right">
          <label className="total-label">Total:</label>
          <input className="total-input" type="text" value={sum} readOnly />
        </div>
      </div>
      <ModalEdit show={show} hideModal={hideModal} task={task} />
    </div>
  );
}

export default Main;
