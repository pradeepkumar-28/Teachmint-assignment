import axios from "axios";

export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_ALLPOSTS_SUCCESS = "FETCH_ALLPOSTS_SUCCESS";
export const FETCH_USERINFO_LOADING_START = "FETCH_USERINFO_LOADING_START";
export const FETCH_USERINFO_LOADING_END = "FETCH_USERINFO_LOADING_END";
export const FETCH_ALL_COUNTRY_SUCCESS = "FETCH_ALL_COUNTRY_SUCCESS";
export const FETCH_COUNTRY_TIMEZONE_SUCCESS = "FETCH_COUNTRY_TIMEZONE_SUCCESS";

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchAllPostsSuccess = (posts) => ({
  type: FETCH_ALLPOSTS_SUCCESS,
  payload: posts,
});

export const fetchAllCountrySuccess = (posts) => ({
  type: FETCH_ALL_COUNTRY_SUCCESS,
  payload: posts,
});

export const fetchCountryTimeZoneSuccess = (posts) => ({
  type: FETCH_COUNTRY_TIMEZONE_SUCCESS,
  payload: posts,
});

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERINFO_LOADING_START });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    dispatch({ type: FETCH_USERINFO_LOADING_END });
  }
};

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    dispatch(fetchAllPostsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchAllCountry = () => async (dispatch) => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/timezone");
    dispatch(fetchAllCountrySuccess(response.data));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchCountryTimeZoneCountry = (country) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://worldtimeapi.org/api/timezone/${country}`
    );
    dispatch(fetchCountryTimeZoneSuccess(response.data));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
