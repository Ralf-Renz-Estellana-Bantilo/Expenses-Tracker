import React, { useContext, useEffect, useState } from "react";
import SAVINGSICON from "../assets/savings.svg";
import ProgressBar from "../components/ProgressBar";
import Dialog from "../components/Dialog";
import { XCircleIcon } from "@heroicons/react/solid";
import { Combobox, Listbox } from "@headlessui/react";
import Dropdown from "../components/Dropdown";
import TextField from "../components/Textfield";
import { ComponentsContext } from "../contexts/ComponentsContext";
import axios from "axios";
import Resources from "../Resources";
import { SelectPicker } from "rsuite";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AppConfiguration from "../AppConfiguration";

const LIST_LIMIT = 4;

const Home = () => {
   const {
      categoryList,
      todayExpenses,
      setTodaysExpenses,
      addNewExpense,
      monthList,
      activeBudget,
      previousExpenses,
      setExpenses,
      setBalance,
      expenses,
      balance,
      // getExpenses,
   } = useContext(ComponentsContext);

   const [isShowDialog, setShowDialog] = useState(false);
   const [isShowExpenseDialog, setShowExpenseDialog] = useState(false);
   const [isShowPreviousExpenseDialog, setShowPreviousExpenseDialog] =
      useState(false);

   const [previousExpensesList, setPreviousExpensesList] = useState([]);

   // dialog fields ---------
   const [cost, setCost] = useState();
   const [shortDescription, setShortDescription] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState({
      categoryID: 0,
      option: "Select Categories",
      unavailable: true,
   });
   const [previewCost, setPreviewCost] = useState(null);
   const [previewShortDescription, setPreviewShortDescription] = useState(null);
   const [previewSelectedCategory, setPreviewSelectedCategory] = useState(null);
   const [previewExpenseID, setPreviewExpenseID] = useState(null);

   const [todaysTotalExpenses, setTodaysTotalExpenses] = useState(0);
   const [previousTotalExpenses, setPreviousTotalExpenses] = useState(0);

   // const [expenses, setExpenses] = useState(0);
   // const [balance, setBalance] = useState(0);

   const [prevExpensesListLimit, setPrevExpensesListLimit] = useState(4);
   const [isSeeMore, setIsSeeMore] = useState(true);

   const refactorCategoryList = () => {
      let listResult = Array.from(categoryList, ({ category, categoryID }) => {
         return {
            categoryID,
            option: category,
            unavailable: false,
         };
      });

      const result = [
         { categoryID: 0, option: "Select Categories", unavailable: true },
         ...listResult,
      ];

      return result;
   };

   const cancel = () => {
      setCost(null);
      setShortDescription(null);
      setSelectedCategory({
         categoryID: 0,
         option: "Select Categories",
         unavailable: true,
      });
      setShowDialog(false);
   };

   const addTodaysExpenses = () => {
      const { option, categoryID } = selectedCategory;
      const { budgetID, amount } = activeBudget;

      try {
         if (categoryID !== 0 || (`${cost}`.length !== 0 && Number(cost) > 0)) {
            const minute =
               new Date().getMinutes() > 9
                  ? new Date().getMinutes()
                  : `0${new Date().getMinutes()}`;

            const hour =
               new Date().getHours() > 9
                  ? new Date().getHours()
                  : `0${new Date().getHours()}`;

            const newExpense = {
               categoryID,
               category: option,
               budgetID,
               budget: Number(amount),
               amount: Number(cost),
               shortDescription,
               timeCreated: hour + ":" + minute,
               monthID: new Date().getMonth() + 1,
               month: monthList[new Date().getMonth()].description,
               day: new Date().getDate(),
               year: new Date().getFullYear(),
            };

            addNewExpense(newExpense);
            setCost(null);
            setShortDescription(null);
            setSelectedCategory({
               categoryID: 0,
               option: "Select Categories",
               unavailable: true,
            });
            setShowDialog(false);
         }
      } catch (error) {
         alert(error);
      }
   };

   const getExpenses = async () => {
      const payload = {
         table: "expenses_view",
         column: "amount",
         filter: {
            budgetID: activeBudget.budgetID,
            status: 1,
         },
      };
      await axios
         .post(`${AppConfiguration.url()}/api/masterselect`, payload)
         .then((response) => {
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
   };

   const previewExpense = (expense) => {
      const { categoryID, category, amount, shortDescription, expenseID } =
         expense;

      console.log({ expense });

      setPreviewExpenseID(expenseID);
      setPreviewCost(Number(amount));
      setPreviewShortDescription(shortDescription);
      setPreviewSelectedCategory({
         categoryID,
         option: category,
         unavailable: true,
      });
      setShowExpenseDialog(true);
   };

   const updateExpense = async () => {
      const { option, categoryID } = previewSelectedCategory;
      axios
         .put(`${AppConfiguration.url()}/api/updateData`, {
            table: "expenses",
            values: {
               categoryID: categoryID,
               amount: previewCost,
               shortDescription: previewShortDescription,
            },
            key: {
               expenseID: previewExpenseID,
            },
         })
         .then((response) => {
            console.log(response);
            setTodaysExpenses(
               todayExpenses.map((expense) =>
                  expense.expenseID === previewExpenseID
                     ? {
                          ...expense,
                          categoryID,
                          category: option,
                          amount: previewCost,
                          shortDescription: previewShortDescription,
                       }
                     : expense
               )
            );
            getExpenses();
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
      setShowExpenseDialog(false);
   };

   const deleteExpense = () => {
      axios
         .put(`${AppConfiguration.url()}/api/updateData`, {
            table: "expenses",
            values: {
               status: 0,
            },
            key: {
               expenseID: previewExpenseID,
            },
         })
         .then((response) => {
            console.log({ response });
            const expenses = todayExpenses.filter(
               (exp) => Number(exp.expenseID) !== Number(previewExpenseID)
            );
            setShowExpenseDialog(false);
            setTodaysExpenses(expenses);
            setExpenses(Number(expenses) - Number(previewCost));
            setBalance(Number(balance) + Number(previewCost));
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const previewPreviousExpense = async (prevExpense) => {
      const { monthID, day, year } = prevExpense;
      const payload = {
         table: "expenses_view",
         filter: {
            monthID,
            day,
            year,
            status: 1,
         },
         sort: {
            expenseID: "DESC",
         },
      };
      await axios
         .post(`${AppConfiguration.url()}/api/masterselect`, payload)
         .then((response) => {
            setPreviousExpensesList(response.data);

            let sum = 0;
            for (let a = 0; a < response.data.length; a++) {
               const { amount } = response.data[a];
               sum += Number(amount);
            }

            setPreviousTotalExpenses(sum);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
      setShowPreviousExpenseDialog(true);
   };

   useEffect(() => {
      let sum = 0;
      todayExpenses.forEach(({ amount }) => {
         return (sum += Number(amount));
      });

      getExpenses();
      setTodaysTotalExpenses(sum);
   }, [todayExpenses]);

   useEffect(() => {
      if (isSeeMore) {
         setPrevExpensesListLimit(LIST_LIMIT);
      } else {
         setPrevExpensesListLimit(previousExpenses.length);
      }
   }, [isSeeMore]);

   return (
      <>
         {isShowDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Add Expense</h5>
                     <XCircleIcon
                        onClick={() => setShowDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <Dropdown
                           lists={refactorCategoryList()}
                           selected={selectedCategory}
                           setSelected={setSelectedCategory}
                        />
                        {/* <div>
                           <Swiper
                              modules={[
                                 Navigation,
                                 Pagination,
                                 Scrollbar,
                                 A11y,
                              ]}
                              spaceBetween={10}
                              slidesPerView={1}
                              pagination={{ clickable: true }}
                              onSwiper={(swiper) => console.log({ swiper })}
                              onSlideChange={({ activeIndex }) =>
                                 console.log(activeIndex)
                              }
                           >
                              {refactorCategoryList().map((category, i) => {
                                 return (
                                    <SwiperSlide key={i}>
                                       <div className="flex items-center justify-center h-24 border-2 border-gray-400 rounded-md bg-white">
                                          <h3 className="text-lg">
                                             {category.option}
                                          </h3>
                                       </div>
                                    </SwiperSlide>
                                 );
                              })}
                           </Swiper>
                        </div> */}
                        <input
                           placeholder="Amount"
                           value={cost}
                           type="number"
                           onChange={(e) => setCost(e.target.value)}
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={(e) =>
                              e.key === "Enter" && addTodaysExpenses()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition text-base`}
                        />
                        <input
                           placeholder={"Short Description"}
                           value={shortDescription}
                           type="text"
                           onChange={(e) => setShortDescription(e.target.value)}
                           onKeyDown={(e) =>
                              e.key === "Enter" && addTodaysExpenses()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition text-base`}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism"
                        onClick={cancel}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={addTodaysExpenses}
                     >
                        Save
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         {isShowExpenseDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Preview Expense</h5>
                     <XCircleIcon
                        onClick={() => setShowExpenseDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <Dropdown
                           lists={refactorCategoryList()}
                           selected={previewSelectedCategory}
                           setSelected={setPreviewSelectedCategory}
                        />
                        <input
                           placeholder="Amount"
                           value={previewCost}
                           type="number"
                           onChange={(e) => setPreviewCost(e.target.value)}
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={(e) =>
                              e.key === "Enter" && addTodaysExpenses()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                        <input
                           placeholder={"Short Description"}
                           value={previewShortDescription}
                           type="text"
                           onChange={(e) =>
                              setPreviewShortDescription(e.target.value)
                           }
                           onKeyDown={(e) =>
                              e.key === "Enter" && addTodaysExpenses()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                        onClick={deleteExpense}
                     >
                        Delete
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={updateExpense}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         {isShowPreviousExpenseDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>{`${previousExpensesList[0].month} ${previousExpensesList[0].day}, ${previousExpensesList[0].year}`}</h5>
                     <XCircleIcon
                        onClick={() => setShowPreviousExpenseDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset overflow-y-scroll max-h-[60vh]">
                        <>
                           {previousExpensesList.map((prevExpense, i) => {
                              return (
                                 <div
                                    key={i}
                                    className="flex items-center justify-between w-full p-2 rounded-md neumorphism bg-[#03305f25]"
                                 >
                                    <div className="flex flex-col">
                                       <h5 className="font-semibold text-base text-main-accent dark:text-dark-accent-main">
                                          {prevExpense.category}
                                       </h5>
                                       <p className="text-sm text-secondary-accent dark:text-dark-secondary-accent">
                                          {prevExpense.shortDescription}
                                       </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                       <span className="text-base font-bold text-rose-600">
                                          - ₱
                                          {Resources.formatMoney(
                                             prevExpense.amount
                                          )}
                                       </span>
                                       <p className="text-sm text-secondary-accent dark:text-dark-secondary-accent">
                                          {prevExpense.timeCreated}
                                       </p>
                                    </div>
                                 </div>
                              );
                           })}
                        </>
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <div className="flex items-center justify-between p-2 rounded-lg inset w-full bg-[#9f123a1c]">
                        <p className="text-sm font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                           Total:
                        </p>
                        <span className="text-base font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                           ₱{Resources.formatMoney(previousTotalExpenses)}
                        </span>
                     </div>
                  </div>
               </div>
            </Dialog>
         )}

         <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 p-3 neumorphism-container">
               <h4 className="text-lg font-semibold text-main-accent dark:text-dark-accent-main dark:text-dark-main-accent">
                  DASHBOARD
               </h4>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <p className="text-base font-medium text-secondary-accent dark:text-dark-secondary-accent">
                           Wallet balance
                        </p>
                        <p className="text-sm m-0 text-secondary-accent dark:text-dark-secondary-accent">
                           {activeBudget.dateFrom} - {activeBudget.dateTo}
                        </p>
                     </div>
                     <h3 className="font-semibold text-main-accent dark:dark-text-accent-main">
                        ₱{Resources.formatMoney(balance)}
                     </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="flex p-2 flex-1 bg-[#065f461c] rounded-lg justify-between items-center inset">
                        <p className="text-base font-medium text-secondary-accent dark:text-dark-secondary-accent">
                           Budget
                        </p>
                        <h5 className="font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                           ₱{Resources.formatMoney(activeBudget.amount)}
                        </h5>
                     </div>
                     <div className="flex justify-between items-center flex-1 p-2 bg-[#9f123a1c] rounded-lg inset">
                        <p className="text-base font-medium text-secondary-accent dark:text-dark-secondary-accent">
                           Expenses
                        </p>
                        <h5 className="font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                           ₱{Resources.formatMoney(expenses)}
                        </h5>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent dark:text-dark-accent-main">
                     TODAY'S EXPENSES
                  </h4>
                  <button
                     className="w-8 h-8 p-1 text-lg font-medium text-white active-inset neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f]"
                     onClick={() => setShowDialog(true)}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                     >
                        <path
                           fillRule="evenodd"
                           d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </button>
               </div>
               <div className="flex flex-col gap-3">
                  {todayExpenses.length > 0 ? (
                     <>
                        {todayExpenses.map((expense, i) => {
                           return (
                              <div
                                 key={i}
                                 className="flex items-center justify-between w-full p-2 rounded-md neumorphism active-inset bg-[#03305f25]"
                                 onClick={() => previewExpense(expense)}
                              >
                                 <div className="flex flex-col">
                                    <h5 className="font-semibold text-md text-main-accent dark:text-dark-accent-main">
                                       {expense.category}
                                    </h5>
                                    <p className="text-sm text-secondary-accent dark:text-dark-secondary-accent">
                                       {expense.shortDescription}
                                    </p>
                                 </div>
                                 <div className="flex flex-col items-end">
                                    <span className="text-lg font-bold text-rose-600">
                                       - ₱
                                       {Resources.formatMoney(expense.amount)}
                                    </span>
                                    <p className="text-sm text-secondary-accent dark:text-dark-secondary-accent">
                                       {expense.timeCreated}
                                    </p>
                                 </div>
                              </div>
                           );
                        })}
                        <div className="flex items-center justify-between p-2 rounded-lg inset bg-[#9f123a1c]">
                           <p className="text-sm font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                              Total:
                           </p>
                           <span className="text-lg font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                              ₱{Resources.formatMoney(todaysTotalExpenses)}
                           </span>
                        </div>
                     </>
                  ) : (
                     <p className="text-sm text-center text-secondary-accent dark:text-dark-secondary-accent">
                        No expenses yet!
                     </p>
                  )}

                  {/* <div className="flex justify-center mt-1">
                     <button className="px-4 py-1 text-sm rounded-full active-inset neumorphism">
                        See more
                     </button>
                  </div> */}
               </div>
            </div>

            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent dark:text-dark-accent-main">
                     PREVIOUS EXPENSES
                  </h4>
               </div>
               <div className="flex flex-col gap-3">
                  {previousExpenses.length > 0 ? (
                     <>
                        {previousExpenses.map((prev, i) => {
                           if (isSeeMore) {
                           }
                           if (i < prevExpensesListLimit) {
                              return (
                                 <div
                                    key={i}
                                    onClick={() => previewPreviousExpense(prev)}
                                    className="flex flex-col w-full gap-1 p-2 rounded-lg neumorphism active-inset bg-[#03305f25]"
                                 >
                                    <div className="flex justify-between">
                                       <span className="text-base font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                                          {prev.month} {prev.day}
                                       </span>
                                       <span className="text-base font-semibold text-secondary-accent dark:text-dark-secondary-accent">
                                          + ₱{prev.totalAmount} |{" "}
                                          {prev.progress}%
                                       </span>
                                    </div>
                                    <div className="w-full">
                                       <ProgressBar
                                          progress={prev.progress}
                                          color="#03305f"
                                          // color="#065a60"
                                       />
                                    </div>
                                 </div>
                              );
                           }
                        })}
                     </>
                  ) : (
                     <p className="text-sm text-center text-secondary-accent dark:text-dark-secondary-accent">
                        No expenses yet!
                     </p>
                  )}

                  {previousExpenses.length > LIST_LIMIT && (
                     <div className="flex justify-center mt-1">
                        <button
                           className="px-4 py-1 text-sm rounded-full active-inset neumorphism text-secondary-accent dark:text-dark-secondary-accent"
                           onClick={() => {
                              setIsSeeMore(!isSeeMore);
                           }}
                        >
                           {isSeeMore ? "See More" : "See Less"}
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
