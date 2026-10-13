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
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
          backgroundColor: assignment.isCompleted ? '#f8fafc' : '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
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
  const { displayText, isOverdue } = useDeadline(dueDate);

  const getStatusColor = () => {
    if (isCompleted) return '#16a34a';
    if (isOverdue) return '#dc2626';
    return '#2563eb';
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '19px',
          fontWeight: 600,
          color: isCompleted ? '#94a3b8' : '#0f172a',
          textDecoration: isCompleted ? 'line-through' : 'none',
          lineHeight: 1.4,
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '15px', color: '#64748b' }}>
        <span>Hạn nộp: {dueDate}</span>
        <span>•</span>
        <span style={{ fontWeight: 600, color: getStatusColor() }}>
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