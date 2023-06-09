export const grades = [
  "I",
  "II",
  "III",
  "III+",
  "IV",
  "IV+",
  "V-",
  "V",
  "V+",
  "VI-",
  "VI",
  "VI+",
  "VI+/1",
  "VI.1",
  "VI.1+",
  "VI.1+/2",
  "VI.2",
  "VI.2/2+",
  "VI.2+",
  "VI.2+/3",
  "VI.3",
  "VI.3/3+",
  "VI.3+",
  "VI.3+/4",
  "VI.4",
  "VI.4/4+",
  "VI.4+",
  "VI.4+/5",
  "VI.5",
  "VI.5/5+",
  "VI.5+",
  "VI.5+/6",
  "VI.6",
  "VI.6/6+",
  "VI.6+",
  "VI.6+/7",
];

export function isInGradeRange(gradeString, rangeInt) {
  const index = grades.indexOf(gradeString);
  return index >= rangeInt[0] && index <= rangeInt[1];
}
