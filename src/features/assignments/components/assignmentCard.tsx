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
  return (
    <AssignmentCardContext.Provider value={assignment}>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '12px',
          backgroundColor: assignment.isCompleted ? '#f8fafc' : '#ffffff',
          transition: 'border-color 0.15s ease',
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
    HIGH: { bg: '#fee2e2', text: '#ff1717', label: 'Cao' },
    MEDIUM: { bg: '#fef3c7', text: '#b3550c', label: 'Trung bình' },
    LOW: { bg: '#f1f5f9', text: '#5c6941', label: 'Thấp' },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <span style={{ fontWeight: 600, fontSize: '13px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
        {subject}
      </span>
      <span
        style={{
          backgroundColor: badgeConfig[priority].bg,
          color: badgeConfig[priority].text,
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '11px',
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
  const { displayText, isOverdue } = useDeadline(dueDate);

  const getStatusColor = () => {
    if (isCompleted) return '#00da50';
    if (isOverdue) return '#dc2626';
    return '#2563eb';
  };

  return (
    <div style={{ marginBottom: '14px'  }}>
      <h3
        style={{
          margin: '0 0 6px 0',
          fontSize: '16px',
          fontWeight: 600,
          color: isCompleted ? '#94a3b8' : '#0f172a',
          textDecoration: isCompleted ? 'line-through' : 'none',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
        <span>Hạn: {dueDate}</span>
        <span>•</span>
        <span style={{ fontWeight: 500, color: getStatusColor() }}>
          {isCompleted ? 'Đã hoàn thành' : displayText}
        </span>
      </div>
    </div>
  );
}

function Footer() {
  const { id, isCompleted } = useCardContext();
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155', userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => dispatch(toggleComplete(id))}
          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }}
        />
        {isCompleted ? 'Đã xong' : 'Đánh dấu hoàn thành'}
      </label>
      <button
        onClick={() => dispatch(deleteAssignment(id))}
        style={{
          backgroundColor: 'transparent',
          color: '#dc2626',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 500,
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