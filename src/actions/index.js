export function getRandomQuote(quotes) {
  let quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (dispatch) => {
    dispatch({
      type: "GET_RANDOM_QUOTE",
      payload: quote,
    });
  };
}

export function getDates() {
  return (dispatch) => {
    fetch("http://localhost:5000/dates")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "GET_DATES",
          payload: data,
        });
      });
  };
}

export function getOneDate(date) {
  return (dispatch) => {
    fetch(`http://localhost:5000/dates/${date}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "GET_ONE_DATE",
          payload: data,
        });
      });
  };
}

// export function getOneTask(id) {
//   return (dispatch) => {
//     fetch(`http://localhost:5000/dates/${date}`)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({
//           type: "GET_ONE_DATE",
//           payload: data,
//         });
//       });
//   };
// }

export function postDate(formatDate) {
  const data = { dateString: formatDate };
  return (dispatch) => {
    fetch("http://localhost:5000/dates", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "CREATE_DATE",
          payload: data,
        });
      });
  };
}

export function getTasks(dateFormat) {
  return (dispatch) => {
    fetch(`http://localhost:5000/dates/${dateFormat}`)
      .then((response) => response.json())
      .then((data) => {
        fetch(`http://localhost:5000/tasks/${data._id}`).then((response) =>
          response.json().then((data) => {
            dispatch({
              type: "GET_TASKS",
              payload: data,
            });
          })
        );
      });
  };
}

export function postTask(dateID, title, hours) {
  const data = { title: title, hours: hours };
  return (dispatch) => {
    fetch(`http://localhost:5000/tasks/${dateID}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "CREATE_TASK",
          payload: data,
        });
      });
  };
}

export function deleteTask(id) {
  return (dispatch) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "DELETE_TASK",
          payload: id,
        });
      });
  };
}

export function editTask(id, title, hours) {
  const data = { title: title, hours: hours };
  return (dispatch) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "EDIT_TASK",
          payload: data,
        });
      });
  };
}
