# BÀI THỰC HÀNH 01: STUDENT DEADLINE TRACKER

* **Môn học:** Lập trình web nâng cao (LTWNC)
* **Sinh viên:** Nguyễn Hồng Khánh
* **Mã sinh viên:** B23DCCC087
* **Công nghệ sử dụng:** React (Vite), TypeScript, Redux Toolkit, CSS-in-JS

---

## 1. Giới thiệu dự án

**Student Deadline Tracker** là ứng dụng quản lý bài tập và theo dõi hạn nộp học tập cá nhân dưới dạng Single Page Application (SPA). Dự án vận dụng tổng hợp kiến thức từ 3 buổi học đầu tiên của môn học:
1. **Buổi 1:** TypeScript nâng cao (Generics, Utility Types, Custom Type Guards).
2. **Buổi 2:** React Design Patterns (Custom Hook, Compound Component Pattern).
3. **Buổi 3:** Quản lý trạng thái toàn cục với Redux Toolkit (Feature-based structure, Typed Hooks, Async Thunks).

---

## 2. Bảng đối chiếu yêu cầu & chức năng

### Các chức năng nghiệp vụ (7/7)
- [x] **Hiển thị danh sách bài tập:** Đầy đủ các trường: môn học, tên bài tập, hạn nộp, độ ưu tiên (`LOW`, `MEDIUM`, `HIGH`) và trạng thái hoàn thành.
- [x] **Thêm bài tập mới qua Form:** Modal Dialog cho phép nhập tên môn, tên bài, hạn nộp (input date) và chọn độ ưu tiên.
- [x] **Đánh dấu / Bỏ đánh dấu hoàn thành:** Cập nhật trạng thái tức thì thông qua Redux action `toggleComplete`.
- [x] **Xoá bài tập:** Cho phép loại bỏ bài tập khỏi danh sách thông qua Redux action `deleteAssignment`.
- [x] **Lọc theo 4 trạng thái:** Tất cả (`ALL`), Chưa hoàn thành (`PENDING`), Quá hạn (`OVERDUE`), Đã hoàn thành (`COMPLETED`).
- [x] **Tính toán hạn nộp:** Tự động tính chênh lệch ngày và hiển thị trực quan: `"Còn X ngày"`, `"Hạn chót là hôm nay"`, hoặc `"Quá hạn Y ngày"`.
- [x] **API giả lập khi khởi động:** Sử dụng `createAsyncThunk` kết hợp `Promise` có độ trễ (delay) để mô phỏng tải dữ liệu ban đầu kèm trạng thái `loading`, `succeeded`, `failed`.

---

## 3. Chi tiết vận dụng kỹ thuật môn học

### Buổi 1 — TypeScript nâng cao
* **Generic Wrapper:** Interface `ApiResponse<T>` chuẩn hóa cấu trúc phản hồi từ API giả lập.
* **Utility Types:** Sử dụng `Omit<Assignment, 'id' | 'isCompleted'>` để tạo kiểu `CreateAssignmentDto`, loại bỏ các trường tự sinh khi người dùng nhập form.
* **Custom Type Guard:** Hàm `isOverdueAssignment(item: Assignment): item is OverdueAssignment` sử dụng từ khóa `is` để thu hẹp kiểu dữ liệu (Type Narrowing) khi lọc các bài tập quá hạn.

### Buổi 2 — React Design Patterns
* **Custom Hook:** Hook `useDeadline(dueDate: string)` đóng gói toàn bộ logic tính toán chênh lệch thời gian, cờ `isOverdue` và chuỗi văn bản thông báo.
* **Compound Component Pattern:** Component `AssignmentCard` kết hợp React Context nội bộ để chia sẻ dữ liệu cho các sub-components mà không cần truyền props lòng vòng:
  * `<AssignmentCard>` (Context Provider)
  * `<AssignmentCard.Header />` (Tên môn học + Badge độ ưu tiên)
  * `<AssignmentCard.Body />` (Tên bài tập + Thời gian đếm ngược)
  * `<AssignmentCard.Footer />` (Checkbox hoàn thành + Nút Xóa)

### Buổi 3 — Redux Toolkit & Feature-based Colocation
* **Feature-based Directory:** Toàn bộ component, hook, slice, api và type liên quan đến bài tập được gom gọn trong thư mục `src/features/assignments/`.
* **Typed Hooks:** Xuất `useAppDispatch` và `useAppSelector` từ `src/app/hooks.ts` giúp bảo toàn kiểu dữ liệu tự động cho toàn bộ ứng dụng.
* **Async Logic:** `createAsyncThunk` (`getAssignments`) quản lý vòng đời bất đồng bộ thông qua `extraReducers` với 3 trạng thái: `pending`, `fulfilled`, và `rejected`.

---

## 4. Cấu trúc thư mục

```text
├── index.html
├── package.json
├── tsconfig.json
├── App.tsx
├── main.tsx
└── src/
    ├── app/
    │   ├── store.ts            # Cấu hình Redux Store toàn cục
    │   └── hooks.ts            # Typed useAppDispatch và useAppSelector
    ├── features/
    │   └── assignments/
    │       ├── types.ts        # Interfaces, DTO, Type Guard
    │       ├── assignmentApi.ts# Mock API service với Promise trễ
    │       ├── assignmentSlice.ts # Redux Slice & Async Thunk
    │       ├── hooks/
    │       │   └── useDeadline.ts  # Custom hook tính hạn nộp
    │       └── components/
    │           ├── assignmentCard.tsx   # Compound Component
    │           ├── assignmentFilter.tsx # Bộ lọc trạng thái
    │           └── assignmentForm.tsx   # Modal Form thêm bài tập
    └── types/
        └── api.ts              # Generic ApiResponse<T> dùng chung
