const isJsonString = (json: string): boolean => {
  try {
    const jsonPare = JSON.parse(json);
    return typeof jsonPare === 'object';
  } catch (e) {
    return false;
  }
};

export const validate = {
  isJsonString,
};
