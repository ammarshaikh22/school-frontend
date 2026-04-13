import Link from "next/link";

export default function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="w-[700px] h-[400px] rounded-2xl shadow-xl overflow-hidden flex relative">

        {/* LEFT SIDE (FORM) */}
        <div
          className={`w-2/3 p-10 transition-all duration-700 `}
        >
               <div>
              <h2 className="text-2xl text-black font-semibold text-center mb-6">
                Welcome
              </h2>
              <label className="text-md mb-2 text-black">Enter your email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-black rounded-4xl p-2 mt-2 mb-4 "
              />
              <label className="text-md mb-2 text-black">Enter your password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-black rounded-4xl mt-2 p-2 mb-4 "
              />

              <p className="text-sm text-black text-center mb-4">
                Forgot password?
              </p>

              <button className="w-full bg-blue-600 text-white py-2 rounded-full">
                Sign In
              </button>
            </div>
        </div>

        {/* RIGHT SIDE (ANIMATION PANEL) */}
        <div className="w-1/3 bg-blue-600 text-white flex flex-col items-center justify-center relative">

          <h3 className="text-center px-4 mb-4">
          Don't have an account? Sign up!
          </h3>
          <Link href="/signup">
          <button
            className="border border-white px-6 py-2 rounded-full"
          >
            Sign Up
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
}