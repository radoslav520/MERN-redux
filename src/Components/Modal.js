import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postTask } from "../actions/index";
function Modal({ show, hideModal, match }) {
  const [state, setState] = useState({
    title: "",
    hours: "",
  });

  const dateNow = new Date().toLocaleDateString();

  const dispatch = useDispatch();

  const tasksss = useSelector((state) => state.tasks.tasks);

  const thatDate = useSelector((state) => state.dates.date);

  let mm = parseInt(dateNow.substring(0, dateNow.indexOf("/")));
  let dd = parseInt(
    dateNow.substring(dateNow.indexOf("/") + 1, dateNow.lastIndexOf("/"))
  );
  let yyyy = parseInt(dateNow.substring(dateNow.lastIndexOf("/") + 1));
  const fd = `${mm}-${dd}-${yyyy}`;

  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleCreate() {
    if (state.title === "" || state.hours === "") {
      setErrorMsg("Polja ne smeju da budu prazna");
    } else {
      let sum = 0;
      for (let i = 0; i < tasksss.length; i++) {
        sum += tasksss[i].hours;
      }
      let hoursNumb = parseInt(state.hours);

      if (sum >= 24) {
        setErrorMsg("Broj sati koji je unet je veci od 24");
      } else if (hoursNumb + sum >= 25) {
        setErrorMsg(
          "Ukupan broj sati taskova + ovaj prelaze maximalan broj sati na dan"
        );
      } else {
        dispatch(postTask(thatDate._id, state.title, hoursNumb));
        setState({
          title: "",
          hours: "",
        });
        setErrorMsg("");
        hideModal();
      }
    }
  }

  const showHideClassName = show
    ? "modal-wrap js-modal is-visible"
    : "modal-wrap js-modal";
  return (
    <div className={showHideClassName}>
      <div className="modal js-modal-inner">
        <h2>Create a task:</h2>

        <div className="field-wrap">
          <label className="label">Title:</label>
          <input
            className="field"
            type="text"
            id=""
            placeholder="Enter title here..."
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div className="field-wrap">
          <label className="label">Hours:</label>
          <input
            className="field"
            type="number"
            id=""
            placeholder="Add hours here..."
            name="hours"
            value={state.hours}
            onChange={handleChange}
            min="1"
            max="24"
          />
          <div>{errorMsg}</div>
        </div>
        <div className="btn-wrap align-right">
          <button className=" close" onClick={hideModal}>
            Close
          </button>
          <button className="btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
