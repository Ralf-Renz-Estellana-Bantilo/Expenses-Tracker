import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";

export const ComponentsContext = createContext();

function ComponentsContextProvider(props) {
   const [categoryList, setCategoryList] = useState([]);
   const [monthList, setMonthList] = useState([]);
   const [budgetList, setBudgetList] = useState([]);

   const [activeBudget, setActiveBudget] = useState({
      budgetID: 0,
      monthID: 1,
      amount: 0,
      dateFrom: "",
      dateTo: "",
      isActive: 1,
      status: 1,
   });

   const [todayExpenses, setTodaysExpenses] = useState([
      // {
      //    ID: Math.floor(Math.random() * 1000) + 1,
      //    category: "Foods & Drinks",
      //    expenses: [
      //       {
      //          ID: Math.floor(Math.random() * 1000) + 1,
      //          cost: 85,
      //          shortDescription: null,
      //          time: new Date(),
      //       },
      //    ],
      //    totalExpenses: 85,
      // },
      // {
      //    ID: Math.floor(Math.random() * 1000) + 1,
      //    category: "Transportation",
      //    expenses: [
      //       {
      //          ID: Math.floor(Math.random() * 1000) + 1,
      //          cost: 12,
      //          shortDescription: null,
      //          time: new Date(),
      //       },
      //       {
      //          ID: Math.floor(Math.random() * 1000) + 1,
      //          cost: 12,
      //          shortDescription: null,
      //          time: new Date(),
      //       },
      //    ],
      //    totalExpenses: 24,
      // },
      // {
      //    ID: Math.floor(Math.random() * 1000) + 1,
      //    category: "Load / Communication",
      //    expenses: [
      //       {
      //          cost: 105,
      //          shortDescription: "Cash-in",
      //          time: new Date(),
      //       },
      //    ],
      //    totalExpenses: 105,
      // },
   ]);
   const [previousExpenses, setPreviousExpenses] = useState([]);

   const [expenses, setExpenses] = useState(0);
   const [balance, setBalance] = useState(0);

   const fetchInsertData = async (payload) => {
      await axios
         .post("http://localhost:2022/api/insertData", payload)
         .then((response) => {
            // console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const getTodaysExpenses = async ({ budgetID }) => {
      const payload = {
         table: "expenses_view",
         filter: {
            monthID: new Date().getMonth() + 1,
            day: new Date().getDate(),
            year: new Date().getFullYear(),
            budgetID,
            status: 1,
         },
         sort: {
            expenseID: "DESC",
         },
      };
      await axios
         .post("http://localhost:2022/api/masterselect", payload)
         .then((response) => {
            setTodaysExpenses(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };
   const getBudgetList = async () => {
      const payload = {
         table: "budget",
         sort: {
            budgetID: "DESC",
         },
      };
      await axios
         .post("http://localhost:2022/api/masterselect", payload)
         .then((response) => {
            setBudgetList(response.data);
            if (response.data.length > 0) {
               const active = response.data.filter(
                  ({ isActive }) => isActive === 1
               )[0];

               setActiveBudget(active);
               getTodaysExpenses(active);
               getExpenses(active);
            }
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };
   const getExpenses = async (activeBudget) => {
      const payload = {
         table: "expenses_view",
         filter: {
            budgetID: activeBudget.budgetID,
            status: 1,
         },
      };
      const previousExpensesPayload = {
         table: "previous_expenses_view",
         filter: {
            budgetID: activeBudget.budgetID,
            status: 1,
         },
      };

      await axios
         .post("http://localhost:2022/api/masterselect", payload)
         .then((response) => {
            setPreviousExpenses(response.data);
            const { amount } = activeBudget;
            let allExpensesTotal = 0;
            response.data.forEach((expense) => {
               allExpensesTotal += Number(expense.amount);
            });

            setExpenses(allExpensesTotal);
            setBalance(amount - allExpensesTotal);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });

      await axios
         .post(
            "http://localhost:2022/api/masterselect",
            previousExpensesPayload
         )
         .then((response) => {
            const filterPreviousExpenses = response.data.filter(
               (res) => res.day != new Date().getDate()
            );
            let holdSum = 0;
            let holdPrevExpenses = Array.from(filterPreviousExpenses, (exp) => {
               holdSum += Number(exp.totalAmount);
               let progress = Math.ceil((holdSum / exp.budget) * 100);

               return {
                  ...exp,
                  progress,
               };
            });
            let reverseData = holdPrevExpenses.sort((a, b) => {
               return Number(a.expenseID) < Number(b.expense) ? 1 : -1;
            });
            setPreviousExpenses(reverseData);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const fetchMasterdata = async () => {
      const payload = {
         tables: ["categories", "months"],
      };
      await axios
         .post("http://localhost:2022/api/masterdata", payload)
         .then((response) => {
            const { categories, months } = response.data;
            setCategoryList(categories);
            setMonthList(months);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const addNewCategory = (newCategory) => {
      setCategoryList([...categoryList, newCategory]);

      const payload = {
         table: "categories",
         values: {
            category: newCategory.category,
         },
      };
      fetchInsertData(payload);
   };
   const addNewExpense = async (newExpense) => {
      const {
         categoryID,
         budgetID,
         amount,
         shortDescription,
         monthID,
         day,
         timeCreated,
         year,
      } = newExpense;

      const payload = {
         table: "expenses",
         values: {
            categoryID,
            budgetID,
            amount,
            timeCreated,
            shortDescription,
            monthID,
            day,
            year,
         },
      };
      await axios
         .post("http://localhost:2022/api/insertData", payload)
         .then((response) => {
            const { insertId } = response.data;
            const expense = { expenseID: insertId, ...newExpense };
            setTodaysExpenses([expense, ...todayExpenses]);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const addNewBudget = async (newBudget) => {
      const { monthID, amount, dateFrom, dateTo, isActive, balance } =
         newBudget;

      let previousBudget = Array.from(budgetList, (budget) => {
         return { ...budget, isActive: 0 };
      });

      let budgetPayload = {
         table: "budget",
         values: {
            monthID,
            amount,
            dateFrom,
            dateTo,
            isActive,
         },
      };
      let savingPayload = {
         table: "savings",
         values: {
            monthID,
            amount: balance,
            budgetID: activeBudget.budgetID,
            dateFrom,
            dateTo,
         },
      };

      await axios
         .post("http://localhost:2022/api/insertData", budgetPayload)
         .then((response) => {
            const { insertId } = response.data;

            const budget = { budgetID: insertId, ...newBudget };
            setActiveBudget(budget);
            setBudgetList([budget, ...previousBudget]);
            setTodaysExpenses([]);
            setPreviousExpenses([]);
            setExpenses(0);
            setBalance(Number(amount));
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });

      await axios
         .post("http://localhost:2022/api/insertData", savingPayload)
         .then((response) => {
            console.log({ response });
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   useEffect(() => {
      fetchMasterdata();
      getBudgetList();
   }, []);

   const value = {
      categoryList,
      todayExpenses,
      monthList,
      budgetList,
      activeBudget,
      expenses,
      balance,
      previousExpenses,
      addNewCategory,
      setTodaysExpenses,
      addNewExpense,
      addNewBudget,
      getExpenses,
      setActiveBudget,
      setCategoryList,
      setExpenses,
      setBalance,
   };

   return (
      <ComponentsContext.Provider value={value}>
         {props.children}
      </ComponentsContext.Provider>
   );
}

export default ComponentsContextProvider;
