'use client';

import { useMedicationSearch } from '@/hooks/useMedicationSearch';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command';
import { ControllerRenderProps } from 'react-hook-form';

type Medication = {
  _id: string;
  name: string;
};

type Props = {
  field: ControllerRenderProps<any, any>;
};

export function AsyncMedicationSelect({ field }: Props) {
  const [query, setQuery] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [debounced] = useDebounce(query, 300);

  const { data = [], isLoading } = useMedicationSearch(
    debounced.length >= 2 ? debounced : ''
  );

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);

  useEffect(() => {
    const current = data.find((m) => m._id === field.value);
    if (current) setSelectedMedication(current);
  }, [data, field.value]);

  return (
    <div className="space-y-2">
      <Command className="rounded-md border shadow-sm">
        <CommandInput
          value={query}
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
            query.length >= 2 &&
            !isLoading &&
            data.length === 0 &&
            !selectedMedication && (
              <CommandEmpty>No medications found.</CommandEmpty>
            )}

          {data.map((med) => (
            <CommandItem
              key={med._id}
              value={med.name}
              onSelect={() => {
                field.onChange(med._id);
                setSelectedMedication(med);
                setQuery('');
              }}
            >
              {med.name}
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      {selectedMedication && (
        <div className="text-sm text-muted-foreground">
          Selected:{' '}
          <span className="font-medium">{selectedMedication.name}</span>
        </div>
      )}
    </div>
  );
}
