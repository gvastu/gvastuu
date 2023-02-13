export {}
// import * as React from "react"
// import {Listbox, Transition} from "@headlessui/react"
// import * as Icons from "~/components/Icons"

// const labels = [
//   {name: "No resuelto", value: null},
//   {name: "Resuelto", value: "resuelto", icon: <Icons.CheckIcon />},
// ]

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ")
// }

// export default function Respuesta() {
//   const [labelled, setLabelled] = React.useState(labels[0])

//   return (
//     <div className="py-air">
//       <div className="max-w-sm sm:max-w-md mx-auto">
//         <form action="#" className="relative text-sm">
//           <div className="pt-3 px-2 shadow shadow-slate-300 bg-gray-50 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
//             <label htmlFor="title" className="sr-only">
//               Título
//             </label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               className="w-full border-b py-2 pl-1 placeholder-brand-light focus:ring-0"
//               placeholder="Título"
//             />
//             <label htmlFor="description" className="sr-only">
//               Descripción
//             </label>
//             <textarea
//               rows={2}
//               name="description"
//               id="description"
//               className="w-full border-none py-2 pl-1 resize-y placeholder-brand-light focus:ring-0"
//               placeholder="Descripción"
//               defaultValue=""
//             />
//             <div aria-hidden="true">
//               <div className="py-2">
//                 <div className="h-9" />
//               </div>
//               <div className="h-px" />
//               <div className="py-2">
//                 <div className="py-px">
//                   <div className="h-9" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="absolute bottom-0 inset-x-px">
//             <div className="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
//               <Listbox
//                 as="div"
//                 value={labelled}
//                 onChange={setLabelled}
//                 className="flex-shrink-0"
//               >
//                 {({open}) => (
//                   <>
//                     <Listbox.Label className="sr-only">Status</Listbox.Label>
//                     <div className="relative">
//                       <Listbox.Button className="relative inline-flex items-center text-brand-light rounded-full py-2 px-2 bg-gray-50 whitespace-nowrap hover:bg-gray-100 sm:px-3">
//                         {labelled?.value === null ? (
//                           <div className="flex items-center gap-1">
//                             <span className="text-sm">No resuelto</span>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-1 text-emerald-400">
//                             <span className="text-sm">Resuelto</span>
//                             <Icons.CheckIcon className="flex-shrink-0 w-5 h-5" />
//                           </div>
//                         )}
//                       </Listbox.Button>
//                       <Transition
//                         show={open}
//                         as={React.Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                       >
//                         <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
//                           {labels.map(label => (
//                             <Listbox.Option
//                               key={label.value}
//                               className={({active}) =>
//                                 classNames(
//                                   active ? "bg-gray-100" : "bg-white",
//                                   "cursor-default select-none relative py-2 px-3",
//                                 )
//                               }
//                               value={label}
//                             >
//                               <div className="flex items-center">
//                                 <span className="block truncate">
//                                   {label.name}
//                                 </span>
//                               </div>
//                             </Listbox.Option>
//                           ))}
//                         </Listbox.Options>
//                       </Transition>
//                     </div>
//                   </>
//                 )}
//               </Listbox>
//             </div>
//             <div className="border-t border-gray-200 p-2">
//               <div className="grid place-content-end">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Enviar respuesta
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
