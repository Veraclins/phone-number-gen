import storage from '../storage';
import response from '../helpers/response';

const generateUniqueNumber = () => {
  const number = Math.floor(Math.random() * 900000000) + 100000000;
  const phoneNumber = `0${number}`;
  if (storage.includes(phoneNumber)) return generateUniqueNumber();
  storage.push(phoneNumber);
  return phoneNumber;
};

const findMinMax = array => {
  const integerArray = array.map(Number);
  let min = integerArray[0];
  let max = integerArray[0];

  for (let i = 1; i < integerArray.length; i++) {
    const current = integerArray[i];
    min = current < min ? current : min;
    max = current > max ? current : max;
  }

  return { min, max };
};

const generateOne = async res => {
  const number = await generateUniqueNumber();
  return res.status(201).json(
    response.success('Phone number', 'generated', {
      number,
    })
  );
};

const generateMany = async (res, number) => {
  const numbers = [];
  for (let index = 0; index < number; index++) {
    // eslint-disable-next-line no-await-in-loop
    const newNumber = await generateUniqueNumber();
    numbers.push(newNumber);
  }
  return res.status(201).json(
    response.success('Phone numbers', 'generated', {
      numbers,
    })
  );
};

export default {
  generate: async (req, res) => {
    const { number } = req.query;
    if (number > 1) return generateMany(res, number);
    return generateOne(res);
  },

  fetchAll: async (req, res, next) => {
    const numbers = storage;
    if (numbers.length < 1) {
      return next(response.empty('phone numbers'));
    }
    return res.status(200).json(
      response.success('All phone numbers', 'fetched', {
        total: numbers.length,
        numbers,
      })
    );
  },

  sort: async (req, res, next) => {
    const { desc } = req.query;
    const numbers = storage;

    if (numbers.length < 1) {
      return next(response.empty('phone numbers'));
    }
    const { min, max } = findMinMax(numbers);
    const minimum = `0${min}`;
    const maximum = `0${max}`;
    if (desc) {
      numbers.sort((a, b) => b - a);
    } else {
      numbers.sort((a, b) => a - b);
    }

    return res
      .status(200)
      .json(
        response.success(
          'Phone numbers',
          `sorted in ${desc ? 'descending' : 'ascending'} order`,
          { minimum, maximum, numbers }
        )
      );
  },

  refresh: async (req, res, next) => {
    storage.length = 0;
    return res.status(200).json(response.success('Storage', 'refreshed'));
  },
};
