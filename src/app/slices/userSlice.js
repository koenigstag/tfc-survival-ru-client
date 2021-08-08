import { createSlice } from '@reduxjs/toolkit';
import AsyncThunk from '@/utils/AsyncThunk';
import { getUser, loginUser, registerUser } from '@/api/userAPI';

const initialState = {
  data: {
    nickname: null,
    accessToken: null,

    email: null,
    discord: null,
  },
  errorMessage: '',
  status: 'idle',
};

const dispatchUserError = (dispatch, error) => {
  dispatch(actionCreators.setErrorMessage(error.response.data.error.message));
};

export const getUserAsync = new AsyncThunk(
  'user',
  getUser,
  dispatchUserError
).generate();

export const registerUserAsync = new AsyncThunk(
  'user',
  registerUser,
  dispatchUserError
).generate();

export const loginUserAsync = new AsyncThunk(
  'user',
  loginUser,
  dispatchUserError
).generate();

export const counterSlice = createSlice({
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
  extraReducers: builder => {
    builder
      .addCase(getUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })

      .addCase(registerUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })

      .addCase(loginUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const actionCreators = counterSlice.actions;

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

export default counterSlice.reducer;
