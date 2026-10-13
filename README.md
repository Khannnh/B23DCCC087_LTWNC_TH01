BÀI THỰC HÀNH 01: STUDENT DEADLINE TRACKER

Môn học: Lập trình web nâng cao (LTWNC)

Mã sinh viên: B23DCCC087

Công nghệ chính: React, TypeScript, Redux Toolkit, Vite

1. Giới thiệu ứng dụng

Student Deadline Tracker là ứng dụng Single Page Application (SPA) hỗ trợ sinh viên quản lý và theo dõi hạn nộp bài tập cá nhân. Ứng dụng tổng hợp kiến thức từ 3 buổi học đầu tiên của môn Lập trình web nâng cao:

Buổi 1: TypeScript nâng cao (Generics, Utility Types, Custom Type Guard).

Buổi 2: Design Pattern React (Custom Hook, Compound Component Pattern).

Buổi 3: Redux Toolkit với TypeScript (Feature-based structure, Typed Hooks, Async Thunk).

2. Danh sách chức năng nghiệp vụ

Ứng dụng đáp ứng đầy đủ 7 yêu cầu chức năng nghiệp vụ theo đề bài:

Hiển thị danh sách bài tập: Hiển thị chi tiết môn học, tên bài tập, hạn nộp, mức độ ưu tiên (Cao, Trung bình, Thấp) và trạng thái hoàn thành.

Thêm bài tập mới qua form modal: Cho phép nhập môn học, tên bài, hạn nộp (YYYY-MM-DD) và chọn độ ưu tiên. Form được thiết kế dạng popup modal tiện lợi.

Đánh dấu / bỏ đánh dấu hoàn thành: Tích chọn checkbox để cập nhật trạng thái đã xong/chưa xong, tự động gạch ngang tiêu đề bài tập.

Xóa bài tập: Nút xóa loại bỏ bài tập khỏi danh sách ngay lập tức.

Bộ lọc trạng thái: Lọc theo 4 tiêu chí: Tất cả, Chưa hoàn thành, Quá hạn, Đã hoàn thành.

Tính toán thời hạn: Tự động tính toán và hiển thị thông báo trực quan: "Còn X ngày", "Quá hạn Y ngày", hoặc "Hạn chót là hôm nay".

Khởi tạo dữ liệu từ Mock API: Khi mở ứng dụng, createAsyncThunk tự động gọi hàm giả lập API với độ trễ mạng để nạp dữ liệu mẫu ban đầu.

3. Kiến thức kỹ thuật đã vận dụng

Buổi 1 — TypeScript nâng cao

Generic Type: ApiResponse<T> chuẩn hóa cấu trúc dữ liệu trả về từ API (src/features/assignments/types.ts và src/types/api.ts).

Utility Types: Sử dụng Omit<Assignment, 'id' | 'isCompleted'> để tạo type CreateAssignmentDto phục vụ cho form thêm mới.

Custom Type Guard: Hàm isOverdueAssignment(item: Assignment): item is OverdueAssignment kiểm tra và thu hẹp kiểu cho các bài tập quá hạn.

Buổi 2 — React Design Pattern

Custom Hook nâng cao (useDeadline): Nhận vào chuỗi ngày, sử dụng useMemo để tính số ngày chênh lệch, cờ quá hạn isOverdue và chuỗi văn bản cảnh báo.

Compound Component Pattern (AssignmentCard): Đóng gói thẻ bài tập thành một tập hợp component có khả năng tự chia sẻ dữ liệu qua React Context nội bộ:

<AssignmentCard>: Component cha bọc Provider.

<AssignmentCard.Header>: Hiển thị tên môn học và nhãn ưu tiên.

<AssignmentCard.Body>: Hiển thị tiêu đề bài tập và thời hạn từ useDeadline.

<AssignmentCard.Footer>: Checkbox hoàn thành và nút xóa.

Buổi 3 — Redux Toolkit với TypeScript

Cấu trúc Feature-based: Toàn bộ thành phần của tính năng bài tập được gom gọn trong src/features/assignments/ (types, slice, api, components, hooks).

Typed Hooks: Xuất và sử dụng useAppDispatch cùng useAppSelector đã gán sẵn kiểu RootState và AppDispatch (src/app/hooks.ts).

createAsyncThunk: Thunk getAssignments xử lý 3 trạng thái trong vòng đời gọi dữ liệu (pending, fulfilled, rejected), cập nhật state tương ứng với loading, succeeded, failed.

4. Cấu trúc thư mục

├── index.html
├── package.json
├── tsconfig.json
├── App.tsx                     # Component chính ráp nối toàn bộ ứng dụng
├── main.tsx                    # Entry point bọc Redux Provider
└── src/
    ├── app/
    │   ├── store.ts            # Cấu hình Redux store
    │   └── hooks.ts            # Typed hooks (useAppDispatch, useAppSelector)
    ├── features/
    │   └── assignments/
    │       ├── types.ts        # Interface, Type Guard, Utility Types
    │       ├── assignmentApi.ts# Mock API Promise
    │       ├── assignmentSlice.ts # Slice quản lý state, reducers, async thunk
    │       ├── components/
    │       │   ├── assignmentCard.tsx   # Compound Component hiển thị thẻ
    │       │   ├── assignmentFilter.tsx # Thanh nút lọc trạng thái
    │       │   └── assignmentForm.tsx   # Form modal thêm bài tập
    │       └── hooks/
    │           └── useDeadline.ts       # Custom hook tính deadline
    └── types/
        └── api.ts              # Generic type ApiResponse<T>


5. Hướng dẫn cài đặt và chạy ứng dụng

Cài đặt các gói phụ thuộc:

npm install


Chạy ứng dụng ở chế độ phát triển (Development):

npm run dev


Mở trình duyệt: Truy cập vào đường dẫn local (mặc định: http://localhost:5173/).
