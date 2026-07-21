import React, { useState } from 'react'
import axios from 'axios'
import UserSummaryCard from './UserSummaryCard'

const AdminDashboard = ({isLogged, isAdmin}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('pending')
    const [assignTo, setAssignTo] = useState('')

    // Placeholder users — replace with API data later
    const users = [
        { _id: '1', username: 'Raj Abhi' },
        { _id: '2', username: 'Ankit Sharma' },
        { _id: '3', username: 'Priya Verma' },
        { _id: '4', username: 'Sneha Gupta' },
    ]

    // Placeholder summary data — replace with API data later
    const userSummaries = [
        { _id: '1', username: 'Raj Abhi', assigned: 5, pending: 2, completed: 3 },
        { _id: '2', username: 'Ankit Sharma', assigned: 3, pending: 1, completed: 2 },
        { _id: '3', username: 'Priya Verma', assigned: 4, pending: 3, completed: 1 },
        { _id: '4', username: 'Sneha Gupta', assigned: 2, pending: 0, completed: 2 },
    ]

    const handlelogout = async() => {
        isLogged();
        isAdmin();
        try {
            await axios.get('http://localhost:3000/logout', { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ title, description, status, assignTo })

        // TODO: API call to assign task

        setTitle('')
        setDescription('')
        setStatus('pending')
        setAssignTo('')
    }

    const inputClass = "w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"

    return (
        <div className="w-full min-h-screen bg-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-15%] right-[15%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        📋 Task Manager Dashboard
                    </h1>
                    <button onClick={handlelogout} className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 cursor-pointer active:scale-[0.98]">
                        Logout
                    </button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column — Assign Task Form */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-5">Assign New Task</h2>
                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl shadow-purple-500/10 p-7">
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                {/* Title */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 pl-1">Task Title</label>
                                    <input
                                        className={inputClass}
                                        type="text"
                                        placeholder="Enter task title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 pl-1">Description</label>
                                    <textarea
                                        className={`${inputClass} resize-none h-28`}
                                        placeholder="Describe the task..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 pl-1">Status</label>
                                    <select
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="pending" className="bg-zinc-800">Pending</option>
                                        <option value="in progress" className="bg-zinc-800">In Progress</option>
                                        <option value="completed" className="bg-zinc-800">Completed</option>
                                    </select>
                                </div>

                                {/* Assign To */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 pl-1">Assign To</label>
                                    <select
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                        value={assignTo}
                                        onChange={(e) => setAssignTo(e.target.value)}
                                    >
                                        <option value="" className="bg-zinc-800 text-zinc-400">Select a user</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id} className="bg-zinc-800">
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Submit */}
                                <button
                                    className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                                    type="submit"
                                >
                                    Assign Task
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column — User Summaries */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-5">Users Overview</h2>
                        <div className="flex flex-col gap-4">
                            {userSummaries.map(user => (
                                <UserSummaryCard
                                    key={user._id}
                                    name={user.username}
                                    assigned={user.assigned}
                                    pending={user.pending}
                                    completed={user.completed}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
