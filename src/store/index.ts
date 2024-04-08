import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./todoListSlice";

export const store = configureStore({
    reducer:{
        todoList: todoListSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch