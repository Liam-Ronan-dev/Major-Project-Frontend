'use client';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation } from '@tanstack/react-query';

// API Calls
import {
  getMedications,
  getPatients,
  getPharmacists,
  createPrescription,
} from '@/lib/api';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Zod Schemas
const dosageSchema = z.object({
  medicationId: z.string().min(1),
  amount: z.string().min(1),
  frequency: z.string().min(1),
  duration: z.string().min(1),
  notes: z.string().optional(),
});

const itemSchema = z.object({
  medications: z.array(z.string().min(1)).min(1), // ✅ MULTIPLE ALLOWED
  specificInstructions: z.string().min(1),
  dosages: z.array(dosageSchema),
});

const prescriptionSchema = z.object({
  pharmacistId: z.string().min(1),
  patientId: z.string().min(1),
  pharmacyName: z.string().min(1),
  generalInstructions: z.string().min(1),
  repeats: z.coerce.number().int().min(1),
  notes: z.string().optional(),
  items: z.array(itemSchema),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;

export function CreatePrescriptionForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      pharmacyName: '',
      generalInstructions: '',
      repeats: 1,
      notes: '',
      items: [
        {
          medications: [''],
          specificInstructions: '',
          dosages: [
            {
              medicationId: '',
              amount: '',
              frequency: '',
              duration: '',
              notes: '',
            },
          ],
        },
      ],
    },
  });

  const { fields: itemFields, append: appendItem } = useFieldArray({
    control,
    name: 'items',
  });

  // Pre-create all dosage field arrays for each item
  const dosageFieldArrays = itemFields.map((_, index) =>
    useFieldArray({ control, name: `items.${index}.dosages` as const })
  );

  const { data: pharmacists = [] } = useQuery({
    queryKey: ['pharmacists'],
    queryFn: getPharmacists,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  const { data: medications = [] } = useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
  });

  const prescriptionMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      alert('Prescription created!');
    },
    onError: () => {
      alert('Error creating prescription.');
    },
  });

  const onSubmit = (data: PrescriptionFormData) => {
    console.log('Submitting Prescription:', data);
    prescriptionMutation.mutate(data);
  };

  console.log('Form errors:', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: General Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <Label>Pharmacist</Label>
          <Controller
            control={control}
            name="pharmacistId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pharmacist" />
                </SelectTrigger>
                <SelectContent>
                  {pharmacists.map((pharmacist) => (
                    <SelectItem key={pharmacist._id} value={pharmacist._id}>
                      {pharmacist.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Label>Patient</Label>
          <Controller
            control={control}
            name="patientId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient._id} value={patient._id}>
                      {patient.firstName} {patient.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Label>Pharmacy Name</Label>
          <Input {...register('pharmacyName')} />

          <Label>General Instructions</Label>
          <Textarea {...register('generalInstructions')} />

          <Label>Repeats</Label>
          <Input type="number" {...register('repeats')} />

          <Label>Notes</Label>
          <Textarea {...register('notes')} />
        </div>

        {/* RIGHT COLUMN: Items */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-lg font-bold">Prescription Items</h3>

          {itemFields.map((item, index) => {
            const dosageArray = dosageFieldArrays[index];

            const medArray = useFieldArray({
              control,
              name: `items.${index}.medications` as const,
            });

            return (
              <div key={item.id} className="border p-4 rounded space-y-4">
                <Label>Specific Instructions</Label>
                <Textarea
                  {...register(`items.${index}.specificInstructions`)}
                />

                <Label>Medication</Label>
                {medArray.fields.map((med, medIndex) => (
                  <Controller
                    key={med.id}
                    control={control}
                    name={`items.${index}.medications.${medIndex}`}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select medication" />
                        </SelectTrigger>
                        <SelectContent>
                          {medications.map((m) => (
                            <SelectItem key={m._id} value={m._id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => medArray.append('')}
                >
                  Add Medication
                </Button>

                <h4 className="font-medium">Dosages</h4>
                {dosageArray.fields.map((dose, dIndex) => (
                  <div
                    key={dose.id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    <Label>Medication</Label>
                    <Controller
                      control={control}
                      name={`items.${index}.dosages.${dIndex}.medicationId`}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            {medications.map((m) => (
                              <SelectItem key={m._id} value={m._id}>
                                {m.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.amount`)}
                      placeholder="Amount"
                    />
                    <Input
                      {...register(
                        `items.${index}.dosages.${dIndex}.frequency`
                      )}
                      placeholder="Frequency"
                    />
                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.duration`)}
                      placeholder="Duration"
                    />
                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.notes`)}
                      placeholder="Notes"
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() =>
                    dosageArray.append({
                      medicationId: '',
                      amount: '',
                      frequency: '',
                      duration: '',
                      notes: '',
                    })
                  }
                >
                  Add Dosage
                </Button>
              </div>
            );
          })}

          <Button
            type="button"
            onClick={() =>
              appendItem({
                medications: [''],
                specificInstructions: '',
                dosages: [
                  {
                    medicationId: '',
                    amount: '',
                    frequency: '',
                    duration: '',
                    notes: '',
                  },
                ],
              })
            }
          >
            Add Item
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full lg:w-fit"
        disabled={prescriptionMutation.isPending}
      >
        {prescriptionMutation.isPending
          ? 'Submitting...'
          : 'Submit Prescription'}
      </Button>
    </form>
  );
}
