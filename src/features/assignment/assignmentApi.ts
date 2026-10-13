// src/features/assignments/assignmentApi.ts
import { Assignment, ApiResponse } from '../../types/assignment';

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    subject: 'Lập trình web nâng cao',
    title: 'Bài thực hành 01 - Deadline Tracker',
    dueDate: '2026-10-20',
    priority: 'HIGH',
    isCompleted: false,
  },
  {
    id: '2',
    subject: 'Phát triển ứng dụng di động đa nền tảng',
    title: 'Thiết kế giao diện thời tiết',
    dueDate: '2026-10-10', 
    priority: 'MEDIUM',
    isCompleted: false,
  },
  {
    id: '3',
    subject: 'Kiến trúc phần mềm',
    title: 'Báo cáo mẫu thiết kế microservices',
    dueDate: '2026-10-25',
    priority: 'LOW',
    isCompleted: true,
  },
];

export const fetchMockAssignments = (): Promise<ApiResponse<Assignment[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        message: 'Lấy dữ liệu thành công',
        data: INITIAL_ASSIGNMENTS,
      });
    }, 800); // Giả lập độ trễ mạng 800ms để thấy trạng thái Loading
  });
};