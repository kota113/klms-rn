const DATE_KEY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const formatLocalDateKey = (date: Date): string => {
  return DATE_KEY_FORMATTER.format(date);
};

const addDays = (date: Date, days: number): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const formatTodoDateLabel = (dateKey: string, today = new Date()): string => {
  if (dateKey === 'undated') {
    return '期限なし';
  }

  if (dateKey === formatLocalDateKey(today)) {
    return '本日';
  }

  if (dateKey === formatLocalDateKey(addDays(today, 1))) {
    return '明日';
  }

  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
};
