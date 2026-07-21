import React from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'

const Userprofile = ({isLogged}) => {
    // Placeholder data — replace with API data later
    const username = 'Raj Abhi'
    const tasks = [
        { _id: '1', title: 'Setup Backend API', description: 'Create REST API endpoints for user authentication and task CRUD operations using Express and MongoDB.', status: 'completed' },
        { _id: '2', title: 'Design Frontend UI', description: 'Build Register, Login, and Dashboard components with a dark glassmorphism theme using React and Tailwind.', status: 'in progress' },
        { _id: '3', title: 'Connect Frontend to Backend', description: 'Integrate Axios for API calls, handle JWT tokens, and wire up form submissions to backend routes.', status: 'pending' },
        { _id: '4', title: 'Add Task CRUD Features', description: 'Implement create, read, update, and delete functionality for tasks on the dashboard.', status: 'pending' },
        { _id: '5', title: 'Deploy to Production', description: 'Deploy backend on Render and frontend on Vercel. Configure environment variables and CORS.', status: 'pending' },
    ]

    const taskCounts = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in progress').length,
        pending: tasks.filter(t => t.status === 'pending').length,
    }

    const handlelogout = async() => {
        isLogged();
        try {
            await axios.get('http://localhost:3000/logout', { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full min-h-screen bg-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="text-sm text-zinc-500 font-medium mb-1">Welcome back</p>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            👋 {username}
                        </h1>
                    </div>
                    <button onClick={handlelogout} className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 cursor-pointer active:scale-[0.98]">
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-white">{taskCounts.total}</p>
                        <p className="text-xs text-zinc-500 mt-1 font-medium">Total Tasks</p>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{taskCounts.completed}</p>
                        <p className="text-xs text-zinc-500 mt-1 font-medium">Completed</p>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-400">{taskCounts.inProgress}</p>
                        <p className="text-xs text-zinc-500 mt-1 font-medium">In Progress</p>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-400">{taskCounts.pending}</p>
                        <p className="text-xs text-zinc-500 mt-1 font-medium">Pending</p>
                    </div>
                </div>

                {/* Section title */}
                <h2 className="text-xl font-semibold text-white mb-5">Your Tasks</h2>

                {/* Task Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Userprofile
