import { createAsyncThunk } from '@reduxjs/toolkit';

export default class AsyncThunk {
  /**
   *
   * @param {string} sliceName
   * @param {async function} apiMethod
   * @param {function} dispatchError
   */
  constructor (sliceName, apiMethod, dispatchError) {
    this.sliceName = sliceName;
    this.apiMethod = apiMethod;
    this.dispatchError = dispatchError;
    this.asyncThunk = this.generate();
    this.extraReducers = this.extraReducers();
  }

  generate () {
    return createAsyncThunk(
      `${this.sliceName}/${this.apiMethod.name}`,
      async (values, thunkAPI) => {
        try {
          const response = await this.apiMethod(values);
          return response.data.data;
        } catch (error) {
          this.dispatchError(thunkAPI.dispatch, error);
          throw error;
        }
      }
    );
  }

  extraReducers () {
    return {
      [this.asyncThunk.pending]: state => {
        state.status = 'loading';
        state.errorMessage = '';
      },
      [this.asyncThunk.rejected]: (state, action) => {
        state.status = 'error';
        if (state.errorMessage === '') {
          state.errorMessage = action.error.message;
        }
      },
      [this.asyncThunk.fulfilled]: (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        state.errorMessage = '';
      },
    };
  }
}
