import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[700px] rounded-2xl shadow-xl overflow-hidden flex relative">
        {/* RIGHT SIDE (ANIMATION PANEL) */}
        <div className="w-1/3 bg-blue-600  flex flex-col items-center justify-center relative">
          <h3 className="text-center px-4 mb-4">
            Have an account? Sign in now!
          </h3>
          <Link href="/login">
            <button className="border border-white px-6 py-2 rounded-full">
              Sign In
            </button>
          </Link>
        </div>
        {/* LEFT SIDE (FORM) */}
        <div className={`w-2/3 p-10 transition-all duration-700`}>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl  text-black font-semibold text-center mb-6">
              Create Account
            </h2>
            <label className="text-md mb-2 text-black">Enter your name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-black rounded-4xl p-2 mb-6 outline-none"
            />
            <label className="text-md mb-2 text-black">Enter your email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-black rounded-4xl p-2 mb-6 outline-none"
            />
            <label className="text-md mb-2 text-black">Enter your password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-black rounded-4xl p-2 mb-4 outline-none"
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
