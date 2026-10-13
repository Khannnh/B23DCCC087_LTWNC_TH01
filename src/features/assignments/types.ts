// 1. Độ ưu tiên & Trạng thái lọc
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type FilterStatus = 'ALL' | 'PENDING' | 'OVERDUE' | 'COMPLETED';

// 2. Thực thể bài tập (Entity chính)
export interface Assignment {
  id: string;
  subject: string;      // Môn học (vd: "Lập trình web nâng cao")
  title: string;        // Tên bài tập (vd: "Bài thực hành 01")
  dueDate: string;      // Chuẩn YYYY-MM-DD (khớp thẻ input type="date")
  priority: Priority;   // Mức độ ưu tiên
  isCompleted: boolean; // Trạng thái hoàn thành
}

// 3. Utility Types 
export type CreateAssignmentDto = Omit<Assignment, 'id' | 'isCompleted'>;

// 4. Custom Type Guard chuẩn TypeScript 
export type OverdueAssignment = Assignment & { isCompleted: false };

export function isOverdueAssignment(item: Assignment): item is OverdueAssignment {
  // type guard : trả về kiểu 'x is T'
  if (item.isCompleted) return false;
  const now = new Date();
  const deadline = new Date(item.dueDate);
  return deadline.getTime() < now.getTime();
}