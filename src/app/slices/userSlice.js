import { createSlice } from '@reduxjs/toolkit';
import AsyncThunk from 'utils/AsyncThunk';
import {
  loginUser,
  registerUser,
  changePass,
  linkDiscord,
} from 'api/userAPI';

const initialState = {
  data: {
    nickname: null,
    accessToken: null,

    email: null,
    confirmedEmail: null,
    discord: null,
  },
  errorMessage: '',
  status: 'idle',
};

const dispatchUserError = (dispatch, error) => {
  dispatch(actionCreators.setErrorMessage(error.response.data.error.message));
};

// TODO check not needed
// const getUserAsyncObj = new AsyncThunk('user', getUser, dispatchUserError);
// export const getUserAsync = getUserAsyncObj.asyncThunk;

const registerUserAsyncObj = new AsyncThunk(
  'user',
  registerUser,
  dispatchUserError
);
export const registerUserAsync = registerUserAsyncObj.asyncThunk;

const loginUserAsyncObj = new AsyncThunk('user', loginUser, dispatchUserError);
export const loginUserAsync = loginUserAsyncObj.asyncThunk;

const changePassAsyncObj = new AsyncThunk(
  'user',
  changePass,
  dispatchUserError
);
export const changePassAsync = changePassAsyncObj.asyncThunk;

const linkDiscordAsyncObj = new AsyncThunk(
  'user',
  linkDiscord,
  dispatchUserError
);
export const linkDiscordAsync = linkDiscordAsyncObj.asyncThunk;

export const userSlice = createSlice({
  name: 'user',
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

    ...changePassAsyncObj.extraReducers,

    ...linkDiscordAsyncObj.extraReducers,
  },
});

export const actionCreators = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = state => state.user;

export const selectUserData = state => state.user.data;

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
