import { SelectorIcon } from "@heroicons/react/solid";
import React from "react";

export default function TextField({
   value,
   setValue,
   id,
   name,
   label,
   type,
   className,
}) {
   return (
      <div className="flex items-center justify-between gap-5 text-sm">
         <input
            placeholder={label}
            value={value}
            name={name}
            id={id}
            type={type || "text"}
            onChange={(e) => setValue(e.target.value)}
            onWheel={(e) => e.target.blur()}
            // className={
            //    "relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            // }
            className={`${className} rounded w-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 transition`}
         />
      </div>
   );
}
