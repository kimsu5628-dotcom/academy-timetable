import { useEffect, useMemo, useState } from 'react';

const defaultRooms = ['101호', '102호', '301호', '302호', '401호'];

const defaultTeacherColors = {
  김영환: 'bg-blue-100 text-blue-900 border-blue-400',
  박영웅: 'bg-purple-100 text-purple-900 border-purple-400',
  김민수: 'bg-green-100 text-green-900 border-green-400',
  정수연: 'bg-pink-100 text-pink-900 border-pink-400',
  류승범: 'bg-yellow-100 text-yellow-900 border-yellow-400',
};

const extraTeacherColorPalette = [
  'bg-cyan-100 text-cyan-900 border-cyan-400',
  'bg-orange-100 text-orange-900 border-orange-400',
  'bg-teal-100 text-teal-900 border-teal-400',
  'bg-indigo-100 text-indigo-900 border-indigo-400',
  'bg-lime-100 text-lime-900 border-lime-400',
  'bg-red-100 text-red-900 border-red-400',
  'bg-violet-100 text-violet-900 border-violet-400',
  'bg-amber-100 text-amber-900 border-amber-400',
];

const tabs = [
  { id: 'current', label: '현재 시간표' },
  { id: 'regular', label: '기본 시간표' },
  { id: 'special', label: '시험대비 일정표' },
  { id: 'month', label: '월간 보기' },
];

const baseDays = [
  { name: '월', schedules: [{ id: 1, room: '301호', start: '18:00', end: '21:00', teacher: '김영환', count: '6/12', school: '고1' }] },
  {
    name: '화',
    schedules: [
      { id: 2, room: '102호', start: '17:00', end: '20:00', teacher: '정수연', count: '9/12', school: '고2 금정' },
      { id: 3, room: '301호', start: '18:00', end: '21:00', teacher: '김영환', count: '6/12', school: '고1' },
      { id: 4, room: '102호', start: '20:00', end: '23:00', teacher: '정수연', count: '7/12', school: '고2 금정' },
      { id: 5, room: '301호', start: '21:00', end: '24:00', teacher: '김영환', count: '10/12', school: '고3' },
    ],
  },
  {
    name: '수',
    schedules: [
      { id: 6, room: '302호', start: '17:00', end: '20:00', teacher: '박영웅', count: '1/6', school: '고1 금정' },
      { id: 7, room: '302호', start: '20:00', end: '23:00', teacher: '박영웅', count: '1/6', school: '고1 대명' },
      { id: 8, room: '102호', start: '20:00', end: '23:00', teacher: '정수연', count: '7/12', school: '고2 충렬' },
      { id: 9, room: '301호', start: '21:00', end: '24:00', teacher: '김영환', count: '8/12', school: '고3' },
    ],
  },
  {
    name: '목',
    schedules: [
      { id: 10, room: '101호', start: '17:00', end: '20:00', teacher: '류승범', count: '3/10', school: '고1 충렬' },
      { id: 11, room: '102호', start: '17:00', end: '20:00', teacher: '정수연', count: '11/12', school: '고1 금정' },
      { id: 12, room: '301호', start: '18:00', end: '21:00', teacher: '김영환', count: '8/12', school: '고2' },
      { id: 13, room: '101호', start: '20:00', end: '23:00', teacher: '류승범', count: '2/12', school: '고1 충렬' },
      { id: 14, room: '102호', start: '20:00', end: '23:00', teacher: '정수연', count: '7/12', school: '고3 혜화' },
      { id: 15, room: '301호', start: '21:00', end: '24:00', teacher: '김영환', count: '8/12', school: '고3' },
    ],
  },
  {
    name: '금',
    schedules: [
      { id: 16, room: '101호', start: '17:00', end: '20:00', teacher: '류승범', count: '2/12', school: '중3' },
      { id: 17, room: '102호', start: '17:00', end: '20:00', teacher: '정수연', count: '9/12', school: '고2 금정' },
      { id: 18, room: '301호', start: '18:00', end: '21:00', teacher: '김영환', count: '11/12', school: '고1' },
      { id: 19, room: '302호', start: '18:00', end: '21:00', teacher: '박영웅', count: '2/6', school: '고1 연제·반여' },
      { id: 20, room: '101호', start: '20:00', end: '23:00', teacher: '류승범', count: '3/12', school: '고2' },
      { id: 21, room: '102호', start: '20:00', end: '23:00', teacher: '정수연', count: '6/12', school: '고3' },
      { id: 22, room: '301호', start: '21:00', end: '24:00', teacher: '김영환', count: '12/12', school: '고3' },
      { id: 23, room: '302호', start: '21:00', end: '24:00', teacher: '박영웅', count: '2/6', school: '고2 성모' },
    ],
  },
  {
    name: '토',
    schedules: [
      { id: 24, room: '301호', start: '09:00', end: '12:00', teacher: '김영환', count: '9/12', school: '고1' },
      { id: 25, room: '102호', start: '09:00', end: '12:00', teacher: '정수연', count: '6/12', school: '고3 혜화' },
      { id: 26, room: '401호', start: '09:00', end: '12:00', teacher: '김민수', count: '6/10', school: '중3' },
      { id: 27, room: '302호', start: '09:00', end: '12:00', teacher: '류승범', count: '0/6', school: '고1 용인' },
      { id: 28, room: '401호', start: '12:00', end: '15:00', teacher: '김영환', count: '14/14', school: '고2' },
      { id: 29, room: '102호', start: '12:00', end: '15:00', teacher: '정수연', count: '12/12', school: '고2 학산' },
      { id: 30, room: '101호', start: '12:30', end: '15:30', teacher: '김민수', count: '5/10', school: '중2' },
      { id: 31, room: '302호', start: '12:30', end: '15:30', teacher: '류승범', count: '3/6', school: '중2' },
      { id: 32, room: '301호', start: '12:30', end: '15:30', teacher: '박영웅', count: '4/6', school: '중1' },
      { id: 33, room: '401호', start: '15:00', end: '18:00', teacher: '김영환', count: '9/12', school: '고2' },
      { id: 34, room: '102호', start: '15:30', end: '18:30', teacher: '정수연', count: '9/12', school: '고1 혜화' },
      { id: 35, room: '101호', start: '15:30', end: '18:30', teacher: '김민수', count: '7/10', school: '중2' },
      { id: 36, room: '302호', start: '15:30', end: '18:30', teacher: '류승범', count: '4/6', school: '고2 용인' },
      { id: 37, room: '301호', start: '15:30', end: '18:30', teacher: '박영웅', count: '8/10', school: '고1 금정' },
      { id: 38, room: '401호', start: '18:00', end: '21:00', teacher: '김영환', count: '12/12', school: '고2' },
      { id: 39, room: '401호', start: '21:00', end: '24:00', teacher: '김영환', count: '10/12', school: '고3' },
    ],
  },
  {
    name: '일',
    schedules: [
      { id: 40, room: '301호', start: '09:00', end: '12:00', teacher: '김영환', count: '12/12', school: '중3' },
      { id: 41, room: '101호', start: '09:00', end: '12:00', teacher: '류승범', count: '7/10', school: '중1' },
      { id: 42, room: '401호', start: '09:00', end: '12:00', teacher: '박영웅', count: '6/10', school: '중1' },
      { id: 43, room: '301호', start: '12:00', end: '15:00', teacher: '김영환', count: '11/12', school: '고2' },
      { id: 44, room: '401호', start: '12:00', end: '15:00', teacher: '박영웅', count: '7/10', school: '고1 대명' },
      { id: 45, room: '101호', start: '12:30', end: '15:30', teacher: '류승범', count: '4/10', school: '고1 충렬' },
      { id: 46, room: '301호', start: '15:00', end: '18:00', teacher: '김영환', count: '11/12', school: '고2' },
      { id: 47, room: '401호', start: '15:00', end: '18:00', teacher: '박영웅', count: '6/10', school: '고1 학산' },
      { id: 48, room: '101호', start: '15:30', end: '18:30', teacher: '류승범', count: '9/12', school: '고1 혜화' },
      { id: 49, room: '301호', start: '18:00', end: '21:00', teacher: '김영환', count: '12/12', school: '고3' },
      { id: 50, room: '301호', start: '21:00', end: '24:00', teacher: '김영환', count: '6/12', school: '고3' },
    ],
  },
];

