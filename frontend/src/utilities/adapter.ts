import { validate } from './validate';

const convertObjectCamelToSnack = (source: any): any => {
  const result: any = {};

  if (source instanceof Array) {
    return source.map((value) => {
      if (typeof value === 'object') {
        value = convertObjectCamelToSnack(value);
      }

      return value;
    });
  } else {
    for (const origKey in source) {
      if (source.hasOwnProperty(origKey)) {
        let value: any;

        let newKey: string = '';
        for (const char of origKey) {
          if (char === char.toUpperCase()) {
            newKey += '_' + char.toLowerCase();
          } else {
            newKey += char;
          }
        }

        value = source[origKey];
        if (
          value instanceof Array ||
          (value !== null &&
            value !== undefined &&
            value.constructor === Object)
        ) {
          value = convertObjectCamelToSnack(value);
        }

        const isJsonString = validate.isJsonString(value);
        if (isJsonString) {
          const json = JSON.parse(value);

          value = JSON.stringify(convertObjectCamelToSnack(json));
        }

        result[newKey] = value;
      }
    }
  }

  return result;
};

export const adapter = {
  convertObjectCamelToSnack,
};
