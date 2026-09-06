import React, { useState } from 'react'

const App = () => {
  const [title, settitle] = useState('')
  const [details, setdetails] = useState('')
  const [task, settask] = useState([])

  const submithandler = (e) => {
    e.preventDefault()
    if (!title.trim() && !details.trim()) return

    // Fun pastel colors for real sticky note vibes
    const colors = [
      'bg-amber-200 text-amber-950', 
      'bg-rose-200 text-rose-950', 
      'bg-emerald-200 text-emerald-950', 
      'bg-sky-200 text-sky-950', 
      'bg-purple-200 text-purple-950'
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    settask([...task, { title, details, color: randomColor }])
    settitle('')
    setdetails('')
  }

  const deleteNote = (idx) => {
    settask(task.filter((_, index) => index !== idx))
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row p-6 lg:p-12 gap-8 font-sans'>
      
      {/* Form Section */}
      <form onSubmit={submithandler} className='lg:w-1/3 bg-zinc-900/80 p-6 lg:p-8 rounded-3xl border border-zinc-800 flex flex-col gap-5 h-fit sticky top-8 shadow-2xl'>
        <h1 className='text-3xl font-extrabold tracking-tight text-amber-400'>Pin a Thought ✨</h1>
        <p className='text-sm text-zinc-400 -mt-3'>Jotted down quickly, never forgotten.</p>
        
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold uppercase tracking-wider text-zinc-400'>Title</label>
          <input 
            type="text" 
            placeholder='Note title...' 
            className='px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-zinc-100 transition'
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold uppercase tracking-wider text-zinc-400'>Details</label>
          <textarea 
            placeholder='Write down what’s on your mind...' 
            className='px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-zinc-100 h-32 resize-none transition'
            value={details}
            onChange={(e) => setdetails(e.target.value)}
          />
        </div>
        
        <button className='bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-xl hover:bg-amber-300 active:scale-95 transition cursor-pointer shadow-lg shadow-amber-400/10'>
          Add Note
        </button>
      </form>

      {/* Notes Board Section */}
      <div className='lg:w-2/3 flex flex-col'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-zinc-200'>Your Notes Board</h2>
          <span className='text-xs font-bold px-3 py-1 bg-zinc-900 border border-zinc-800 text-amber-400 rounded-full'>
            {task.length} {task.length === 1 ? 'Note' : 'Notes'}
          </span>
        </div>

        {task.length === 0 ? (
          <div className='flex-1 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center my-auto min-h-[300px]'>
            <p className='text-zinc-500 font-medium'>No sticky notes here yet.</p>
            <p className='text-zinc-600 text-sm mt-1'>Fill out the form to stick your first note!</p>
          </div>
        ) : (
          <div className='flex flex-wrap gap-5 items-start overflow-y-auto max-h-[calc(100vh-8rem)] pr-2'>
            {task.map((elem, idx) => (
              <div 
                key={idx} 
                className={`relative w-56 min-h-56 p-5 rounded-2xl shadow-xl flex flex-col justify-between transform rotate-1 hover:rotate-0 hover:scale-105 transition duration-300 ${elem.color}`}
              >
                <div className='overflow-hidden'>
                  <h3 className='font-bold text-lg leading-snug break-words'>{elem.title || 'Untitled'}</h3>
                  <p className='mt-2 text-sm opacity-80 break-words whitespace-pre-line leading-relaxed'>{elem.details}</p>
                </div>
                
                <button 
                  onClick={() => deleteNote(idx)} 
                  className='mt-6 self-end bg-black/10 hover:bg-black/20 text-xs font-bold px-3 py-1.5 rounded-lg transition active:scale-95 cursor-pointer'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default App