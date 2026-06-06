import React from 'react'

const footer = () => {
  return (
    <>

    <footer id='contact' className="  relative  text-black overflow-hidden border-t border-black/10">
      {/* Big background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-[-20deg]">
          C
        </h1>
        <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-[10deg]">
          e
        </h1>
        <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-[-10deg]">
          r
        </h1>
        <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none">
          a
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">Cera</h2>
            <p className="text-sm text-gray-400 mt-3">
              Modern SaaS experience built for performance and scale.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-800 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Updates</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-800 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-800 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Cera. All rights reserved.</p>
          <p>Built with modern UI & Tailwind CSS</p>
        </div>
      </div>
    </footer>
 
    </>
  )
}

export default footer