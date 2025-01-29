// import React, { useState, useEffect } from 'react'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

// interface Event {
//   id: number
//   title: string
//   start: Date
//   end: Date
// }

// interface EventModalProps {
//   event: Event | null
//   onSave: (event: Event) => void
//   onDelete: (eventId: number) => void
//   onClose: () => void
// }

// const EventModal: React.FC<EventModalProps> = ({ event, onSave, onDelete, onClose }) => {
//   const [title, setTitle] = useState('')
//   const [start, setStart] = useState<Date | null>(new Date())
//   const [end, setEnd] = useState<Date | null>(new Date())

//   useEffect(() => {
//     if (event) {
//       setTitle(event.title)
//       setStart(event.start)
//       setEnd(event.end)
//     }
//   }, [event])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (event && start && end) {
//       onSave({ ...event, title, start, end })
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-xl">
//         <h2 className="text-xl font-bold mb-4">{event?.id ? 'Edit Event' : 'Add Event'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="start" className="block text-sm font-medium text-gray-700">
//               Start
//             </label>
//             <DatePicker
//               selected={start}
//               onChange={(date: Date | null) => date && setStart(date)}
//               showTimeSelect
//               dateFormat="MMMM d, yyyy h:mm aa"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="end" className="block text-sm font-medium text-gray-700">
//               End
//             </label>
//             <DatePicker
//               selected={end}
//               onChange={(date: Date | null) => date && setEnd(date)}
//               showTimeSelect
//               dateFormat="MMMM d, yyyy h:mm aa"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             {event && event.id !== 0 && (
//               <button
//                 type="button"
//                 onClick={() => onDelete(event.id)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 Delete
//               </button>
//             )}
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EventModal







import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Event {
  id: number
  title: string
  start: Date
  end: Date
}

interface EventModalProps {
  event: Event | null
  onSave: (event: Event) => void
  onDelete: (eventId: number) => void
  onClose: () => void
}

const EventModal: React.FC<EventModalProps> = ({ event, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState<Date | null>(new Date())
  const [end, setEnd] = useState<Date | null>(new Date())

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setStart(event.start)
      setEnd(event.end)
    }
  }, [event])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (event && start && end) {
      onSave({ ...event, title, start, end })
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{event?.id ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <DatePicker
              selected={start}
              onChange={(date: Date | null) => date && setStart(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="end" className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <DatePicker
              selected={end}
              onChange={(date: Date | null) => date && setEnd(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          <div className="flex justify-end gap-4">
            {event && event.id !== 0 && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal
