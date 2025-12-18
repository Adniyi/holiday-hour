'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BUSINESS_TYPES } from '@/lib/constants';

interface Step1Data {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
}

interface Step1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
}

export function Step1BusinessInfo({ data, onChange }: Step1Props) {
  const handleChange = (field: keyof Step1Data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Tell us about your business
        </h2>
        <p className="text-slate-600">
          This information will be displayed on your holiday hours page
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="required">
            Business Name *
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Sarah's Café"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="required">
            Contact Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            required
            className="mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">
            We'll send your edit link here
          </p>
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address">Address (optional)</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="123 Main St, City, State"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="type">Business Type (optional)</Label>
          <Select value={data.type} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
