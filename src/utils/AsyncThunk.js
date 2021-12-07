import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

export default class AsyncThunk {
  /**
   *
   * @param {Object} options
   * @param {String} options.sliceName
   * @param {async Function} options.apiMethod
   * @param {Function} options.dispatchError
   * @param {String} options.path
   * @param {Object} options.addToState
   * @param {Object} options.addToState.pending
   * @param {Object} options.addToState.fulfilled
   * @param {Object} options.addToState.rejected
   */
  constructor({
    sliceName,
    apiMethod,
    dispatchError,
    responsePath = "data",
    addToState = { fulfilled: {}, rejected: {}, pending: {} },
  }) {
    this.sliceName = sliceName;
    this.apiMethod = apiMethod;
    this.dispatchError = dispatchError;
    this.responsePath = responsePath;
    this.addToState = addToState;
    this.asyncThunk = this.generate();
    this.extraReducers = this.extraReducers();
  }

  generate() {
    return createAsyncThunk(
      `${this.sliceName}/${this.apiMethod.name}`,
      async (values, thunkAPI) => {
        try {
          const response = await this.apiMethod(values);
          return _.get(response, [this.responsePath]);
        } catch (error) {
          this.dispatchError(thunkAPI.dispatch, error);
          throw error;
        }
      }
    );
  }

  extraReducers() {
    return {
      [this.asyncThunk.pending]: (state) => {
        state.status = "loading";
        state.errorMessage = "";
        for (const key in this.addToState.pending) {
          state[key] = this.addToState.pending[key];
        }
      },
      [this.asyncThunk.rejected]: (state, action) => {
        state.status = "error";
        if (state.errorMessage === "") {
          state.errorMessage = action.error.message;
        }
        for (const key in this.addToState.rejected) {
          state[key] = this.addToState.rejected[key];
        }
      },
      [this.asyncThunk.fulfilled]: (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.errorMessage = "";
        for (const key in this.addToState.fulfilled) {
          state[key] = this.addToState.fulfilled[key];
        }
      },
    };
  }
}
