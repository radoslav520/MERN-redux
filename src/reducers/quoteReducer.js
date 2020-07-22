import data from "../Data/quotes.json";

const initialState = {
  data: data,
  randomQuote: {},
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RANDOM_QUOTE":
      return {
        ...state,
        randomQuote: action.payload,
      };
    default:
      return state;
  }
};

export default quoteReducer;
