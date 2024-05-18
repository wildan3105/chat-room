export const baseSchema = {
  create_date: { type: Date, required: false },
  update_date: { type: Date, required: false },
  is_delete: { type: Boolean, default: false, required: false },
};
