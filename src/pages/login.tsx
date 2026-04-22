import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());

        // Send data to an internal API URL
        try {            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });
            const data = await response.json();
            
            if(data.success) {
                navigate('/')
            } else {
                alert("Invalid username or password")
            }             
        } catch (error) {
            console.error('Error:', error);
            alert("Error logging in")
        }
    };

return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" onSubmit={handleLogin}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******************"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    </div>
)
}