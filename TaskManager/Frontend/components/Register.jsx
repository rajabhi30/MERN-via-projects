import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, email, password, role);







        setUsername('')
        setEmail('')
        setPassword('')
        setRole('')
    }
    return (
        <div className="auth-container w-full h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]"></div>

            <h1 className="text-3xl font-bold text-white mb-8 tracking-tight z-10">
                Register 2😉 Your Account
            </h1>

            <div className="w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-zinc-800 z-10">
                <form className="w-full p-8 flex flex-col gap-5" action="">
                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-400 pl-1">Username</label>
                        <input
                            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-400 pl-1">Email</label>
                        <input
                            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-400 pl-1">Password</label>
                        <input
                            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-400 pl-1">Role</label>
                        <select
                            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 appearance-none cursor-pointer"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="" className="bg-zinc-800 text-zinc-400">Select Role</option>
                            <option value="user" className="bg-zinc-800">User</option>
                            <option value="admin" className="bg-zinc-800">Admin</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                        type="submit"
                        onClick={handleSubmit}
                    >  
                        Create Account
                    </button>

                    {/* Footer link */}
                    <p className="text-center text-sm text-zinc-500 mt-1">
                        Already have an account?{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register