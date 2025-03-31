export default function UserPage() {
    return (
        <div>
            <div>
                <h1>User Page</h1>
            </div>

            <div>
                <form action="sing-up">
                    <div>
                        <p>Create a new user</p>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />

                        <button type="submit">Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    );
}