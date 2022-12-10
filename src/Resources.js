export class Resources {
   formatMoney = (salary) => {
      salary = `${salary}`;
      let formatedSalary = "";

      try {
         for (let a = 1; a <= salary.length; a++) {
            if (
               salary.length - a === 3 ||
               salary.length - a === 6 ||
               salary.length - a === 9 ||
               salary.length - a === 12 ||
               salary.length - a === 15 ||
               salary.length - a === 18 ||
               salary.length - a === 21
            ) {
               formatedSalary += salary[a - 1] + ",";
            } else {
               formatedSalary += salary[a - 1];
            }
         }
      } catch (error) {}
      return formatedSalary;
   };
}

export default new Resources();
