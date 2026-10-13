// src/features/assignments/components/assignmentCard.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Assignment } from '../types';
import { useDeadline } from '../hooks/useDeadline';
import { useAppDispatch } from '../../../app/hooks';
import { toggleComplete, deleteAssignment } from '../assignmentSlice';

// 1. Khởi tạo Context nội bộ cho riêng Card (theo Slide Buổi 2)
const AssignmentCardContext = createContext<Assignment | null>(null);

function useCardContext() {
  const context = useContext(AssignmentCardContext);
  if (!context) {
    throw new Error('Các component con phải nằm trong <AssignmentCard>');
  }
  return context;
}

// 2. Component Cha (Provider)
interface AssignmentCardProps {
  assignment: Assignment;
  children: ReactNode;
}

export function AssignmentCard({ assignment, children }: AssignmentCardProps) {
  return (
    <AssignmentCardContext.Provider value={assignment}>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px',
          backgroundColor: assignment.isCompleted ? '#f8fafc' : '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {children}
      </div>
    </AssignmentCardContext.Provider>
  );
}

// 3. Component Con: Header (Môn học + Badge ưu tiên)
function Header() {
  const { subject, priority } = useCardContext();

  const priorityColors = {
    HIGH: { bg: '#fee2e2', text: '#dc2626' },
    MEDIUM: { bg: '#fef3c7', text: '#d97706' },
    LOW: { bg: '#dcfce7', text: '#16a34a' },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#64748b' }}>
        📚 {subject}
      </span>
      <span
        style={{
          backgroundColor: priorityColors[priority].bg,
          color: priorityColors[priority].text,
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        {priority}
      </span>
    </div>
  );
}

// 4. Component Con: Body (Tên bài tập + Thời gian từ Custom Hook useDeadline)
function Body() {
  const { title, dueDate, isCompleted } = useCardContext();
  const { displayText, isOverdue } = useDeadline(dueDate);

  return (
    <div style={{ marginBottom: '12px' }}>
      <h3
        style={{
          margin: '0 0 6px 0',
          fontSize: '16px',
          textDecoration: isCompleted ? 'line-through' : 'none',
          color: isCompleted ? '#94a3b8' : '#0f172a',
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: '13px', color: isOverdue && !isCompleted ? '#ef4444' : '#64748b' }}>
        📅 Hạn nộp: {dueDate} • <strong>{isCompleted ? '✅ Đã hoàn thành' : displayText}</strong>
      </p>
    </div>
  );
}

// 5. Component Con: Footer (Hành động Checkbox + Xoá)
function Footer() {
  const { id, isCompleted } = useCardContext();
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => dispatch(toggleComplete(id))}
        />
        {isCompleted ? 'Hoàn thành' : 'Chưa xong'}
      </label>
      <button
        onClick={() => dispatch(deleteAssignment(id))}
        style={{
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Xoá
      </button>
    </div>
  );
}

// 6. Gán các component con vào Cha (Đúng chuẩn Compound Component của Buổi 2)
AssignmentCard.Header = Header;
AssignmentCard.Body = Body;
AssignmentCard.Footer = Footer;