import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Assignment, FilterStatus } from './types';
import { fetchMockAssignments } from './assignmentApi';

interface AssignmentState {
  items: Assignment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // 3 trạng thái cốt lõi 
  //idle là trạng thái tĩnh khi chưa mở dữ liệu , phân biệt với loading là mở dữ liệu nhưng chưa xong 
  filter: FilterStatus;
}

const initialState: AssignmentState = {
  items: [],
  status: 'idle',
  filter: 'ALL',
};

// Async thunk gọi hàm múa ở Bước 1
export const getAssignments = createAsyncThunk<Assignment[], void>(
  'assignments/fetchAll',
  async () => {
    const res = await fetchMockAssignments();
    return res.data; // Bắn dữ liệu về cho fulfilled hứng
  }
);

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    // Action đổi bộ lọc
    setFilter(state, action: PayloadAction<FilterStatus>) {
      state.filter = action.payload;
    },
    // Action đánh dấu / bỏ đánh dấu
    toggleComplete(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.isCompleted = !item.isCompleted;
    },
    // Action xoá bài tập
    deleteAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Lúc đang chờ 800ms: status nhảy sang loading
      .addCase(getAssignments.pending, (state) => {
        state.status = 'loading';
      })
      // 2. Chờ xong 800ms: status nhảy sang succeeded và nạp dữ liệu
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // 3. Nếu lỡ có lỗi gì đó xảy ra
      .addCase(getAssignments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilter, toggleComplete, deleteAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;