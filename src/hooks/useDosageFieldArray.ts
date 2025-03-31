import { useFieldArray, UseFieldArrayProps } from 'react-hook-form';

export function useDosageFieldArray<TFieldValues = any>(
  props: UseFieldArrayProps<TFieldValues>
) {
  return useFieldArray<TFieldValues>(props);
}
