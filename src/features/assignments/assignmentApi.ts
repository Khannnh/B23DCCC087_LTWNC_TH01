import { Assignment } from './types';
import { ApiResponse } from '../../types/api';

// 1. Mảng dữ liệu mẫu ban đầu
const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    subject: 'Lập trình web nâng cao',
    title: 'Bài thực hành 01 - Deadline Tracker',
    dueDate: '2026-10-25',
    priority: 'HIGH',
    isCompleted: false,
  },
  {
    id: '2',
    subject: 'Phát triển ứng dụng di động',
    title: 'Giao diện thời tiết React Native',
    dueDate: '2026-10-05', // Đã quá hạn để test bộ lọc
    priority: 'MEDIUM',
    isCompleted: false,
  },
  {
    id: '3',
    subject: 'Cấu trúc dữ liệu & Giải thuật',
    title: 'Bài tập cây nhị phân tìm kiếm',
    dueDate: '2026-10-18',
    priority: 'LOW',
    isCompleted: true,
  },
  {
    id : '4',
    subject : 'Lập trình hướng đối tượng',
    title: 'Làm quen với Class và Object',
    dueDate: '2026-10-20',
    priority: 'MEDIUM',
    isCompleted: false,
  },
  {
    id : '5',
    subject : 'Mạng máy tính theo ccna',
    title: 'Cấu hình Router và Switch cơ bản', 
    dueDate: '2026-10-22',
    priority: 'LOW',
    isCompleted: false,
  },
  {
    id : '6',
    subject : 'Lập trình với ngôn ngữ Java',
    title: 'Bài tập về mảng và chuỗi',  
    dueDate: '2026-10-30',
    priority: 'HIGH',
    isCompleted: false,
  }

];

// 2. Hàm giả lập chờ 3s rồi mới nhả dữ liệu
export const fetchMockAssignments = (): Promise<ApiResponse<Assignment[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        message: 'Lấy dữ liệu thành công',
        data: MOCK_ASSIGNMENTS,
      });
    }, 3000); // Bắt đợi 3s để kịp nhìn thấy chữ "Đang tải..."
  });
};