const initialState = {
  tasks: [],
  task: {},
  createdTask: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "GET_ONE_TASK":
      return {
        ...state,
        task: action.payload,
      };
    case "CREATE_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id != action.payload),
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    default:
      return state;
  }
};

export default taskReducer;
