import React from 'react'
import Card from '../../components/product'
import Footer from '../../components/footer'
import NavbarClients from '@/app/components/navbarClients'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'

const page = async () => {
  const res = await fetch(`${API_BASE}/api/products`, { cache: 'no-store' })
  let products = []
  try {
    if (!res.ok) {
      const t = await res.text().catch(() => '')
      throw new Error(`Failed to fetch products (${res.status}) ${t}`)
    }
    const data = await res.json()
    products = Array.isArray(data) ? data : (data ? [data] : [])
  } catch (err) {
    console.error('Products page fetch error', err)
  }

  return (
    <>
      <NavbarClients/>
   <section className="hero relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
       
        <video
                src="/videos/hero.mp4"
                poster="/images/hero1.jpeg"
                autoPlay
                muted
                loop
                playsInline
                  className="w-full h-full object-cover rounded-2xl"
                // className="w-full h-48 md:h-64 object-cover rounded-3xl"
              >
                Your browser does not support the video tag.
              </video>
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
      <div className='flex flex-wrap items-center justify-center my-30 text-black gap-10'>
   
{/* <select className="w-45 px-4 py-3 border  border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select> */}

<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>


      </div>

      <div className='flex flex-wrap gap-5 items-center justify-center '>
        {products.length > 0 ? (
          products.map((p) => <Card key={p.id ?? p.slug ?? Math.random()} product={p} />)
        ) : (
          <div className="text-center w-full py-12 text-gray-500">No products available</div>
        )}
      </div>
        
     
        </section>

        <Footer/>
    </>
  )
}

export default page
