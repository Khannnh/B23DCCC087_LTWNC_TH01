// src/types/assignment.ts

// 1. Độ ưu tiên & Trạng thái lọc
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type FilterStatus = 'ALL' | 'PENDING' | 'OVERDUE' | 'COMPLETED';

// 2. Thực thể bài tập (Entity chính)
export interface Assignment {
  id: string;
  subject: string;      // Môn học (vd: "Lập trình web nâng cao")
  title: string;        // Tên bài tập (vd: "Bài thực hành 01")
  dueDate: string;      // Hạn nộp dạng chuẩn ISO hoặc YYYY-MM-DD
  priority: Priority;   // Mức độ ưu tiên
  isCompleted: boolean; // Trạng thái hoàn thành
}

// 3. Utility Types (Vận dụng Buổi 1)
// Khi thêm bài tập mới qua form, ta không cần 'id' và 'isCompleted' ban đầu
export type CreateAssignmentDto = Omit<Assignment, 'id' | 'isCompleted'>;

// 4. Generic wrapper cho API Response (Chuẩn bài học Buổi 1)
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// 5. Custom Type Guard (Buổi 1)
export function isOverdueAssignment(item: Assignment): boolean {
  if (item.isCompleted) return false;
  const now = new Date();
  const deadline = new Date(item.dueDate);
  return deadline.getTime() < now.getTime();
}