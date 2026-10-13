import { useMemo } from 'react';

export interface DeadlineInfo {
  diffDays: number;
  displayText: string;
  isOverdue: boolean;
}

export function useDeadline(dueDate: string): DeadlineInfo {
  return useMemo(() => {
    // 1. Chuẩn hóa ngày hôm nay về mốc 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Chuyển dueDate về Date
    const targetDate = new Date(dueDate);
    targetDate.setHours(0, 0, 0, 0);

    // 3. Tính khoảng cách mili-giây và đổi ra số ngày
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // 4. Xác định trạng thái và câu hiển thị
    if (diffDays < 0) {
      return {
        diffDays,
        displayText: `Quá hạn ${Math.abs(diffDays)} ngày`,
        isOverdue: true,
      };
    } else if (diffDays === 0) {
      return {
        diffDays,
        displayText: 'Hạn chót là hôm nay',
        isOverdue: false,
      };
    } else {
      return {
        diffDays,
        displayText: `Còn ${diffDays} ngày`,
        isOverdue: false,
      };
    }
  }, [dueDate]);
}