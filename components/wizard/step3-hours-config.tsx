'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Holiday } from '@/lib/api';
import { formatDate } from '@/lib/utils-holidays';

interface Step3Props {
  holidays: Holiday[];
  onChange: (holidays: Holiday[]) => void;
}

export function Step3HoursConfig({ holidays, onChange }: Step3Props) {
  const handleHolidayChange = (
    name: string,
    field: keyof Holiday,
    value: string
  ) => {
    onChange(
      holidays.map((h) =>
        h.name === name ? { ...h, [field]: value } : h
      )
    );
  };

  const handleStatusChange = (name: string, status: Holiday['status']) => {
    onChange(
      holidays.map((h) =>
        h.name === name
          ? {
              ...h,
              status,
              open_time: status === 'special' ? h.open_time || '09:00' : undefined,
              close_time: status === 'special' ? h.close_time || '17:00' : undefined,
            }
          : h
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Configure holiday hours
        </h2>
        <p className="text-slate-600">
          Set specific hours for each holiday or mark as closed
        </p>
      </div>

      <div className="space-y-6">
        {holidays.map((holiday) => (
          <div key={holiday.name} className="border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">{holiday.name}</h3>
              <p className="text-sm text-slate-500">{formatDate(holiday.date)}</p>
            </div>

            <RadioGroup
              value={holiday.status}
              onValueChange={(value) =>
                handleStatusChange(holiday.name, value as Holiday['status'])
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="closed" id={`${holiday.name}-closed`} />
                <Label htmlFor={`${holiday.name}-closed`} className="font-normal">
                  Closed all day
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special" id={`${holiday.name}-special`} />
                <Label htmlFor={`${holiday.name}-special`} className="font-normal">
                  Special hours
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id={`${holiday.name}-normal`} />
                <Label htmlFor={`${holiday.name}-normal`} className="font-normal">
                  Normal hours
                </Label>
              </div>
            </RadioGroup>

            {holiday.status === 'special' && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <Label htmlFor={`${holiday.name}-open`}>Open Time</Label>
                  <Input
                    id={`${holiday.name}-open`}
                    type="time"
                    value={holiday.open_time || ''}
                    onChange={(e) =>
                      handleHolidayChange(holiday.name, 'open_time', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`${holiday.name}-close`}>Close Time</Label>
                  <Input
                    id={`${holiday.name}-close`}
                    type="time"
                    value={holiday.close_time || ''}
                    onChange={(e) =>
                      handleHolidayChange(holiday.name, 'close_time', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor={`${holiday.name}-notes`}>Notes (optional)</Label>
              <Textarea
                id={`${holiday.name}-notes`}
                value={holiday.notes || ''}
                onChange={(e) =>
                  handleHolidayChange(holiday.name, 'notes', e.target.value)
                }
                placeholder="e.g., Limited menu available"
                rows={2}
                className="mt-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
