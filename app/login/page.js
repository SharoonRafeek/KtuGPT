export default function Login() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="tex-black w-1/2 bg-slate-400 h-1/2 rounded-md flex flex-col space-y-5 justify-center items-center">
                <input type="text" className="rounded-md px-4 h-8" placeholder="User Name"/>
                <input type="text" className="rounded-md px-4 h-8" placeholder="Password"/>
                <button className="bg-black text-white px-4 rounded-md h-8">Login</button>
            </div>
        </div>
    );
}