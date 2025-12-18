'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, X } from 'lucide-react';
import { PRESET_HOLIDAYS } from '@/lib/constants';
import { Holiday } from '@/lib/api';

interface Step2Props {
  selectedHolidays: Holiday[];
  onChange: (holidays: Holiday[]) => void;
}

export function Step2HolidaySelection({ selectedHolidays, onChange }: Step2Props) {
  const [customName, setCustomName] = useState('');
  const [customDate, setCustomDate] = useState('');

  const handlePresetToggle = (holiday: typeof PRESET_HOLIDAYS[0]) => {
    const exists = selectedHolidays.find((h) => h.name === holiday.name);
    if (exists) {
      onChange(selectedHolidays.filter((h) => h.name !== holiday.name));
    } else {
      onChange([
        ...selectedHolidays,
        {
          name: holiday.name,
          date: holiday.date,
          status: 'closed',
        },
      ]);
    }
  };

  const handleAddCustom = () => {
    if (customName && customDate) {
      onChange([
        ...selectedHolidays,
        {
          name: customName,
          date: customDate,
          status: 'closed',
        },
      ]);
      setCustomName('');
      setCustomDate('');
    }
  };

  const handleRemove = (name: string) => {
    onChange(selectedHolidays.filter((h) => h.name !== name));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Select your holidays
        </h2>
        <p className="text-slate-600">
          Choose from common holidays or add your own custom dates
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Common Holidays</h3>
          <div className="grid gap-3">
            {PRESET_HOLIDAYS.map((holiday) => {
              const isSelected = selectedHolidays.some(
                (h) => h.name === holiday.name
              );
              return (
                <div
                  key={holiday.name}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    id={holiday.name}
                    checked={isSelected}
                    onCheckedChange={() => handlePresetToggle(holiday)}
                  />
                  <Label
                    htmlFor={holiday.name}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    <div className="flex justify-between items-center">
                      <span>{holiday.name}</span>
                      <span className="text-sm text-slate-500">
                        {new Date(holiday.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-slate-900 mb-3">
            Add Custom Holiday
          </h3>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Holiday name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>
            <div className="w-40">
              <Input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>
            <Button
              onClick={handleAddCustom}
              disabled={!customName || !customDate}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {selectedHolidays.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-slate-900 mb-3">
              Selected Holidays ({selectedHolidays.length})
            </h3>
            <div className="space-y-2">
              {selectedHolidays.map((holiday) => (
                <div
                  key={holiday.name}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{holiday.name}</span>
                    <span className="text-sm text-slate-600">
                      {new Date(holiday.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(holiday.name)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
