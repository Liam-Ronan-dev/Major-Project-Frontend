import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import {
  PrescriptionFormData,
  prescriptionSchema,
} from '@/validations/prescriptionSchema';

import { createPrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { useMedications } from '@/hooks/useMedications';
import { usePharmacists } from '@/hooks/usePharmacists';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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

  const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="text-sm text-red-500">{message}</p> : null;

  const { fields: itemFields } = useFieldArray({
    control,
    name: 'items',
  });

  // Pre-create all dosage field arrays for each item
  const dosageFieldArrays = itemFields.map((_, index) =>
    useFieldArray({ control, name: `items.${index}.dosages` as const })
  );

  const { data: patients = [] } = usePatients();
  const { data: medications = [] } = useMedications();
  const { data: pharmacists = [] } = usePharmacists();

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
          <FieldError message={errors.pharmacistId?.message} />

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
          <FieldError message={errors.patientId?.message} />

          <Label>Pharmacy Name</Label>
          <Input {...register('pharmacyName')} />
          <FieldError message={errors.pharmacyName?.message} />

          <Label>General Instructions</Label>
          <Textarea {...register('generalInstructions')} />
          <FieldError message={errors.generalInstructions?.message} />

          <Label>Repeats</Label>
          <Input type="number" {...register('repeats')} />
          <FieldError message={errors.repeats?.message} />

          <Label>Notes</Label>
          <Textarea {...register('notes')} />
          <FieldError message={errors.notes?.message} />
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
                <FieldError
                  message={errors.items?.[index]?.specificInstructions?.message}
                />

                <Label>Medication</Label>
                {medArray.fields.map((med, medIndex) => (
                  <>
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
                    <FieldError
                      message={
                        errors.items?.[index]?.medications?.[medIndex]?.message
                      }
                    />
                  </>
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
                    <FieldError
                      message={
                        errors.items?.[index]?.dosages?.[dIndex]?.medicationId
                          ?.message
                      }
                    />

                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.amount`)}
                      placeholder="Amount"
                    />
                    <FieldError
                      message={
                        errors.items?.[index]?.dosages?.[dIndex]?.amount
                          ?.message
                      }
                    />

                    <Input
                      {...register(
                        `items.${index}.dosages.${dIndex}.frequency`
                      )}
                      placeholder="Frequency"
                    />
                    <FieldError
                      message={
                        errors.items?.[index]?.dosages?.[dIndex]?.frequency
                          ?.message
                      }
                    />
                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.duration`)}
                      placeholder="Duration"
                    />
                    <FieldError
                      message={
                        errors.items?.[index]?.dosages?.[dIndex]?.duration
                          ?.message
                      }
                    />
                    <Input
                      {...register(`items.${index}.dosages.${dIndex}.notes`)}
                      placeholder="Notes"
                    />
                    <FieldError
                      message={
                        errors.items?.[index]?.dosages?.[dIndex]?.notes?.message
                      }
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
