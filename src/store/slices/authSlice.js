import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_LOGIN } from "../../constants/endpoints";
import { apiRequest } from "../../lib/apiRequest";

export const fetchMe = createAsyncThunk("auth/me", async () => {
  const res = await axios.get("/api/me");
  return res.data;
});


export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiRequest({
        url: AUTH_LOGIN,
        method: "POST",
        data: payload
      });
      return res.statusCode === 200 ? res.data : rejectWithValue(res);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    status: "idle",
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login successful:", action.payload);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
