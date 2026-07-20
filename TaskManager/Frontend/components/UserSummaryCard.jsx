import React from 'react'

const UserSummaryCard = ({ name, assigned, pending, completed }) => {
    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
            {/* User name */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-base font-semibold text-white truncate">{name}</h3>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                    <p className="text-xl font-bold text-white">{assigned}</p>
                    <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Assigned</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-yellow-400">{pending}</p>
                    <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Pending</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-emerald-400">{completed}</p>
                    <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Completed</p>
                </div>
            </div>
        </div>
    )
}

export default UserSummaryCard
