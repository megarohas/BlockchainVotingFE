import { get } from "../utils/fetcher.js";

export function getListItems() {
  return dispatch => {
    get("/../../public/mocks/mock_items.json").then(response => {
      //console.log("items response", response);
      dispatch({
        type: "SET_ITEMS",
        payload: response.list_items
      });
    });
  };
}

export function setActivePage(id) {
  return {
    type: "SET_ACTIVE_PAGE",
    payload: { id }
  };
}
