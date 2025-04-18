'use client';

import { useMedicationSearch } from '@/hooks/useMedicationSearch';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command';

type Medication = {
  _id: string;
  name: string;
};

type Props = {
  field: ControllerRenderProps<any, any>;
  initialValue?: Medication;
  disabled?: boolean;
  onLabelChange?: (name: string) => void;
};

export function AsyncMedicationSelect({
  field,
  initialValue,
  disabled,
  onLabelChange,
}: Props) {
  const [query, setQuery] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data = [], isLoading } = useMedicationSearch(
    debouncedQuery.length >= 2 ? debouncedQuery : ''
  );

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(initialValue ?? null);

  useEffect(() => {
    if (initialValue && field.value === initialValue._id) {
      setSelectedMedication(initialValue);
      return;
    }

    if (!selectedMedication && field.value) {
      const match = data.find((m) => m._id === field.value);
      if (match) setSelectedMedication(match);
    }
  }, [data, field.value, initialValue, selectedMedication]);

  const handleSelect = (med: Medication) => {
    field.onChange(med._id);
    onLabelChange?.(med.name);
    setSelectedMedication(med);
    setQuery('');
    setHasInteracted(false);
  };

  const displayValue =
    hasInteracted || query.length > 0
      ? query
      : (selectedMedication?.name ?? '');

  return (
    <div className="space-y-2">
      <Command className="rounded-md border shadow-sm">
        <CommandInput
          disabled={disabled}
          value={displayValue}
          onValueChange={(val) => {
            setQuery(val);
            if (!hasInteracted) setHasInteracted(true);
          }}
          placeholder="Search medications..."
          className="placeholder:text-muted-foreground"
        />
        <CommandList>
          {isLoading && <CommandItem disabled>Loading...</CommandItem>}

          {hasInteracted &&
            debouncedQuery.length >= 2 &&
            !isLoading &&
            data.length === 0 && (
              <CommandEmpty>No medications found.</CommandEmpty>
            )}

          {data.map((med) => (
            <CommandItem
              key={med._id}
              value={med.name}
              onSelect={() => handleSelect(med)}
            >
              {med.name}
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      {selectedMedication && (
        <div className="text-md font-medium">
          Selected:{' '}
          <span className="font-semibold">{selectedMedication.name}</span>
        </div>
      )}
    </div>
  );
}