function emptyForm() {
  return {
    id: null,
    day: '월',
    room: '101호',
    start: '17:00',
    end: '20:00',
    teacher: '김영환',
    count: '0/12',
    school: '',
  };
}

function addHours(time, hours) {
  const [h, m] = time.split(':').map(Number);
  const next = Math.min(h + hours, 24);
  return `${String(next).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function toLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function formatInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayString() {
  return formatInputDate(new Date());
}

function addDays(dateString, amount) {
  const date = toLocalDate(dateString);
  date.setDate(date.getDate() + amount);
  return formatInputDate(date);
}

function getShortDate(dateString) {
  if (!dateString) return '';
  const date = toLocalDate(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function getThisWeekDates() {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });
}


function getMonthCalendarDates() {
  const result = [];
  const today = new Date();
  const start = new Date(today);
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diffToMonday);

  for (let i = 0; i < 28; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    result.push({
      date: formatInputDate(current),
      dayName: dayNames[current.getDay()],
    });
  }

  return result;
}

function getScheduleByDate(dateString, regularDays, specialEvents) {
  for (const event of specialEvents) {
    const matchedDate = event.dates?.find((d) => d.date === dateString);

    if (matchedDate) {
      return {
        type: 'special',
        title: event.title,
        dateData: matchedDate,
      };
    }
  }

  const date = toLocalDate(dateString);
  const dayName = dayNames[date.getDay()];
  const baseDay = regularDays.find((day) => day.name === dayName);

  return {
    type: 'regular',
    title: '기본 시간표',
    dateData: {
      date: dateString,
      dayName,
      schedules: baseDay ? baseDay.schedules : [],
    },
  };
}

function cloneDaysWithNewIds(days) {
  const stamp = Date.now();
  return days.map((day, dayIdx) => ({
    ...day,
    schedules: day.schedules.map((s, idx) => ({
      ...s,
      id: stamp + dayIdx * 1000 + idx,
    })),
  }));
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

function createDateRange(startDate, endDate, sourceDays) {
  const result = [];
  let current = toLocalDate(startDate);
  const end = toLocalDate(endDate);

  while (current <= end) {
    const dateString = formatInputDate(current);
    const dayName = dayNames[current.getDay()];
    const baseDay = sourceDays.find((day) => day.name === dayName);

    result.push({
      id: dateString,
      date: dateString,
      dayName,
      schedules: baseDay ? cloneDaysWithNewIds([baseDay])[0].schedules : [],
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

function splitSchool(value) {
  if (!value) return '';
  return value.includes(' ') ? value.split(' ').join('\n') : value;
}

function getDateLabel(dateData) {
  if (!dateData) return '';
  return `${getShortDate(dateData.date)} ${dateData.dayName}`;
}

export default function WeeklyAcademyTimeline() {
  const [activeTab, setActiveTab] = useState('current');
  const [regularDays, setRegularDays] = useState(baseDays);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [teachers, setTeachers] = useState(Object.keys(defaultTeacherColors));
  const [rooms, setRooms] = useState(defaultRooms);
  const [newTeacher, setNewTeacher] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newSpecial, setNewSpecial] = useState({
    title: '',
    startDate: '',
    endDate: '',
  });

  const todayString = getTodayString();

  const activeSpecial = useMemo(() => {
    for (const event of specialEvents) {
      const matchedDate = event.dates?.find((d) => d.date === todayString);
      if (matchedDate) return { event, dateData: matchedDate };
    }
    return null;
  }, [specialEvents, todayString]);

  const selectedEvent = specialEvents.find((item) => item.id === selectedEventId) || null;
  const selectedDateData =
    selectedEvent?.dates?.find((d) => d.date === selectedDate) ||
    selectedEvent?.dates?.[0] ||
    null;

  const currentTitle = activeSpecial
    ? `현재 시간표 · ${activeSpecial.event.title} ${getDateLabel(activeSpecial.dateData)}`
    : '현재 시간표 · 기본 적용 중';

  const days = useMemo(() => {
    if (activeTab === 'current') {
      return activeSpecial
        ? [{ name: activeSpecial.dateData.dayName, schedules: activeSpecial.dateData.schedules }]
        : regularDays;
    }
    if (activeTab === 'regular') return regularDays;
    if (activeTab === 'special') {
      return selectedDateData
        ? [{ name: selectedDateData.dayName, schedules: selectedDateData.schedules }]
        : regularDays;
    }
    return regularDays;
  }, [activeTab, activeSpecial, selectedDateData, regularDays]);

  const weekDates = useMemo(() => {
    if (activeTab === 'current' && activeSpecial) return [getShortDate(activeSpecial.dateData.date)];
    if (activeTab === 'special' && selectedDateData) return [getShortDate(selectedDateData.date)];
    return getThisWeekDates();
  }, [activeTab, activeSpecial, selectedDateData]);

  const monthDates = useMemo(() => getMonthCalendarDates(), []);

  const monthSchedules = useMemo(() => {
    return monthDates.map((dateInfo) => {
      return getScheduleByDate(dateInfo.date, regularDays, specialEvents);
    });
  }, [monthDates, regularDays, specialEvents]);

  const displayTitle =
    activeTab === 'current'
      ? currentTitle
      : activeTab === 'regular'
        ? '기본 시간표'
        : activeTab === 'month'
          ? '월간 보기'
          : selectedEvent
            ? `시험대비 · ${selectedEvent.title}${selectedDateData ? ` · ${getDateLabel(selectedDateData)}` : ''}`
            : '시험대비 일정표';

  const displaySubTitle =
    activeTab === 'current'
      ? activeSpecial
        ? `${activeSpecial.dateData.date} 자동 적용 중`
        : '예약된 시험대비 일정이 없어 기본 시간표가 표시됩니다.'
      : activeTab === 'regular'
        ? '평상시 적용되는 기본 주간 시간표'
        : activeTab === 'month'
          ? '오늘이 포함된 주부터 4주간의 실제 운영 시간표입니다.'
          : selectedEvent
            ? `${selectedEvent.startDate} ~ ${selectedEvent.endDate} 시험대비 기간`
            : '시험대비 기간을 설정하면 선택한 날짜들이 월~일 순서로 표시됩니다.';

  const isEditing = Boolean(form.id);

  useEffect(() => {
    const savedRegular = localStorage.getItem('academy-regular-days-v6');
    const savedSpecial = localStorage.getItem('academy-special-events-v6');
    const savedTeachers = localStorage.getItem('academy-teachers-v6');
    const savedRooms = localStorage.getItem('academy-rooms-v6');

    if (savedRegular) setRegularDays(JSON.parse(savedRegular));
    if (savedSpecial) {
      const parsed = JSON.parse(savedSpecial);
      setSpecialEvents(parsed);
      if (parsed.length > 0) {
        setSelectedEventId(parsed[0].id);
        setSelectedDate(parsed[0].dates?.[0]?.date || null);
      }
    }
    if (savedTeachers) setTeachers(JSON.parse(savedTeachers));
    if (savedRooms) setRooms(JSON.parse(savedRooms));
  }, []);

  useEffect(() => {
    localStorage.setItem('academy-regular-days-v6', JSON.stringify(regularDays));
  }, [regularDays]);

  useEffect(() => {
    localStorage.setItem('academy-special-events-v6', JSON.stringify(specialEvents));
  }, [specialEvents]);

  useEffect(() => {
    localStorage.setItem('academy-teachers-v6', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('academy-rooms-v6', JSON.stringify(rooms));
  }, [rooms]);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 9; h <= 24; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      if (h !== 24) slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const getPosition = (time) => {
    const [h, m] = time.split(':').map(Number);
    return ((h - 9) * 2 + (m === 30 ? 1 : 0)) * 20;
  };

  const getHeight = (start, end) => getPosition(end) - getPosition(start);

  const allSchedules = days.flatMap((day) =>
    day.schedules.map((schedule) => ({ ...schedule, day: day.name }))
  );

  const getTeacherColor = (teacher) => {
    if (defaultTeacherColors[teacher]) return defaultTeacherColors[teacher];
    const extraTeachers = teachers.filter((t) => !defaultTeacherColors[t]);
    const extraIndex = extraTeachers.indexOf(teacher);
    if (extraIndex >= 0) return extraTeacherColorPalette[extraIndex % extraTeacherColorPalette.length];
    return 'bg-slate-100 text-slate-900 border-slate-400';
  };

  const updateSpecialDateSchedules = (eventId, date, updater) => {
    setSpecialEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              dates: event.dates.map((dateData) =>
                dateData.date === date
                  ? {
                      ...dateData,
                      schedules: typeof updater === 'function' ? updater(dateData.schedules) : updater,
                    }
                  : dateData
              ),
            }
          : event
      )
    );
  };

  const updateDaysForCurrentView = (updater) => {
    if (activeTab === 'regular') {
      setRegularDays((prev) => (typeof updater === 'function' ? updater(prev) : updater));
      return;
    }
    if (activeTab === 'current') {
      if (activeSpecial) {
        updateSpecialDateSchedules(activeSpecial.event.id, activeSpecial.dateData.date, (prevSchedules) => {
          const currentDay = { name: activeSpecial.dateData.dayName, schedules: prevSchedules };
          const updatedDays = typeof updater === 'function' ? updater([currentDay]) : updater;
          return updatedDays[0]?.schedules || [];
        });
      } else {
        setRegularDays((prev) => (typeof updater === 'function' ? updater(prev) : updater));
      }
      return;
    }
    if (activeTab === 'special' && selectedEvent && selectedDateData) {
      updateSpecialDateSchedules(selectedEvent.id, selectedDateData.date, (prevSchedules) => {
        const currentDay = { name: selectedDateData.dayName, schedules: prevSchedules };
        const updatedDays = typeof updater === 'function' ? updater([currentDay]) : updater;
        return updatedDays[0]?.schedules || [];
      });
    }
  };

  const canEditCurrentView = () => !(activeTab === 'special' && (!selectedEvent || !selectedDateData));

  const selectEmptySlot = (dayName, room, start) => {
    if (!adminMode) return;
    if (!canEditCurrentView()) {
      alert('먼저 시험대비 일정과 날짜를 선택하거나 새로 만들어줘.');
      return;
    }
    setForm({ ...emptyForm(), day: dayName, room, start, end: addHours(start, 3), teacher: teachers[0] || '김영환' });
  };

  const selectClass = (schedule, dayName) => {
    if (!adminMode) return;
    if (!canEditCurrentView()) return;
    setForm({ ...schedule, day: dayName });
  };

  const saveClass = () => {
    if (!canEditCurrentView()) return alert('먼저 편집할 시간표를 선택해줘.');
    if (!form.teacher.trim()) return alert('강사명을 입력해줘.');
    if (!form.room.trim()) return alert('강의실을 입력해줘.');
    if (!form.school.trim()) return alert('학년/학교를 입력해줘.');
    if (!teachers.includes(form.teacher)) setTeachers((prev) => [...prev, form.teacher]);
    if (!rooms.includes(form.room)) setRooms((prev) => [...prev, form.room]);

    updateDaysForCurrentView((prevDays) =>
      prevDays.map((day) => {
        const schedulesWithoutEditing = day.schedules.filter((s) => s.id !== form.id);
        if (day.name !== form.day) return { ...day, schedules: schedulesWithoutEditing };
        const newClass = {
          id: form.id || Date.now(),
          room: form.room,
          start: form.start,
          end: form.end,
          teacher: form.teacher,
          count: form.count,
          school: form.school,
        };
        return { ...day, schedules: [...schedulesWithoutEditing, newClass].sort((a, b) => a.start.localeCompare(b.start)) };
      })
    );
    setForm(emptyForm());
  };

  const deleteClass = () => {
    if (!form.id) return;
    if (!confirm('이 수업을 삭제할까?')) return;
    updateDaysForCurrentView((prevDays) => prevDays.map((day) => ({ ...day, schedules: day.schedules.filter((s) => s.id !== form.id) })));
    setForm(emptyForm());
  };

  const addTeacher = () => {
    const name = newTeacher.trim();
    if (!name) return alert('강사명을 입력해줘.');
    if (teachers.includes(name)) return alert('이미 있는 강사야.');
    setTeachers((prev) => [...prev, name]);
    setForm((prev) => ({ ...prev, teacher: name }));
    setNewTeacher('');
  };

  const deleteTeacher = (teacher) => {
    const hasClass = allSchedules.some((s) => s.teacher === teacher);
    if (hasClass && !confirm(`${teacher} 강사의 수업도 현재 보고 있는 시간표에서 모두 삭제할까?`)) return;
    if (hasClass) updateDaysForCurrentView((prevDays) => prevDays.map((day) => ({ ...day, schedules: day.schedules.filter((s) => s.teacher !== teacher) })));
    setTeachers((prev) => prev.filter((t) => t !== teacher));
    if (form.teacher === teacher) setForm((prev) => ({ ...prev, teacher: teachers[0] || '' }));
  };

  const addRoom = () => {
    const room = newRoom.trim();
    if (!room) return alert('강의실명을 입력해줘.');
    if (rooms.includes(room)) return alert('이미 있는 강의실이야.');
    setRooms((prev) => [...prev, room]);
    setForm((prev) => ({ ...prev, room }));
    setNewRoom('');
  };

  const resetCurrentView = () => {
    if (!confirm('현재 보고 있는 시간표를 초기화할까?')) return;
    if (activeTab === 'regular') {
      setRegularDays(baseDays);
      setForm(emptyForm());
      return;
    }
    if (activeTab === 'current') {
      if (activeSpecial) updateSpecialDateSchedules(activeSpecial.event.id, activeSpecial.dateData.date, []);
      else setRegularDays(baseDays);
      setForm(emptyForm());
      return;
    }
    if (activeTab === 'special' && selectedEvent && selectedDateData) {
      updateSpecialDateSchedules(selectedEvent.id, selectedDateData.date, []);
      setForm(emptyForm());
    }
  };

  const createSpecialSchedule = () => {
    if (!newSpecial.title.trim()) return alert('시험대비 일정 제목을 입력해줘.');
    if (!newSpecial.startDate || !newSpecial.endDate) return alert('시작일과 종료일을 입력해줘.');
    if (newSpecial.startDate > newSpecial.endDate) return alert('종료일은 시작일보다 늦어야 해.');

    const dates = createDateRange(newSpecial.startDate, newSpecial.endDate, regularDays);
    const event = {
      id: Date.now(),
      title: newSpecial.title.trim(),
      startDate: newSpecial.startDate,
      endDate: newSpecial.endDate,
      dates,
    };
    setSpecialEvents((prev) => [...prev, event].sort((a, b) => a.startDate.localeCompare(b.startDate)));
    setSelectedEventId(event.id);
    if (event.dates.length > 0) setSelectedDate(event.dates[0].date);
    setNewSpecial({ title: '', startDate: '', endDate: '' });
    setActiveTab('special');
    setForm(emptyForm());
  };

  const deleteSpecialSchedule = (id) => {
    if (!confirm('이 시험대비 일정을 삭제할까?')) return;
    setSpecialEvents((prev) => prev.filter((item) => item.id !== id));
    if (selectedEventId === id) {
      setSelectedEventId(null);
      setSelectedDate(null);
    }
    setForm(emptyForm());
  };

  const duplicateRegularToSelectedDate = () => {
    if (!selectedEvent || !selectedDateData) return alert('먼저 시험대비 일정과 날짜를 선택해줘.');
    if (!confirm('기본 시간표에서 같은 요일 수업을 선택한 날짜에 복사할까? 기존 내용은 덮어써져.')) return;
    const baseDay = regularDays.find((day) => day.name === selectedDateData.dayName);
    const nextSchedules = baseDay ? cloneDaysWithNewIds([baseDay])[0].schedules : [];
    updateSpecialDateSchedules(selectedEvent.id, selectedDateData.date, nextSchedules);
    setForm(emptyForm());
  };

  const renderMobileGrid = (targetDays, targetDates, title, subtitle) => (
    <div className="md:hidden px-2 pb-6 print:hidden">
      <div className="mb-3 rounded-2xl bg-white border border-slate-200 shadow-sm p-3">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">{subtitle}</div>
      </div>
      <div className="space-y-4">
        {targetDays.map((day, dayIdx) => (
          <div key={`${title}-${day.name}-mobile-grid`} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-3 py-2 bg-slate-800 text-white flex items-center justify-between">
              <div className="font-extrabold text-sm">{day.name}요일</div>
              <div className="text-xs opacity-80">{targetDates[dayIdx]}</div>
            </div>
            <div className="overflow-x-auto">
              <div className="grid min-w-[430px]" style={{ gridTemplateColumns: `38px repeat(${rooms.length}, minmax(70px, 1fr))` }}>
                <div className="h-6 border-r border-b border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-500 flex items-center justify-center">시간</div>
                {rooms.map((room) => (
                  <div key={`${title}-${day.name}-${room}-mobile-head`} className="h-6 border-r border-b border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-700 flex items-center justify-center">{room}</div>
                ))}
                <div>
                  {timeSlots.map((time) => (
                    <div key={`${title}-${day.name}-mobile-time-${time}`} className="h-4 border-t border-r border-slate-100 text-[7px] text-slate-400 flex items-start justify-center pt-[1px]">
                      {time.endsWith(':00') ? time : ''}
                    </div>
                  ))}
                </div>
                {rooms.map((room) => (
                  <div key={`${title}-${day.name}-${room}-mobile-body`} className="relative border-r border-slate-100">
                    {timeSlots.map((time) => (
                      <div key={`${title}-${day.name}-${room}-mobile-slot-${time}`} onClick={() => selectEmptySlot(day.name, room, time)} className={`h-4 border-t border-slate-100 ${adminMode ? 'cursor-pointer hover:bg-blue-50' : ''}`} />
                    ))}
                    {day.schedules.filter((s) => s.room === room).map((s) => (
                      <button
                        key={`${title}-${s.id}-mobile-room`}
                        onClick={(e) => { e.stopPropagation(); selectClass(s, day.name); }}
                        className={`absolute left-[2px] right-[2px] rounded-lg border px-1.5 py-1 text-center shadow-sm overflow-hidden flex flex-col items-center justify-center ${getTeacherColor(s.teacher)} ${adminMode ? 'hover:ring-2 hover:ring-slate-400' : ''}`}
                        style={{ top: `${getPosition(s.start) * 0.8}px`, height: `${Math.max(getHeight(s.start, s.end) * 0.8 - 2, 34)}px` }}
                      >
                        <div className="font-extrabold text-[11px] leading-none truncate w-full">{s.teacher}</div>
                        <div className="mt-0.5 text-[11px] font-bold leading-tight whitespace-pre-line break-keep w-full">{splitSchool(s.school)}</div>
                        <div className="mt-0.5 text-[9px] opacity-75 w-full">{s.count}</div>
                        <div className="mt-0 text-[8px] opacity-70 w-full">{s.start}</div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesktopGrid = (targetDays, targetDates, title, subtitle, usePrintId = false) => (
    <>
      <div id={usePrintId ? 'print-header' : undefined} className="hidden md:flex print:flex w-[1180px] print:w-[1120px] mx-auto mb-2 items-end justify-between">
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h1>
          <p className="text-[10px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div id={usePrintId ? 'print-area' : undefined} className="hidden md:grid print:grid border border-slate-300 bg-white rounded-xl overflow-hidden shadow-md w-[1180px] print:w-[100%] mx-auto print:mx-0 print:shadow-none print:rounded-none" style={{ gridTemplateColumns: `46px repeat(${targetDays.length * rooms.length}, 1fr)` }}>
        <div className="border-r border-b border-slate-300 p-1 font-bold bg-slate-800 text-white flex items-center justify-center row-span-2 text-[9px]">시간</div>
        {targetDays.map((day, idx) => (
          <div key={`${title}-${day.name}-day-header`} className="border-r-2 border-b border-slate-300 bg-slate-700 text-white flex flex-col items-center justify-center font-bold text-[8px] h-7 tracking-tight" style={{ gridColumn: `span ${rooms.length}` }}>
            <div>{day.name}요일</div>
            <div className="text-[7px] opacity-80">{targetDates[idx]}</div>
          </div>
        ))}
        {targetDays.flatMap((day) => rooms.map((room) => (
          <div key={`${title}-${day.name}-${room}-room-header`} className="border-r border-b border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center font-semibold text-[8px] h-5">{room}</div>
        )))}
        <div>{timeSlots.map((time) => <div key={`${title}-${time}`} className="h-5 border-t border-r border-slate-200 text-[7px] flex items-start justify-center pt-0.5 bg-slate-50 text-slate-500">{time}</div>)}</div>
        {targetDays.flatMap((day, dayIdx) => rooms.map((room, roomIdx) => (
          <div key={`${title}-${day.name}-${room}-body`} className={`relative border-r border-slate-200 ${roomIdx === 0 ? 'border-l-2 border-l-slate-400' : ''} ${dayIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
            {timeSlots.map((time) => (
              <div key={`${title}-${day.name}-${room}-${time}`} onClick={() => selectEmptySlot(day.name, room, time)} className={`h-5 border-t border-slate-100 ${adminMode ? 'cursor-pointer hover:bg-blue-50' : ''}`}></div>
            ))}
            {day.schedules.filter((s) => s.room === room).map((s) => (
              <div key={`${title}-${s.id}`} onClick={(e) => { e.stopPropagation(); selectClass(s, day.name); }} className={`absolute left-[2px] right-[2px] rounded-md border ${getTeacherColor(s.teacher)} text-[7px] px-[1px] py-[2px] shadow-[0_1px_2px_rgba(15,23,42,0.12)] flex flex-col items-center justify-center text-center leading-[1.05] overflow-hidden ${adminMode ? 'cursor-pointer hover:ring-2 hover:ring-slate-500' : ''} ${form.id === s.id ? 'ring-2 ring-slate-700' : ''}`} style={{ top: `${getPosition(s.start)}px`, height: `${getHeight(s.start, s.end)}px` }}>
                <div className="font-extrabold text-[7px] w-full text-center whitespace-nowrap tracking-[-0.03em] leading-none">{s.teacher}</div>
                <div className="w-full text-center opacity-80">{s.count}</div>
                <div className="w-full text-center font-medium leading-tight whitespace-pre-line break-keep">{splitSchool(s.school)}</div>
                <div className="w-full text-center text-[6px] opacity-70 mt-0">{s.start}</div>
              </div>
            ))}
          </div>
        )))}
      </div>
    </>
  );

  const renderSpecialDateSelector = () => {
    if (!selectedEvent) return null;
    return (
      <div className="w-full md:w-[1500px] mx-auto px-2 md:px-0 print:hidden mb-3">
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-extrabold text-slate-800">{selectedEvent.title}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{selectedEvent.startDate} ~ {selectedEvent.endDate}</div>
            </div>
            <button onClick={duplicateRegularToSelectedDate} className="text-[11px] font-bold text-blue-600 hover:underline">기본 시간표를 선택 날짜에 복사</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {selectedEvent.dates.map((dateData) => (
              <button
                key={dateData.date}
                onClick={() => { setSelectedDate(dateData.date); setForm(emptyForm()); }}
                className={`rounded-xl border p-2 text-center shadow-sm ${selectedDate === dateData.date ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
              >
                <div className="text-[11px] font-extrabold">{dateData.dayName}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{getShortDate(dateData.date)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
  const weeks = [];

  for (let i = 0; i < monthSchedules.length; i += 7) {
    weeks.push(monthSchedules.slice(i, i + 7));
  }

  return (
    <div className="space-y-10">
      {weeks.map((week, weekIdx) => {
        const weekDays = week.map((item) => ({
          name: item.dateData.dayName,
          schedules: item.dateData.schedules,
        }));

        const weekDateLabels = week.map((item) =>
          getShortDate(item.dateData.date)
        );

        const weekTitle = `월간 보기 · ${weekIdx + 1}주차`;
        const weekSubTitle = `${week[0].dateData.date} ~ ${
          week[week.length - 1].dateData.date
        }`;

        return (
          <div key={weekIdx}>
            {renderMobileGrid(
              weekDays,
              weekDateLabels,
              weekTitle,
              weekSubTitle
            )}

            {renderDesktopGrid(
              weekDays,
              weekDateLabels,
              weekTitle,
              weekSubTitle,
              false
            )}
          </div>
        );
      })}
    </div>
  );
};

  return (
    <div className="p-3 bg-slate-100 min-h-screen overflow-x-auto print:bg-white print:p-0 print:overflow-visible font-sans">
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 4mm; }
          html, body { margin: 0 !important; padding: 0 !important; overflow: visible !important; background: white !important; }
          body * { visibility: hidden; }
          #print-header, #print-header *, #print-area, #print-area * { visibility: visible; }
          #print-header { position: relative; width: 100% !important; }
          #print-area { position: relative; width: 100% !important; box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>

      <div className="w-full md:w-[1500px] print:w-[1120px] mx-auto mb-2 flex items-end justify-between print:hidden px-2 md:px-0">
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">주간 강의 시간표</h1>
          <p className="text-[10px] text-slate-500 mt-0.5">현재 시간표 자동 적용 · 기본/시험대비 날짜별 예약 관리</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">PDF 저장</button>
          <button onClick={() => setAdminMode((v) => !v)} className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${adminMode ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}>{adminMode ? '관리자 닫기' : '관리자 모드'}</button>
        </div>
      </div>

      <div className="w-full md:w-[1500px] mx-auto mb-3 flex gap-2 print:hidden px-2 md:px-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setForm(emptyForm()); }} className={`px-4 py-2 rounded-xl text-xs font-extrabold border shadow-sm whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'current' && (
        <div className="w-full md:w-[1500px] mx-auto mb-3 px-2 md:px-0 print:hidden">
          <div className={`rounded-xl border p-3 shadow-sm ${activeSpecial ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-white border-slate-200 text-slate-700'}`}>
            <div className="text-sm font-extrabold">{activeSpecial ? `${activeSpecial.event.title} ${getDateLabel(activeSpecial.dateData)} 자동 적용 중` : '기본 시간표 적용 중'}</div>
            <div className="text-[11px] mt-0.5">{activeSpecial ? `${activeSpecial.dateData.date} 시험대비 시간표가 표시됩니다.` : '오늘은 예약된 시험대비 일정 기간이 아니므로 기본 시간표가 표시됩니다.'}</div>
          </div>
        </div>
      )}

      {activeTab === 'special' && (
        <div className="w-full md:w-[1500px] mx-auto mb-3 px-2 md:px-0 print:hidden">
          <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-3">
            <div className="flex items-center justify-between mb-3"><h2 className="text-sm font-extrabold text-slate-800">시험대비 일정 예약</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_150px_90px] gap-2 mb-3">
              <input value={newSpecial.title} onChange={(e) => setNewSpecial({ ...newSpecial, title: e.target.value })} className="border rounded-lg px-2 py-1.5 text-xs" placeholder="예: 기말고사 직전대비" />
              <input type="date" value={newSpecial.startDate} onChange={(e) => setNewSpecial({ ...newSpecial, startDate: e.target.value })} className="border rounded-lg px-2 py-1.5 text-xs" />
              <input type="date" value={newSpecial.endDate} onChange={(e) => setNewSpecial({ ...newSpecial, endDate: e.target.value })} className="border rounded-lg px-2 py-1.5 text-xs" />
              <button onClick={createSpecialSchedule} className="rounded-lg bg-slate-900 text-white text-xs font-bold">예약 추가</button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {specialEvents.length === 0 ? (
                <div className="text-xs text-slate-400 p-2">아직 예약된 시험대비 일정이 없어.</div>
              ) : (
                specialEvents.map((item) => (
                  <div key={item.id} className={`min-w-[260px] rounded-xl border p-3 shadow-sm ${selectedEventId === item.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    <button onClick={() => { setSelectedEventId(item.id); setSelectedDate(item.dates?.[0]?.date || null); setForm(emptyForm()); }} className="w-full text-left">
                      <div className="font-extrabold text-xs">{item.title}</div>
                      <div className="text-[11px] opacity-80 mt-1">{item.startDate} ~ {item.endDate}</div>
                      {item.dates.some((d) => d.date === todayString) && <div className="text-[10px] font-bold mt-2 text-amber-500">현재 적용 중</div>}
                    </button>
                  </div>
                ))
              )}
            </div>
            {selectedEvent && <div className="mt-3 flex justify-end"><button onClick={() => deleteSpecialSchedule(selectedEvent.id)} className="text-[11px] font-bold text-red-600 hover:underline">선택한 시험대비 일정 삭제</button></div>}
          </div>
        </div>
      )}

      {activeTab === 'special' && renderSpecialDateSelector()}

      {adminMode && activeTab !== 'month' && (
        <div className="w-full md:w-[1500px] mx-auto mb-3 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-3 print:hidden px-2 md:px-0">
          <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-3">
            <div className="flex items-center justify-between mb-3"><h2 className="text-sm font-extrabold text-slate-800">관리자 목록 · {displayTitle}</h2><button onClick={resetCurrentView} className="text-[11px] font-bold text-red-600 hover:underline">현재 화면 초기화</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border rounded-xl p-2">
                <div className="text-xs font-extrabold mb-2 text-slate-700">강사 관리</div>
                <div className="flex gap-2 mb-2"><input value={newTeacher} onChange={(e) => setNewTeacher(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTeacher()} className="border rounded-lg px-2 py-1 text-xs flex-1" placeholder="새 강사명 직접입력" /><button onClick={addTeacher} className="px-3 py-1 rounded-lg bg-slate-700 text-white text-xs font-bold">추가</button></div>
                <div className="flex flex-wrap gap-1">{teachers.map((teacher) => <div key={teacher} className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] ${getTeacherColor(teacher)}`}><span>{teacher}</span><button onClick={() => deleteTeacher(teacher)} className="font-bold opacity-70 hover:opacity-100">×</button></div>)}</div>
              </div>
              <div className="border rounded-xl p-2">
                <div className="text-xs font-extrabold mb-2 text-slate-700">강의실 관리</div>
                <div className="flex gap-2 mb-2"><input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addRoom()} className="border rounded-lg px-2 py-1 text-xs flex-1" placeholder="새 강의실 직접입력" /><button onClick={addRoom} className="px-3 py-1 rounded-lg bg-slate-700 text-white text-xs font-bold">추가</button></div>
                <div className="flex flex-wrap gap-1">{rooms.map((room) => <button key={room} onClick={() => setForm((prev) => ({ ...prev, room }))} className="px-2 py-1 rounded-md border bg-slate-50 text-[11px] font-bold text-slate-700 hover:bg-slate-100">{room}</button>)}</div>
              </div>
            </div>
            <div className="mt-3 max-h-48 overflow-y-auto border rounded-lg">
              <table className="w-full text-[11px]"><thead className="bg-slate-100 sticky top-0"><tr><th className="p-1 border">요일</th><th className="p-1 border">강의실</th><th className="p-1 border">시간</th><th className="p-1 border">강사</th><th className="p-1 border">반</th><th className="p-1 border">인원</th></tr></thead><tbody>{allSchedules.map((s) => <tr key={s.id} onClick={() => selectClass(s, s.day)} className={`text-center cursor-pointer hover:bg-blue-50 ${form.id === s.id ? 'bg-blue-50' : ''}`}><td className="p-1 border">{s.day}</td><td className="p-1 border">{s.room}</td><td className="p-1 border">{s.start}~{s.end}</td><td className="p-1 border">{s.teacher}</td><td className="p-1 border">{s.school}</td><td className="p-1 border">{s.count}</td></tr>)}</tbody></table>
            </div>
          </div>
          <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-3 sticky top-3 self-start">
            <div className="flex items-center justify-between mb-3"><h2 className="text-sm font-extrabold text-slate-800">{isEditing ? '수업 수정' : '새 수업 추가'}</h2><button onClick={() => setForm(emptyForm())} className="text-[11px] font-bold text-slate-500 hover:text-slate-900">새 수업</button></div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">요일</label><div className="grid grid-cols-7 gap-1">{days.map((d) => <button key={d.name} onClick={() => setForm({ ...form, day: d.name })} className={`py-1 rounded-lg border text-xs font-bold ${form.day === d.name ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}>{d.name}</button>)}</div>
              <label className="block text-[11px] font-bold text-slate-600 pt-1">강의실</label><select value={rooms.includes(form.room) ? form.room : 'direct'} onChange={(e) => { if (e.target.value !== 'direct') setForm({ ...form, room: e.target.value }); }} className="w-full border rounded-lg px-2 py-1.5 text-xs bg-white">{rooms.map((r) => <option key={r} value={r}>{r}</option>)}<option value="direct">직접입력</option></select><input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs mt-1" placeholder="새 강의실 또는 직접입력" />
              <div className="grid grid-cols-2 gap-2"><div><label className="block text-[11px] font-bold text-slate-600 mb-1">시작</label><input value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs" /></div><div><label className="block text-[11px] font-bold text-slate-600 mb-1">종료</label><input value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs" /></div></div>
              <label className="block text-[11px] font-bold text-slate-600 pt-1">강사</label><select value={teachers.includes(form.teacher) ? form.teacher : 'direct'} onChange={(e) => { if (e.target.value !== 'direct') setForm({ ...form, teacher: e.target.value }); }} className="w-full border rounded-lg px-2 py-1.5 text-xs bg-white">{teachers.map((t) => <option key={t} value={t}>{t}</option>)}<option value="direct">직접입력</option></select><input value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs mt-1" placeholder="새 강사명 또는 직접입력" />
              <label className="block text-[11px] font-bold text-slate-600 pt-1">학년/학교</label><input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="예: 고2 금정" />
              <label className="block text-[11px] font-bold text-slate-600 pt-1">인원</label><input value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} className="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="예: 6/12" />
              <div className="flex gap-2 pt-2"><button onClick={saveClass} className="flex-1 rounded-lg bg-slate-900 text-white py-2 text-xs font-extrabold hover:bg-slate-700">{isEditing ? '수정 저장' : '수업 추가'}</button>{isEditing && <button onClick={deleteClass} className="px-4 rounded-lg bg-red-50 text-red-700 border border-red-200 py-2 text-xs font-extrabold hover:bg-red-100">삭제</button>}</div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">빈 시간칸을 클릭하면 요일/강의실/시작시간이 자동 입력돼. 수업 박스를 클릭하면 바로 수정 모드로 들어가.</p>
          </div>
        </div>
      )}
      {activeTab === 'month' ? (
        renderMonthView()
      ) : (
        <>
          {renderMobileGrid(days, weekDates, displayTitle, displaySubTitle)}
          {renderDesktopGrid(days, weekDates, displayTitle, displaySubTitle, true)}
        </>
      )}
    </div>
  );
}
