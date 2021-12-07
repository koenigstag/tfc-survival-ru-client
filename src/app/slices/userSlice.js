import { createSlice } from "@reduxjs/toolkit";
import AsyncThunk from "utils/AsyncThunk";
import { changePass, linkDiscord } from "api/userAPI";
import { loginUser, registerUser, refreshUser, removeTokens } from "api/authAPI";

const initialState = {
  data: null,
  errorMessage: "",
  status: "idle",
  isAuth: false,
};

const dispatchUserError = (dispatch, error) => {
  dispatch(actionCreators.setErrorMessage(error.response.data.error.message));
};

// TODO check not needed
// const getUserAsyncObj = new AsyncThunk('user', getUser, dispatchUserError);
// export const getUserAsync = getUserAsyncObj.asyncThunk;

const registerUserAsyncObj = new AsyncThunk({
  sliceName: "user",
  apiMethod: registerUser,
  dispatchError: dispatchUserError,
  responsePath: "user",
  addToState: { fulfilled: { isAuth: true } },
});
export const registerUserAsync = registerUserAsyncObj.asyncThunk;

const loginUserAsyncObj = new AsyncThunk({
  sliceName: "user",
  apiMethod: loginUser,
  dispatchError: dispatchUserError,
  responsePath: "user",
  addToState: { fulfilled: { isAuth: true } },
});
export const loginUserAsync = loginUserAsyncObj.asyncThunk;

const refreshUserAsyncObj = new AsyncThunk({
  sliceName: "user",
  apiMethod: refreshUser,
  dispatchError: dispatchUserError,
  responsePath: "user",
  addToState: { fulfilled: { isAuth: true } },
});
export const refreshUserAsync = refreshUserAsyncObj.asyncThunk;

const changePassAsyncObj = new AsyncThunk({
  sliceName: "user",
  apiMethod: changePass,
  dispatchError: dispatchUserError,
  responsePath: 'data',
  addToState: { rejected: { isAuth: false }, fulfilled: { isAuth: true } },
});
export const changePassAsync = changePassAsyncObj.asyncThunk;

const linkDiscordAsyncObj = new AsyncThunk({
  sliceName: "user",
  apiMethod: linkDiscord,
  dispatchError: dispatchUserError
});
export const linkDiscordAsync = linkDiscordAsyncObj.asyncThunk;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUserData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    logout: (state, action) => {
      state.data = initialState.data;
      state.isAuth = false;
      removeTokens();
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {
    // ...getUserAsyncObj.extraReducers,

    ...registerUserAsyncObj.extraReducers,

    ...loginUserAsyncObj.extraReducers,

    ...refreshUserAsyncObj.extraReducers,

    ...changePassAsyncObj.extraReducers,

    ...linkDiscordAsyncObj.extraReducers,
  },
});

export const actionCreators = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export const selectUserData = (state) => state.user.data;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const registerUserAsync1 = values => async (dispatch, getState) => {
//   try {
//     const response = await registerUser(values);

//     dispatch(actionCreators.setUserData(response));
//   } catch (error) {
//     dispatch(actionCreators.setErrorMessage(error.response.data.error.message));
//   }
// };

export default userSlice.reducer;
