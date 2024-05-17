const modelSavedSuccessfully = (modelName: string) => {
  return `The ${modelName} Has Been Saved Successfully.`;
};

const modelUpdatedSuccessfully = (modelName: string) => {
  return `The ${modelName} Has Been Updated Successfully.`;
};

const modelDeletedSuccessfully = (modelName: string) => {
  return `The ${modelName} Has Been Deleted Successfully.`;
};

const modelNotFound = (modelName: string) => {
  return `The ${modelName} Cannot Be Found.`;
};

export const messages = {
  modelSavedSuccessfully,
  modelUpdatedSuccessfully,
  modelDeletedSuccessfully,
  modelNotFound,
};
