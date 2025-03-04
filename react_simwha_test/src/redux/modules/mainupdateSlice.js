import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const __addWriteThunk = createAsyncThunk(
  "ADD_WRITE", // action value
  async (payload, thunkAPI) => {
    // 콜백함수
    console.log("payload", payload);
    try {
      const { data } = await axios.post(`http://localhost:3001/posts`, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPostThunk = createAsyncThunk(
  "GETMAIN_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/posts`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __updatePostThunk = createAsyncThunk(
//   "UPDATE_POST",
//   async (id, thunkAPI) => {
//     try {
//       axios.patch(`http://localhost:3001/todos/${id}`, id);
//       return thunkAPI.fulfillWithValue(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

const initialState = {
  posts: [],
  error: null, // 서버랑 통신 실패 시 나타내는 에러메세지 담아놓는 값
  isLoading: false, // 서버에서 posts를 가져오는 상태값
};

export const mainupdateSlice = createSlice({
  name: "updateposts",
  initialState,
  reducers: {
    // addPost: (state, action) => {
    //   return state.posts.push(action.payload);
    // },
    clearPosts: (state) => {
      return (state.posts = {
        user_id: "",
        id: uuidv4(),
        rate: "",
        title: "",
        content: "",
        read: 0,
      });
    },
  },
  extraReducers: {
    [__addWriteThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [__addWriteThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addWriteThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    // [__updatePostThunk.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.todo = action.payload;
    // },
    // [__updatePostThunk.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__updatePostThunk.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { clearPosts } = mainupdateSlice.actions;
export default mainupdateSlice.reducer;
