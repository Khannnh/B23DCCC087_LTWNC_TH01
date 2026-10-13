// src/features/assignments/components/assignmentForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addAssignment } from '../assignmentSlice';
import { Priority, CreateAssignmentDto } from '../types';

export function AssignmentForm() {
  const dispatch = useAppDispatch();

  // Local state quản lý dữ liệu form nhập liệu
  const [formData, setFormData] = useState<CreateAssignmentDto>({
    subject: '',
    title: '',
    dueDate: '',
    priority: 'MEDIUM',
  });

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate đơn giản
    if (!formData.subject.trim() || !formData.title.trim() || !formData.dueDate) {
      setError('Vui lòng nhập đầy đủ thông tin môn học, tên bài và hạn nộp!');
      return;
    }

    // Dispatch action lên Redux Store
    dispatch(addAssignment(formData));

    // Reset form sau khi thêm thành công
    setFormData({
      subject: '',
      title: '',
      dueDate: '',
      priority: 'MEDIUM',
    });
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>➕ Thêm bài tập mới</h3>

      {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '0 0 8px 0' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Tên môn học (vd: LTWNC)"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <input
          type="text"
          placeholder="Tên bài tập (vd: Bài thực hành 01)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        >
          <option value="LOW">Ưu tiên: Thấp (LOW)</option>
          <option value="MEDIUM">Ưu tiên: Trung bình (MEDIUM)</option>
          <option value="HIGH">Ưu tiên: Cao (HIGH)</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 600,
          width: '100%',
        }}
      >
        Lưu bài tập
      </button>
    </form>
  );
}