export {}
// import * as React from 'react'
// import { Listbox, Transition } from '@headlessui/react'
// import * as Icons from '~/components/Icons'

// const labels = [
//   { name: 'No resuelto', value: null },
//   { name: 'Resuelto', value: 'resuelto', icon: <Icons.CheckIcon /> },
// ]

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Respuesta() {
//   const [labelled, setLabelled] = React.useState(labels[0])

//   return (
//     <div className="py-air">
//       <div className="mx-auto max-w-sm sm:max-w-md">
//         <form action="#" className="relative text-sm">
//           <div className="overflow-hidden rounded-lg bg-gray-50 px-2 pt-3 shadow shadow-slate-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
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
//               className="w-full resize-y border-none py-2 pl-1 placeholder-brand-light focus:ring-0"
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

//           <div className="absolute inset-x-px bottom-0">
//             <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
//               <Listbox
//                 as="div"
//                 value={labelled}
//                 onChange={setLabelled}
//                 className="flex-shrink-0"
//               >
//                 {({ open }) => (
//                   <>
//                     <Listbox.Label className="sr-only">Status</Listbox.Label>
//                     <div className="relative">
//                       <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-brand-light hover:bg-gray-100 sm:px-3">
//                         {labelled?.value === null ? (
//                           <div className="flex items-center gap-1">
//                             <span className="text-sm">No resuelto</span>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-1 text-emerald-400">
//                             <span className="text-sm">Resuelto</span>
//                             <Icons.CheckIcon className="h-5 w-5 flex-shrink-0" />
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
//                         <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           {labels.map(label => (
//                             <Listbox.Option
//                               key={label.value}
//                               className={({ active }) =>
//                                 classNames(
//                                   active ? 'bg-gray-100' : 'bg-white',
//                                   'relative cursor-default select-none py-2 px-3'
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
//                   className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
