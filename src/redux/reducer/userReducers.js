import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_ALLPOSTS_SUCCESS,
  FETCH_USERINFO_LOADING_START,
  FETCH_USERINFO_LOADING_END,
  FETCH_ALL_COUNTRY_SUCCESS,
  FETCH_COUNTRY_TIMEZONE_SUCCESS,
  FETCH_USER_INF,
} from "../actions/userActions";

const initialState = {
  users: [],
  singleUserData: {},
  allPosts: [],
  allCountry: [],
  countryTimeZone: {},
  isInfoLoad: false,
  userInfoLoad: false,
  userInfo: [],
};

const userReducer = (state = initialState, action) => {
  console.log("test", action.payload);
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        singleUserData: action.payload,
      };

    case FETCH_ALLPOSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case FETCH_ALL_COUNTRY_SUCCESS:
      return {
        ...state,
        allCountry: action.payload,
      };
    case FETCH_COUNTRY_TIMEZONE_SUCCESS:
      return {
        ...state,
        countryTimeZone: action.payload,
      };

    case FETCH_USERINFO_LOADING_START:
      return {
        ...state,
        isInfoLoad: true,
      };
    case FETCH_USERINFO_LOADING_END:
      return {
        ...state,
        isInfoLoad: false,
      };
    case "USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
