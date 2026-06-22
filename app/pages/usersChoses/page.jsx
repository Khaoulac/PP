import React from 'react'
import Navbar from '../../components/navbar'
const page = () => {
  return (
    <>
    <Navbar/>
     <section className="relative min-h-screen overflow-hidden  " id='home'>
      {/* Background Image */}
      <div className="absolute inset-0">
       
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
              A calmer way to care for your smile.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
              Gentle dentistry designed to remove fear, build trust, and
              deliver confident, lasting results.
            </p>

            <div className="mt-10">
             
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col lg:items-end gap-6">
            {/* Testimonial Card */}
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

              <p className="text-white text-lg">
                “It felt more like a wellness visit than a dental appointment.”
              </p>

              <p className="mt-3 text-white/70">— Sarah M.</p>

             
            </div>

            {/* Video Card */}
                   </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default page