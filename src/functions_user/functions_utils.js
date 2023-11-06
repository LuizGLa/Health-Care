export async function conversionDateForAge(yearBirth, month, day) {
  /* eslint-disable */
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const age = currentYear - yearBirth;

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }
  return age;
}

export async function  basalRateCalculator(age, height, gender, weight) {
  let brc;
  height = height * 100;
  weight = Math.round(weight);

  if (gender === 'Masculino' || 'Male') {
      brc = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) ;
  } else if (gender === 'Feminino' || 'Female') {
      brc = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }


  return brc
 }
