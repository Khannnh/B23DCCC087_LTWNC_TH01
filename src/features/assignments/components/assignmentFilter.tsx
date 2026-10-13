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
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
      {filterOptions.map((opt) => {
        const isActive = currentFilter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => dispatch(setFilter(opt.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: isActive ? '1px solid #2563eb' : '1px solid #cbd5e1',
              backgroundColor: isActive ? '#2563eb' : '#ffffff',
              color: isActive ? '#ffffff' : '#475569',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}