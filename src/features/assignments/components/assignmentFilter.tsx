// src/features/assignments/components/assignmentFilter.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setFilter } from '../assignmentSlice';
import { FilterStatus } from '../types';

export function AssignmentFilter() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.assignments.filter);

  const filterOptions: { label: string; value: FilterStatus }[] = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Chưa hoàn thành', value: 'PENDING' },
    { label: 'Quá hạn', value: 'OVERDUE' },
    { label: 'Đã hoàn thành', value: 'COMPLETED' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {filterOptions.map((opt) => {
        const isActive = currentFilter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => dispatch(setFilter(opt.value))}
            style={{
              padding: '8px 18px',
              borderRadius: '24px',
              border: isActive ? '1px solid #2563eb' : '1px solid #cbd5e1',
              backgroundColor: isActive ? '#2563eb' : '#ffffff',
              color: isActive ? '#ffffff' : '#334155',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}