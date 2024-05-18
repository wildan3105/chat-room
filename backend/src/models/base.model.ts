export const baseSchema = {
  created_date: { type: Date, required: false },
  updated_date: { type: Date, required: false },
  is_delete: { type: Boolean, default: false, required: false },
};
