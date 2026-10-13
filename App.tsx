import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './src/app/hooks';
import { getAssignments } from './src/features/assignments/assignmentSlice';
import { AssignmentForm } from './src/features/assignments/components/assignmentForm';
import { AssignmentFilter } from './src/features/assignments/components/assignmentFilter';
import { AssignmentCard } from './src/features/assignments/components/assignmentCard';
import { isOverdueAssignment } from './src/features/assignments/types';

export default function App() {
  const dispatch = useAppDispatch();
  const { items, status, error, filter } = useAppSelector((state) => state.assignments);

  // 1. Khi mở app, gọi API giả lập lấy dữ liệu mẫu ban đầu (Yêu cầu 7)
  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

  // 2. Lọc danh sách bài tập theo trạng thái được chọn (Yêu cầu 5)
  // Vận dụng Custom Type Guard isOverdueAssignment (Buổi 1)
  const filteredAssignments = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'COMPLETED') return item.isCompleted;
      if (filter === 'PENDING') return !item.isCompleted && !isOverdueAssignment(item);
      if (filter === 'OVERDUE') return isOverdueAssignment(item);
      return true; // filter === 'ALL'
    });
  }, [items, filter]);

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 16px', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>🎓 Student Deadline Tracker</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Quản lý bài tập cá nhân & theo dõi deadline</p>
      </header>

      {/* Form thêm bài tập mới (Yêu cầu 2) */}
      <AssignmentForm />

      {/* Thanh bộ lọc trạng thái (Yêu cầu 5) */}
      <AssignmentFilter />

      {/* Khu vực hiển thị danh sách bài tập */}
      <div>
        {/* Xử lý trạng thái Loading (pending của createAsyncThunk) */}
        {status === 'loading' && (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
            ⏳ Đang tải danh sách bài tập từ hệ thống...
          </p>
        )}

        {/* Xử lý trạng thái Lỗi */}
        {status === 'failed' && (
          <p style={{ textAlign: 'center', color: '#ef4444', padding: '20px' }}>
            ❌ Đã xảy ra lỗi: {error}
          </p>
        )}

        {/* Hiển thị danh sách khi tải thành công */}
        {status === 'succeeded' && filteredAssignments.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '30px', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
            Không có bài tập nào thuộc mục này.
          </p>
        )}

        {/* Render danh sách bằng Compound Component (Buổi 2) */}
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment}>
            <AssignmentCard.Header />
            <AssignmentCard.Body />
            <AssignmentCard.Footer />
          </AssignmentCard>
        ))}
      </div>
    </div>
  );
}