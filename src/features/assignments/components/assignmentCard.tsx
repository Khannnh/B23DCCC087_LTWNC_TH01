// src/features/assignments/components/assignmentCard.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Assignment } from '../types';
import { useDeadline } from '../hooks/useDeadline';
import { useAppDispatch } from '../../../app/hooks';
import { toggleComplete, deleteAssignment } from '../assignmentSlice';

const AssignmentCardContext = createContext<Assignment | null>(null);

function useCardContext() {
  const context = useContext(AssignmentCardContext);
  if (!context) throw new Error('Compound Component Error');
  return context;
}

interface AssignmentCardProps {
  assignment: Assignment;
  children: ReactNode;
}

export function AssignmentCard({ assignment, children }: AssignmentCardProps) {
  const { diffDays, isOverdue } = useDeadline(assignment.dueDate);

  // 1. Xác định màu viền bên trái và nền thẻ theo mức độ khẩn cấp
  let borderLeftColor = '#94a3b8'; // Mặc định: xám
  let cardBg = '#ffffff';

  if (assignment.isCompleted) {
    borderLeftColor = '#0a9265'; // Xanh lá: Đã xong
    cardBg = '#f6f6f6';
  } else if (isOverdue) {
    borderLeftColor = '#ef4444'; // Đỏ tươi: Quá hạn
    cardBg = '#fffafa';          // Nền phớt hồng để đập ngay vào mắt
  } else if (diffDays <= 3) {
    borderLeftColor = '#0a428b'; 
  }

  return (
    <AssignmentCardContext.Provider value={assignment}>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderLeft: `12px solid ${borderLeftColor}`, // Dải màu viền nhấn mạnh bên trái
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
          backgroundColor: cardBg,
          boxShadow: isOverdue && !assignment.isCompleted 
            ? '0 4px 12px rgba(239, 68, 68, 0.12)' 
            : '0 2px 4px rgba(0,0,0,0.03)',
          transition: 'all 0.2s ease',
        }}
      >
        {children}
      </div>
    </AssignmentCardContext.Provider>
  );
}

function Header() {
  const { subject, priority } = useCardContext();

  const badgeConfig = {
    HIGH: { bg: '#fee2e2', text: '#b91c1c', label: 'Cao' },
    MEDIUM: { bg: '#fef3c7', text: '#b45309', label: 'Trung bình' },
    LOW: { bg: '#f1f5f9', text: '#475569', label: 'Thấp' },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ fontWeight: 700, fontSize: '14px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {subject}
      </span>
      <span
        style={{
          backgroundColor: badgeConfig[priority].bg,
          color: badgeConfig[priority].text,
          padding: '4px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        {badgeConfig[priority].label}
      </span>
    </div>
  );
}

function Body() {
  const { title, dueDate, isCompleted } = useCardContext();
  const { displayText, diffDays, isOverdue } = useDeadline(dueDate);

  // 2. Thiết lập tag cảnh báo nổi bật cho thời hạn
  const renderDeadlineBadge = () => {
    if (isCompleted) {
      return (
        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
          Đã hoàn thành
        </span>
      );
    }
    if (isOverdue) {
      return (
        <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
          {displayText}
        </span>
      );
    }
    if (diffDays <= 3) {
      return (
        <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
          Sắp tới hạn • {displayText}
        </span>
      );
    }
    return (
      <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
        {displayText}
      </span>
    );
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <h3
        style={{
          margin: '0 0 10px 0',
          fontSize: '19px',
          fontWeight: 600,
          color: isCompleted ? '#94a3b8' : '#0f172a',
          textDecoration: isCompleted ? 'line-through' : 'none',
          lineHeight: 1.4,
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', flexWrap: 'wrap' }}>
        <span style={{ color: '#64748b' }}>Hạn nộp: {dueDate}</span>
        <span>•</span>
        {renderDeadlineBadge()}
      </div>
    </div>
  );
}

function Footer() {
  const { id, isCompleted } = useCardContext();
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: 500, color: '#334155', userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => dispatch(toggleComplete(id))}
          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563eb' }}
        />
        {isCompleted ? 'Đã xong' : 'Đánh dấu hoàn thành'}
      </label>
      <button
        onClick={() => dispatch(deleteAssignment(id))}
        style={{
          backgroundColor: 'transparent',
          color: '#dc2626',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Xoá
      </button>
    </div>
  );
}

AssignmentCard.Header = Header;
AssignmentCard.Body = Body;
AssignmentCard.Footer = Footer;