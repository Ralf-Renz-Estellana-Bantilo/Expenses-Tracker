import React, { useContext, useState } from "react";
import { Switch } from "@headlessui/react";
import Dialog from "../components/Dialog";
import { XCircleIcon } from "@heroicons/react/solid";
import TextField from "../components/Textfield";
import { ComponentsContext } from "../contexts/ComponentsContext";
import Resources from "../Resources";
import axios from "axios";

const Settings = () => {
   const {
      categoryList,
      addNewCategory,
      addNewBudget,
      expenses,
      balance,
      activeBudget,
      setActiveBudget,
      setCategoryList,
   } = useContext(ComponentsContext);

   const [enabled, setEnabled] = useState(false);
   const [isShowCategoryDialog, setShowCategoryDialog] = useState(false);
   const [isShowPreviewCategoryDialog, setShowPreviewCategoryDialog] =
      useState(false);
   const [isShowBudgetDialog, setShowBudgetDialog] = useState(false);
   const [isShowEditBudgetDialog, setShowEditBudgetDialog] = useState(false);

   const [newCategory, setNewCategory] = useState(null);

   const [budgetAmount, setBudgetAmount] = useState(null);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [previewBudgetAmount, setPreviewBudgetAmount] = useState(null);
   const [previewStartDate, setPreviewStartDate] = useState(null);
   const [previewEndDate, setPreviewEndDate] = useState(null);

   const [previewCategory, setPreviewCategory] = useState(null);
   const [previewCategoryData, setPreviewCategoryData] = useState(null);

   const handleAddCategory = async () => {
      const category = {
         category: newCategory,
      };
      addNewCategory(category);
      setShowCategoryDialog(false);
      setNewCategory(null);
   };

   const handlePreviewCategory = (category) => {
      setPreviewCategory(category.category);
      setPreviewCategoryData(category);
      setShowPreviewCategoryDialog(true);
   };

   const handleUpdateCategory = async () => {
      await axios
         .put(`http://localhost:2022/api/updateData`, {
            table: "categories",
            values: {
               category: previewCategory,
            },
            key: {
               categoryID: previewCategoryData.categoryID,
            },
         })
         .then((response) => {
            setCategoryList(
               categoryList.map((category) =>
                  category.categoryID === previewCategoryData.categoryID
                     ? {
                          ...category,
                          category: previewCategory,
                       }
                     : category
               )
            );
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
      setShowPreviewCategoryDialog(false);
   };

   const handleDeleteCategory = () => {
      axios
         .put(`http://localhost:2022/api/updateData`, {
            table: "categories",
            values: {
               status: 0,
            },
            key: {
               categoryID: previewCategoryData.categoryID,
            },
         })
         .then((response) => {
            console.log({ response });
            const updatedCategories = categoryList.filter(
               (category) =>
                  Number(category.categoryID) !==
                  Number(previewCategoryData.categoryID)
            );
            setCategoryList(updatedCategories);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });

      setShowPreviewCategoryDialog(false);
   };

   const handleAddBudget = async () => {
      const newBudget = {
         monthID: new Date().getMonth() + 1,
         amount: Number(budgetAmount),
         dateFrom: startDate,
         dateTo: endDate,
         expenses,
         balance,
         isActive: 1,
      };
      await addNewBudget(newBudget);
      setShowBudgetDialog(false);
   };

   const handlePreviewBudget = (budget) => {
      setPreviewBudgetAmount(activeBudget.amount);
      setPreviewStartDate(activeBudget.dateFrom);
      setPreviewEndDate(activeBudget.dateTo);
      setShowEditBudgetDialog(true);
   };

   const handleUpdateBudget = () => {
      setActiveBudget({
         ...activeBudget,
         amount: previewBudgetAmount,
         dateFrom: previewStartDate,
         dateTo: previewEndDate,
      });
      setShowEditBudgetDialog(false);
   };

   return (
      <>
         {isShowCategoryDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Add New Category</h5>
                     <XCircleIcon
                        onClick={() => setShowCategoryDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <input
                           placeholder="New Category"
                           value={newCategory}
                           onChange={(e) => setNewCategory(e.target.value)}
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={(e) =>
                              e.key === "Enter" && handleAddCategory()
                           }
                           type="text"
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism"
                        onClick={() => setShowCategoryDialog(false)}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={handleAddCategory}
                     >
                        Add
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         {isShowPreviewCategoryDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Preview Category</h5>
                     <XCircleIcon
                        onClick={() => setShowPreviewCategoryDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <input
                           placeholder="Category"
                           value={previewCategory}
                           onChange={(e) => setPreviewCategory(e.target.value)}
                           onWheel={(e) => e.target.blur()}
                           type="text"
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                        onClick={handleDeleteCategory}
                     >
                        Delete
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={handleUpdateCategory}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         {isShowBudgetDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Add Budget</h5>
                     <XCircleIcon
                        onClick={() => setShowBudgetDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <input
                           placeholder="Amount"
                           value={budgetAmount}
                           type="number"
                           onChange={(e) => setBudgetAmount(e.target.value)}
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={(e) =>
                              e.key === "Enter" && handleAddBudget()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                        <div className="flex items-center gap-2">
                           <label
                              htmlFor="date_from"
                              className="whitespace-nowrap min-w-[100px]"
                           >
                              Start Date:
                           </label>
                           <input
                              id="date_from"
                              value={startDate}
                              type="date"
                              onChange={(e) => setStartDate(e.target.value)}
                              className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                           />
                        </div>
                        <div className="flex items-center gap-2">
                           <label
                              htmlFor="date_to"
                              className="whitespace-nowrap min-w-[100px]"
                           >
                              End Date:
                           </label>
                           <input
                              id="date_to"
                              value={endDate}
                              type="date"
                              onChange={(e) => setEndDate(e.target.value)}
                              className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism"
                        onClick={() => setShowBudgetDialog(false)}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={handleAddBudget}
                     >
                        Set as Active
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         {isShowEditBudgetDialog && (
            <Dialog>
               <div className="flex flex-col">
                  <div className="relative flex items-center justify-center p-3 text-white rounded-t-lg shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5>Edit Budget</h5>
                     <XCircleIcon
                        onClick={() => setShowEditBudgetDialog(false)}
                        className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2"
                     />
                  </div>
                  <div className="w-full p-2 pb-0">
                     <div className="flex flex-col gap-2 p-3 inset">
                        <input
                           placeholder="Amount"
                           value={previewBudgetAmount}
                           type="number"
                           onChange={(e) =>
                              setPreviewBudgetAmount(e.target.value)
                           }
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={(e) =>
                              e.key === "Enter" && handleUpdateBudget()
                           }
                           className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                        />
                        <div className="flex items-center gap-2">
                           <label
                              htmlFor="date_from"
                              className="whitespace-nowrap min-w-[100px]"
                           >
                              Start Date:
                           </label>
                           <input
                              id="date_from"
                              value={previewStartDate}
                              type="date"
                              onChange={(e) =>
                                 setPreviewStartDate(e.target.value)
                              }
                              className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                           />
                        </div>
                        <div className="flex items-center gap-2">
                           <label
                              htmlFor="date_to"
                              className="whitespace-nowrap min-w-[100px]"
                           >
                              End Date:
                           </label>
                           <input
                              id="date_to"
                              value={previewEndDate}
                              type="date"
                              onChange={(e) =>
                                 setPreviewEndDate(e.target.value)
                              }
                              className={`rounded-md w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 transition`}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-3">
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism"
                        onClick={() => setShowEditBudgetDialog(false)}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-1 text-base rounded-full min-w-[80px] neumorphism bg-gradient-to-t from-[#04213f] to-[#03305f] text-white"
                        onClick={handleUpdateBudget}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </Dialog>
         )}

         <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-main-accent">
                     System Theme
                  </h4>
               </div>
               <div className="flex flex-col p-2 neumorphism bg-[#03305f25]">
                  <div className="flex items-center justify-between w-full p-2 rounded-lg">
                     <div className="flex flex-col">
                        <p className="text-base font-semibold text-main-accent">
                           Dark Mode
                        </p>
                     </div>
                     <div className="flex flex-col">
                        <Switch
                           checked={enabled}
                           onChange={setEnabled}
                           className={`${
                              enabled ? "bg-sky-500" : "bg-[#03305f25]"
                           }
           neumorphism relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 shadow-md`}
                        >
                           <span className="sr-only">Use setting</span>
                           <span
                              aria-hidden="true"
                              className={`${
                                 enabled ? "translate-x-6" : "translate-x-0"
                              }
            pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-white ring-0 transition duration-200 ease-in-out`}
                           />
                        </Switch>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent">
                     BUDGET CONTROL
                  </h4>
                  <button
                     className="w-8 h-8 p-1 text-lg font-medium text-white bg-gradient-to-t from-[#04213f] to-[#03305f] active-inset neumorphism"
                     onClick={() => setShowBudgetDialog(true)}
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
               <div className="flex flex-col gap-2">
                  {activeBudget.budgetID != 0 ? (
                     <div
                        className="flex items-center justify-between w-full p-2 rounded-lg bg-[#03305f25] neumorphism active-inset"
                        onClick={handlePreviewBudget}
                     >
                        <div className="flex flex-col">
                           <h4 className="text-lg font-semibold text-main-accent">
                              Active Budget
                           </h4>
                           <p className="text-sm text-secondary-accent">
                              {activeBudget.dateFrom} - {activeBudget.dateTo}
                           </p>
                        </div>
                        <div className="flex flex-col">
                           <h3 className="text-lg font-bold text-right text-main-accent">
                              ₱{Resources.formatMoney(activeBudget.amount)}
                           </h3>
                        </div>
                     </div>
                  ) : (
                     <p className="text-center text-secondary-accent">
                        No data found!
                     </p>
                  )}
               </div>
            </div>
            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent">
                     DATA MAINTENANCE
                  </h4>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="neumorphism flex flex-col w-full bg-[#03305f25] p-2 rounded-lg gap-5">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                           >
                              <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                           </svg>
                           <h4 className="text-lg font-semibold text-main-accent">
                              Category
                           </h4>
                        </div>
                        <div className="flex">
                           <button
                              className="w-8 h-8 p-1 text-lg font-medium text-white bg-gradient-to-t from-[#04213f] to-[#03305f] active-inset neumorphism"
                              onClick={() => setShowCategoryDialog(true)}
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
                     </div>
                     <div className="flex flex-col gap-4 px-3 py-5 rounded-lg inset">
                        {categoryList.length > 0 ? (
                           <>
                              {" "}
                              {categoryList.map((category) => {
                                 return (
                                    <div className="flex items-center justify-between ">
                                       <p className="font-medium text-base text-secondary-accent">
                                          {category.category}
                                       </p>
                                       <div className="flex items-center gap-2">
                                          <button
                                             className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism"
                                             onClick={() => {
                                                handlePreviewCategory(category);
                                             }}
                                          >
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="green"
                                                className="w-5 h-5 m-[2px]"
                                             >
                                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                             </svg>
                                          </button>
                                          {/* <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="red"
                                                class="w-5 h-5 m-[2px]"
                                             >
                                                <path
                                                   fill-rule="evenodd"
                                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                                   clip-rule="evenodd"
                                                />
                                             </svg>
                                          </button> */}
                                       </div>
                                    </div>
                                 );
                              })}
                           </>
                        ) : (
                           <span className="text-sm text-center text-secondary-accent">
                              No data found!
                           </span>
                        )}

                        {/* <div className="flex items-center justify-between ">
                           <p>Shopping & Groceries</p>
                           <div className="flex items-center gap-2">
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                           </div>
                        </div>
                        <div className="flex items-center justify-between ">
                           <p>Transportation</p>
                           <div className="flex items-center gap-2">
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                           </div>
                        </div>
                        <div className="flex items-center justify-between ">
                           <p>Load / Communication</p>
                           <div className="flex items-center gap-2">
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                           </div>
                        </div>
                        <div className="flex items-center justify-between ">
                           <p>Financial Expenses</p>
                           <div className="flex items-center gap-2">
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                              <button className="w-8 h-8 p-1 text-lg font-medium active-inset neumorphism">
                                 +
                              </button>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Settings;
