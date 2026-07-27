import { configureStore } from '@reduxjs/toolkit'
import { shoppingcard } from './createslice'
export const makeStore = configureStore({
  reducer: {
    cart:shoppingcard.reducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof makeStore.dispatch
export type AppStore = typeof makeStore
