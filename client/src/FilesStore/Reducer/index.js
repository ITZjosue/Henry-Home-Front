import { ALL_HOTELS, DETAIL, GOOGLE_LOGIN, GOOGLE_LOGOUT, CREATE_HOUSE, ADMIN_STATUS, SIGNIN, SIGNUP } from "../Const Types/constActions"

const initialState = {
  hotels: [],
  allHotels: [],
  detail: [],
  authData: null,
  count:null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_HOTELS:
      return {
        ...state,
        hotels: action.payload.rows,
        allHotels: action.payload.rows,
        count:action.payload.count
      };

    case DETAIL:
      return {
        ...state,
        detail: action.payload
      };

    case GOOGLE_LOGIN:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return {
        ...state,
        authData: action?.payload
      };

    case GOOGLE_LOGOUT:
      localStorage.clear()
      return {
        ...state,
        authData: null
      };
    case CREATE_HOUSE:
      return {
        ...state,
      }
    case ADMIN_STATUS:
      return {
        ...state
      }
    case SIGNIN:
      return {
        ...state
      }
    case SIGNUP:
      return {
        ...state
      }
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
