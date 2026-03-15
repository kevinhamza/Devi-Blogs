export default function Home() {
  return (
      <div className="max-w-5xl mx-auto mt-16 px-4 space-y-10">
        <div className="space-y-4 text-center">
              <h1 className="text-5xl font-bold text-white tracking-tight">
                Welcome To Devi Blogs
              </h1>
              <p className="text-gray-400 text-lg">
                  Building in Public. Learning full-stack.
              </p>
          </div>
          <div className="bg-[#020617]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                  About This Project
              </h2>
              <p className="text-gray-300 text-lg">
                  Devi Blogs is a blog platform built with <span className="text-emerald-400 font-medium">Next.js</span>, <span className="text-emerald-400 font-medium">Firebase</span>, and <span className="text-emerald-400 font-medium">Tailwind CSS</span>.
              </p>
              <p>test creds : username: admin@admin.com , password :admin1234 for edit and make blogs.</p>
          </div>
      </div>
  );
}
