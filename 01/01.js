const fs = require('fs');

const file = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' });
const measurements = file.split('\n');

const findAllNumbersInString = (string) => {
  return string.split('').filter((char) => !isNaN(Number(char)));
};

const applyCalibration = (total, calibration, transformation) => {
  const transformedCalibration = transformation(calibration);
  const numbers = findAllNumbersInString(transformedCalibration);
  return (
    total + (Number(numbers[0]) * 10 + Number(numbers[numbers.length - 1]))
  );
};

const numbersMap = {
  one: 'o1e',
  two: 't2o',
  three: 't3e',
  four: 'f4r',
  five: 'f5e',
  six: 's6x',
  seven: 's7n',
  eight: 'e8t',
  nine: 'n9e',
};

const replaceNumberString = (string) => {
  for (const [key, value] of Object.entries(numbersMap)) {
    string = string.replaceAll(key, value);
  }
  return string;
};

const calibrationValue = measurements.reduce(
  (total, calibration) => applyCalibration(total, calibration, (x) => x),
  0
);

const accurateCalibrationValue = measurements.reduce(
  (total, calibration) =>
    applyCalibration(total, calibration, replaceNumberString),
  0
);

console.log('Part One Result:', calibrationValue);
console.log('Part Two Result:', accurateCalibrationValue);
