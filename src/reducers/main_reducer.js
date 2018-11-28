const default_state = {
  items: []
};

export default (state = default_state, action) => {
  switch (action.type) {
    case "SET_ITEMS": {
      return {
        ...state,
        items: []
      };
    }

    default: {
      return state;
    }
  }
};
