const initialState = {
  dates: [],
  date: {},
  createdOne: {},
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATES":
      return {
        ...state,
        dates: action.payload,
      };
    case "GET_ONE_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "CREATE_DATE":
      return {
        ...state,
        createdOne: action.payload,
      };

    default:
      return state;
  }
};

export default dateReducer;
