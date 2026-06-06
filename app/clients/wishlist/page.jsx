import React from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/product'
const page = () => {
  return (
    <>
         <Navbar/>
       <main className="max-w-full px-20 text-black py-24">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm text-[#8a8780] uppercase tracking-widest">
              Saved for later
            </p>

            <h1 className="font-serif text-5xl md:text-6xl mt-2">
              Wishlist{" "}
              <span className="text-[#8a8780] text-3xl align-middle">
                · 6
              </span>
            </h1>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
              Sort: Recent
            </button>
            <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
              Move all to cart
            </button>
          </div>
        </div>

       

        {/* Empty state */}

        <section className='flex py-20 gap-6 flex-wrap justify-center'>

            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </section>
        <section className="mt-24 bg-white rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-28 h-28 mx-auto rounded-full bg-[#ece6dc] flex items-center justify-center text-5xl">
            ♡
          </div>

          <h2 className="font-serif text-3xl mt-6">
            Your wishlist is empty
          </h2>

          <p className="text-[#8a8780] mt-2">
            Save pieces you love and we'll keep them here for later.
          </p>

          <a
            href="/product"
            className="inline-flex mt-6 px-6 py-3 rounded-full bg-[#0f0f10] text-white"
          >
            Continue shopping
          </a>
        </section>
      </main>
    </>
  )
}

export default page