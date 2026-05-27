export const timeSlots = Array.from({ length: 31 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${String(hour).padStart(2, '0')}:${minute}`;
});

export const getPosition = (time) => {
  const [h, m] = time.split(':').map(Number);
  return ((h - 9) * 2 + (m >= 30 ? 1 : 0)) * 16;
};

export const getHeight = (start, end) => {
  return getPosition(end) - getPosition(start);
};

export const splitSchool = (value) => {
  if (!value) return '';
  return value.includes(' ')
    ? value.split(' ').join('\n')
    : value;
};

export const cloneDaysWithNewIds = (days) => {
  return days.map((day) => ({
    ...day,
    schedules: day.schedules.map((s) => ({
      ...s,
      id: crypto.randomUUID(),
    })),
  }));
};