export type Prescription = {
  _id: string;
  doctorId: string;
  pharmacistId: string;
  patientId: string;
  prescriptionId: string;
  pharmacyName: string;
  repeats: number;
  generalInstructions: string;
  status: 'Pending' | 'Processed' | 'Completed' | 'Cancelled';
  notes: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
};

export type Item = {
  _id: string;
  prescriptionId: string;
  specificInstructions: string;
  medications: Medication[];
  dosages: Dosage[];
};

export type Medication = {
  _id: string;
  name: string;
  form: string;
  stock: number;
  supplier: string;
  price: number;
  pharmacistId: string;
};

export type Dosage = {
  _id: string;
  itemId: string;
  medicationId: string;
  amount: string;
  frequency: string;
  duration: string;
  notes?: string;
};
