import React from 'react'

import NavbarClient from '../../components/navbarClients'
import ScrollItems from '../../components/scrollItems'
import Footer from '../../components/footer'

const page = () => {
  return (
    < >
      
   
      <NavbarClient/>
  

    <section className="relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
       
      
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
             

              <p className="text-black text-lg">
                “It felt more like a wellness visit than a dental appointment.”
              </p>

              <p className="mt-3 text-black/70">— Sarah M.</p>

             
            </div>

            {/* Video Card */}
                   </div>
        </div>
      </div>
    </section>

    <section className="relative gap-5 py-10 items-center   justify-center h-full  overflow-hidden">
     

      <div className='flex flex-wrap gap-5 items-center justify-center '>
      <ScrollItems/> 
      

      </div>
        
     
        </section>
        
        
       {/*this is the aboute section made by khaoula */}
       <section id="about" className="py-24 md:py-32 px-6 ">
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl ">About us</span>
     
    </div>
    <div className="grid md:grid-cols-2 gap-12 items-end">
      <p className="text-black text-lg max-w-md">
        Let's create a space that's not just beautiful — but beautifully yours.
      </p>
      <h2 className="font-display text-4xl md:text-6xl leading-[1.05] ">
        Design with purpose.<br/><em className="not-italic text-black">style with heart.</em>
      </h2>
    </div>
    <p className="mt-10 max-w-2xl text-black/80">
      At Luzen, we believe that great design goes beyond aesthetics — it should tell your story, support your lifestyle, and inspire daily living.
    </p>

    <div className="mt-16 grid md:grid-cols-2 gap-8">
      <figure className="group">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e4823b54518067c4c909e1_about-img-01.avif" alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
        </div>
        <figcaption className="mt-4 flex justify-between text-sm text-black uppercase tracking-widest">
          <span>Luzen's 001</span><span>—</span>
        </figcaption>
      </figure>
      <figure className="group md:mt-24">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e4823b6bc25cf2144acbfa_about-img-02.avif" alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
        </div>
        <figcaption className="mt-4 flex justify-between text-sm text-black uppercase tracking-widest">
          <span>Luzen's 002</span><span>—</span>
        </figcaption>
      </figure>
    </div>  
  </div>
</section>
       {/*this is the services section made by youssef */}
    <section id="events" className="py-24 md:py-32 px-6 bg-sand">
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl ">04</span>
      <span>— Events</span>
    </div>
    <h2 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] ">
      Discover our recent events and achievements.
    </h2>
    <p className="mt-6 text-black/70 max-w-xl">
      Stay updated on milestones and activities. Recent events show our dedication to growth and creativity.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-6">
      <div className="md:row-span-2 aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden">
        <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e5405301886a216066c589_event-main-img.avif" className="w-full h-full object-cover"/>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        <article className="bg-cream rounded-3xl overflow-hidden">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e547017e3a4ee99da4637a_event-01.avif" className="w-full aspect-[4/3] object-cover"/>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">01 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
          </div>
        </article>
        <article className="bg-cream rounded-3xl overflow-hidden">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e54701363b6dc9e71939b7_event-02.avif" className="w-full aspect-[4/3] object-cover"/>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">02 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
          </div>
        </article>
        <div className="sm:col-span-2 rounded-3xl bg-ink text-black p-8 md:p-10 flex items-center justify-between gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl leading-tight">Your idea · our expertise</div>
            <p className="text-black/60 mt-2 text-sm">Expert guidance and solutions for every project stage.</p>
          </div>
          <a href="#contact" className="shrink-0 rounded-full bg-cream  px-5 py-3 text-sm">Explore Services →</a>
        </div>
      </div>
    </div>
  </div>
</section>
        <section className="relative flex  h-full overflow-hidden gap-15  pt-90 items-center justify-center">
        <div className='h-140 w-1/3 bg-gray-700 rounded-3xl ' ></div>
        <div className='h-140 w-1/2 bg-gray-700 rounded-3xl ' ></div>
       
        
          
        </section>

        <section className="relative flex  h-full overflow-hidden gap-15 py-90 items-center justify-center">
        <div className='h-140 w-1/2 bg-gray-700 rounded-3xl ' ></div>
        <div className='h-140 w-1/3 bg-gray-700 rounded-3xl ' ></div>
       
        
          
          </section>
  
    <Footer/>
    </>
  )
}

export default page