/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../../Model/UserModel';
import { users } from '../../../Data/users_data';

interface UserState {
  userList: UserModel[]
  currentUser: UserModel | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userList: users,
  isAuthenticated: false,
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string; branchId: string }>) => {
      const exist = state.userList.find(student => student.userName === action.payload.username
        && student.password === action.payload.password && student.branchId === Number(action.payload.branchId))
      debugger
      if (exist) {
        state.isAuthenticated = true;
        state.currentUser = exist;
      } else {
        state.isAuthenticated = false;
      }

    },
    logout: (state) => {

    },
    addUser: (state, action) => {
      debugger
      let nUsers: UserModel[] = [...state.userList]
      nUsers.push(action.payload)
      state.userList = [...nUsers];
    },
    removeUser: (state, action) => {
      debugger
      let nUsers: UserModel[] = [...state.userList]
      state.userList = [...nUsers.filter(user => user.branchId !== action.payload)];
    },
  },
});

export const { login, logout, addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
