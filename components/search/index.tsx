"use server"

export default function Search() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
            <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
            <input type="text" placeholder="Search..." className="p-2 rounded-lg" />
        </div>
    );
}