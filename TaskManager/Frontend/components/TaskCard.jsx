import React from 'react'

const TaskCard = ({ title, description, status }) => {
    const statusStyles = {
        'pending': {
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-400',
            border: 'border-yellow-500/30',
            dot: 'bg-yellow-400',
        },
        'in progress': {
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            border: 'border-blue-500/30',
            dot: 'bg-blue-400',
        },
        'completed': {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            dot: 'bg-emerald-400',
        },
    }

    const style = statusStyles[status] || statusStyles['pending']

    return (
        <div className="group bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex flex-col gap-3">
            {/* Status badge */}
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 leading-snug">
                    {title}
                </h3>
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border} shrink-0 ml-3`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {description}
            </p>
        </div>
    )
}

export default TaskCard
