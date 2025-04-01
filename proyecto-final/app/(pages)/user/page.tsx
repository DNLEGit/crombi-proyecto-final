export default function UserPage() {
    return (
        <div>
            <div>
                <h1>User Page</h1>
            </div>

            <div>
                {/* /* From Uiverse.io by Javierrocadev */}
                <div
                    className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Create Your Profile</h2>

                    <form method="post" action="#">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="text"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                name="email"
                                id="email"
                                type="email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="bio"
                            >Bio</label>
                            <textarea
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                rows={3}
                                name="bio"
                                id="bio"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                type="submit">
                                Create Profile
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}