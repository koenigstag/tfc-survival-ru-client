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
}
