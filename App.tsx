import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './src/app/hooks';
import { getAssignments } from './src/features/assignments/assignmentSlice';
import { AssignmentForm } from './src/features/assignments/components/assignmentForm';
import { AssignmentFilter } from './src/features/assignments/components/assignmentFilter';
import { AssignmentCard } from './src/features/assignments/components/assignmentCard';
import { isOverdueAssignment } from './src/features/assignments/types';

export default function App() {
  const dispatch = useAppDispatch();
  const { items, status, error, filter } = useAppSelector((state) => state.assignments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

  const filteredAssignments = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'COMPLETED') return item.isCompleted;
      if (filter === 'PENDING') return !item.isCompleted && !isOverdueAssignment(item);
      if (filter === 'OVERDUE') return isOverdueAssignment(item);
      return true;
    });
  }, [items, filter]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '80px 32px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '48px', fontWeight: 700, color: '#0f172a' }}>
              Student Deadline Tracker
            </h1>
            <p style={{ margin: 0, fontSize: '28px', color: '#64748b' }}>
              Theo dõi và quản lý hạn nộp bài tập cá nhân
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            + Thêm bài tập
          </button>
        </div>

        {/* Bộ lọc trạng thái */}
        <AssignmentFilter />

        {/* Modal Popup */}
        <AssignmentForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Danh sách */}
        <div>
          {status === 'loading' && (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '30px', fontSize: '28px' }}>
              Đang tải dữ liệu từ hệ thống...
            </p>
          )}

          {status === 'failed' && (
            <p style={{ textAlign: 'center', color: '#dc2626', padding: '30px', fontSize: '28px' }}>
              Không thể tải dữ liệu: {error}
            </p>
          )}

          {status === 'succeeded' && filteredAssignments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '28px' }}>
                Không có bài tập nào trong mục này.
              </p>
            </div>
          )}

          {filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment}>
              <AssignmentCard.Header />
              <AssignmentCard.Body />
              <AssignmentCard.Footer />
            </AssignmentCard>
          ))}
        </div>

      </div>
    </div>
  );
}