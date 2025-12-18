import { Holiday } from './api';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getHolidayStatus(holiday: Holiday): {
  icon: string;
  text: string;
  color: string;
} {
  if (holiday.status === 'closed') {
    return {
      icon: '🔒',
      text: 'Closed',
      color: 'text-red-600',
    };
  }
  if (holiday.status === 'special' && holiday.open_time && holiday.close_time) {
    return {
      icon: '⏰',
      text: `${formatTime(holiday.open_time)} - ${formatTime(holiday.close_time)}`,
      color: 'text-blue-600',
    };
  }
  return {
    icon: '✓',
    text: 'Normal Hours',
    color: 'text-green-600',
  };
}

export function sortHolidaysByDate(holidays: Holiday[]): Holiday[] {
  return [...holidays].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function isUpcomingHoliday(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const holidayDate = new Date(dateString);
  holidayDate.setHours(0, 0, 0, 0);
  return holidayDate >= today;
}
