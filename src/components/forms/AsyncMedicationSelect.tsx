'use client';

import { useMedicationSearch } from '@/hooks/useMedicationSearch';
import { useDebounce } from 'use-debounce'; // Debounce utility to limit rapid API calls
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

  // Fetch matching medications only when query is 2+ characters
  const { data = [], isLoading } = useMedicationSearch(
    debouncedQuery.length >= 2 ? debouncedQuery : ''
  );

  // Setting the medication with useState
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(initialValue ?? null);

  useEffect(() => {
    // If initialValue matches current field value, set it as selected
    if (initialValue && field.value === initialValue._id) {
      setSelectedMedication(initialValue);
      return;
    }

    // If field has a value (e.g. loaded from form), find the matching medication in fetched results
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

  // if user types - show current query, if not show the selected med name
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
    </div>
  );
}
