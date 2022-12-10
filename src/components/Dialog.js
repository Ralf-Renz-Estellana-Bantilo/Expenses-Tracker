import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import "./Dialog.css";

export default function Dialog({ children }) {
   return (
      <div className="modal-container">
         <div className="overlay-style backdrop-blur-sm" />
         <div className="w-11/12 rounded-lg modal-style">{children}</div>
      </div>
      // <div
      //    className={` ${
      //       isShowModal ? "block" : "hidden"
      //    } absolute top-0 left-0 z-50 w-screen h-screen  overflow-y-auto`}
      // >
      //    <div className="w-full h-full transition-opacity bg-black bg-opacity-25 cursor-pointer backdrop-blur-sm"></div>

      //    <div>
      //       <Transition
      //          show={true}
      //          enter="transition-opacity duration-75"
      //          enterFrom="opacity-0"
      //          enterTo="opacity-100"
      //          leave="transition-opacity duration-150"
      //          leaveFrom="opacity-100"
      //          leaveTo="opacity-0"
      //       >
      //          <div className="absolute w-11/12 overflow-hidden transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow top-1/2 left-1/2 md:h-3/4 h-1/2 md:w-2/5 ">
      //             <div className="flex items-center justify-center relative p-3 bg-[#540b0e] text-white shadow-md">
      //                <h4>Sample Header</h4>
      //                <XCircleIcon className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2" />
      //             </div>
      //             <div className="p-3">
      //                <p>
      //                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
      //                   Assumenda quia minus adipisci beatae inventore porro
      //                   provident facere autem necessitatibus et illo aliquid,
      //                   excepturi, animi eius nulla ipsa dolorem! Inventore,
      //                   illum!
      //                </p>
      //             </div>
      //          </div>
      //       </Transition>
      //    </div>
      // </div>

      // <div className="modal-container">
      //    <div className="overlay-style" />
      //    <div className="w-11/12 overflow-hidden rounded-lg modal-style">
      //       <div className="flex items-center justify-center relative p-3 bg-[#540b0e] text-white shadow-md">
      //          <h3>DIALOG HEADER</h3>
      //          <XCircleIcon className="absolute z-50 w-8 h-8 text-red-400 transition cursor-pointer hover:text-red-500 right-2" />
      //       </div>
      //       <h1 className="modal-text">
      //          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
      //          quaerat commodi doloremque voluptatem accusantium repellat a in
      //          repellendus ea, omnis exercitationem, labore nulla repudiandae
      //          consequuntur. Reprehenderit culpa libero molestiae vero?
      //       </h1>
      //       <div className="flex items-center justify-end gap-2 p-2">
      //          <button className="active-inset neumorphism py-1 px-3 min-w-[100px]">
      //             Cancel
      //          </button>
      //          <button className="active-inset neumorphism py-1 px-3 min-w-[100px]">
      //             Save
      //          </button>
      //       </div>
      //    </div>
      // </div>
   );
}
