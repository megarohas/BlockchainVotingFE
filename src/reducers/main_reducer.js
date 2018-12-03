const default_state = {
  active_page: 0
};

export default (state = default_state, action) => {
  switch (action.type) {
    case "SET_ITEMS": {
      return {
        ...state,
        items: []
      };
    }
    case "SET_ACTIVE_PAGE": {
      return {
        ...state,
        active_page: action.payload.id
      };
    }
    case "SET_FIELD": {
      let new_state = { ...state };
      new_state[action.payload.field] = action.payload.value;
      return new_state;
    }
    default: {
      return state;
    }
  }
};
