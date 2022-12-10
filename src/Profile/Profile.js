import { XCircleIcon } from "@heroicons/react/solid";

const Profile = () => {
   return (
      <>
         <div className="flex flex-col gap-5">
            <div className="flex flex-col">
               <div className="flex justify-center">
                  <img
                     className="overflow-hidden rounded-full"
                     src={require("../assets/Ralf Renz Profile.jpg")}
                     alt="Ralf Renz"
                     style={{ height: "120px" }}
                  />
               </div>
               <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-center text-main-accent">
                     Ralf Renz Bantilo
                  </h3>
                  <p className="text-sm text-center text-secondary-accent">
                     {"< Junior Programmer />"}
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent">
                     YOUR ACCOUNT
                  </h4>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="flex p-2 flex-1 inset bg-[#065f461c] rounded-lg justify-between items-center">
                     <p className="text-base text-center text-secondary-accent">
                        Total Budget
                     </p>
                     <h3 className="text-lg font-semibold text-main-accent">
                        ₱10,000
                     </h3>
                  </div>
                  <div className="flex justify-between items-center flex-1 p-2 inset bg-[#9f123a1c] rounded-lg">
                     <p className="text-base text-center text-secondary-accent">
                        Total Expenses
                     </p>
                     <h3 className="text-lg font-semibold text-main-accent">
                        ₱7,000
                     </h3>
                  </div>
                  <div className="flex justify-between items-center flex-1 p-2 inset bg-[#fbbf241c] rounded-lg">
                     <p className="text-base text-center text-secondary-accent">
                        Total Savings
                     </p>
                     <h3 className="text-lg font-semibold text-main-accent">
                        ₱3,000
                     </h3>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent">
                     MONTHLY EXPENSES
                  </h4>
               </div>
               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-[#03305f25] w-full p-2 rounded-lg neumorphism active-inset">
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-main-accent">
                           NOVEMBER
                        </h3>
                        <p className="text-sm text-secondary-accent">
                           Budget: ₱20,000
                        </p>
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-right text-main-accent">
                           ₱20,000
                        </h3>
                        <p className="text-sm text-right text-secondary-accent">
                           Save: ₱20,000
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#03305f25] w-full p-2 rounded-lg neumorphism active-inset">
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold">OCTOBER</h3>
                        <p className="text-sm">Budget: ₱20,000</p>
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-right">
                           ₱20,000
                        </h3>
                        <p className="text-sm text-right ">Save: ₱20,000</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#03305f25] w-full p-2 rounded-lg neumorphism active-inset">
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold">SEPTEMBER</h3>
                        <p className="text-sm">Budget: ₱20,000</p>
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-right">
                           ₱20,000
                        </h3>
                        <p className="text-sm text-right ">Save: ₱20,000</p>
                     </div>
                  </div>
                  <div className="flex justify-center mt-1">
                     <button className="px-4 py-1 text-sm rounded-full active-inset neumorphism text-secondary-accent">
                        See more
                     </button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-5 p-3 neumorphism-container">
               <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-main-accent">
                     BUDGET DETAILS
                  </h4>
               </div>
               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-[#03305f25] w-full p-2 rounded-lg neumorphism active-inset">
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-main-accent">
                           2022-12-04
                        </h3>
                        <h3 className="text-lg font-bold text-main-accent">
                           2022-12-19
                        </h3>
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-right text-rose-600">
                           - ₱17,276
                        </h3>
                        <p className="text-sm text-right text-secondary-accent">
                           Budget: ₱20,000
                        </p>
                     </div>
                  </div>
                  <div className="flex justify-center mt-1">
                     <button className="px-4 py-1 text-sm rounded-full active-inset neumorphism text-secondary-accent">
                        See more
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Profile;
