//nhận assignmentSlice vào configureStore rồi xuất AppDispatch và RootState ra ngoài để các component khác dùng
import { configureStore } from '@reduxjs/toolkit';
import assignmentReducer from '../features/assignments/assignmentSlice';

export const store = configureStore({
  reducer: {
    assignments: assignmentReducer,
  },
});

// Suy luận tự động RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;