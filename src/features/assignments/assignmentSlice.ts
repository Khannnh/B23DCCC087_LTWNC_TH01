import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Assignment, CreateAssignmentDto, FilterStatus } from './types';
import { fetchMockAssignments } from './assignmentApi';

interface AssignmentState {
  items: Assignment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; // Lưu lỗi nếu fetch thất bại (chuẩn slide Buổi 3)
  filter: FilterStatus;
}

const initialState: AssignmentState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'ALL',
};

export const getAssignments = createAsyncThunk<Assignment[], void>(
  'assignments/fetchAll',
  async () => {
    const res = await fetchMockAssignments();
    return res.data;
  }
);

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    // 1. Action thêm bài tập mới từ Form
    addAssignment(state, action: PayloadAction<CreateAssignmentDto>) {
      const newAssignment: Assignment = {
        id: Date.now().toString(),
        ...action.payload,
        isCompleted: false,
      };
      state.items.unshift(newAssignment); // Đưa bài tập mới lên đầu danh sách
    },
    // 2. Action đổi bộ lọc
    setFilter(state, action: PayloadAction<FilterStatus>) {
      state.filter = action.payload;
    },
    // 3. Action đánh dấu / bỏ đánh dấu hoàn thành
    toggleComplete(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.isCompleted = !item.isCompleted;
      }
    },
    // 4. Action xoá bài tập
    deleteAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi tải dữ liệu';
      });
  },
});

export const { addAssignment, setFilter, toggleComplete, deleteAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;