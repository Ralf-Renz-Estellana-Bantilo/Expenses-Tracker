import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Analytics from "./Analystics/Analytics";
import Settings from "./Settings/Settings";
import axios from "axios";
import Dialog from "./components/Dialog";
import { XCircleIcon } from "@heroicons/react/solid";
import ComponentsContextProvider from "./contexts/ComponentsContext";
// import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "rsuite/dist/rsuite.min.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AppConfiguration from "./AppConfiguration";

const App = () => {
   const [selectedIndex, setSelectedIndex] = useState(0);

   const fetchMasterData = async () => {
      const payload = {
         tables: ["department", "branch", "position"],
      };
      await axios
         .post(`${AppConfiguration.url()}/api/masterdata`, payload)
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const fetchMasterSelect = async () => {
      const config = {
         table: "employee_profile",
         column: "employeeId, firstName, lastName, jobPosition",
         filter: {
            department: "Accounting",
            // branch: "Alabang",
            // jobPosition: "Project Manager",
            // jobRank: "Junior",
         },
      };
      await axios
         .post(`${AppConfiguration.url()}/api/masterselect`, config)
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const fetchInsertData = async () => {
      const payload = {
         table: "holidays",
         values: {
            holidayDate: "11-11-11",
            holidayDescription: "Sample Test!",
         },
      };
      await axios
         .post(`${AppConfiguration.url()}/api/insertData`, payload)
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   const fetchBulkInsert = async () => {
      const payload = {
         table: "holidays",
         columns: "holidayDate, holidayDescription",
         values: [
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
            ["01-01-2000", "Description One"],
         ],
      };
      await axios
         .post(`${AppConfiguration.url()}/api/bulkInsert`, payload)
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
            alert(error);
         });
   };

   useEffect(() => {
      // fetchBulkInsert();
   }, []);

   return (
      <div className="app-light">
         <ComponentsContextProvider>
            <div className="dark:bg-slate-800">
               <div className="w-full min-h-full dark:bg-slate-800">
                  <div className="sticky top-0 z-10 flex justify-center p-3 mb-5 text-white shadow-md bg-gradient-to-t from-[#04213f] to-[#03305f]">
                     <h5 className="text-base">
                        {`< `}
                        <strong>Expenses</strong> Tracker {`/>`}
                     </h5>
                     {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                     >
                        <path
                           fillRule="evenodd"
                           d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                           clipRule="evenodd"
                        />
                     </svg> */}
                  </div>

                  <div>
                     <Tab.Group
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                     >
                        <Tab.Panels className="mb-20 max-w-[600px] m-auto">
                           <Tab.Panel>
                              <Home />
                           </Tab.Panel>
                           <Tab.Panel>
                              <Profile />
                           </Tab.Panel>
                           {/* <Tab.Panel>
                              <Analytics />
                           </Tab.Panel> */}
                           <Tab.Panel>
                              <Settings />
                           </Tab.Panel>
                        </Tab.Panels>
                        <Tab.List className="fixed bottom-0 flex justify-around w-full py-3 bg-[#ececf4] bottom-navigation">
                           <Tab
                              className={
                                 selectedIndex === 0
                                    ? "active-tab bg-gradient-to-t from-[#04213f] to-[#03305f]"
                                    : "tab"
                              }
                           >
                              {selectedIndex === 0 ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    class="w-6 h-6"
                                 >
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                 </svg>
                              ) : (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                 >
                                    <path
                                       stroke-linecap="round"
                                       stroke-linejoin="round"
                                       d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                 </svg>
                              )}
                           </Tab>
                           {/* <Tab
                              className={
                                 selectedIndex === 1
                                    ? "active-tab bg-gradient-to-r from-sky-500 to-indigo-500"
                                    : "tab"
                              }
                           >
                              {selectedIndex === 1 ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              ) : (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                 </svg>
                              )}
                           </Tab> */}
                           <Tab
                              className={
                                 selectedIndex === 1
                                    ? "active-tab bg-gradient-to-t from-[#04213f] to-[#03305f]"
                                    : "tab"
                              }
                           >
                              {selectedIndex === 1 ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.54 15h6.42l.5 1.5H8.29l.5-1.5zm8.085-8.995a.75.75 0 10-.75-1.299 12.81 12.81 0 00-3.558 3.05L11.03 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 001.146-.102 11.312 11.312 0 013.612-3.321z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              ) : (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                                    />
                                 </svg>
                              )}
                           </Tab>
                           <Tab
                              className={
                                 selectedIndex === 2
                                    ? "active-tab bg-gradient-to-t from-[#04213f] to-[#03305f]"
                                    : "tab"
                              }
                           >
                              {selectedIndex === 2 ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              ) : (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                 </svg>
                              )}
                           </Tab>
                        </Tab.List>
                     </Tab.Group>
                  </div>
               </div>
            </div>
         </ComponentsContextProvider>
      </div>
   );
};

export default App;
