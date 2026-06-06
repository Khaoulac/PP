import React from 'react'
import Navbar from '../../components/navbar'
const page = () => {
  return (
    <>
        <Navbar/>
      <main className="max-w-full text-black  px-20 py-24">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm text-[#8a8780] uppercase tracking-widest">
              History
            </p>
            <h1 className="font-serif text-5xl md:text-6xl mt-2">
              Your orders
            </h1>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
              All
            </button>
            <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
              In transit
            </button>
            <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
              Delivered
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {/* Order 1 */}
          <article className="bg-white rounded-3xl p-7 shadow-sm">
            <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
              <div className="flex gap-8 flex-wrap text-sm">
                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Order
                  </p>
                  <p className="font-medium mt-1">#LM-1042</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Placed
                  </p>
                  <p className="font-medium mt-1">Jun 2, 2026</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Total
                  </p>
                  <p className="font-medium mt-1">$803.84</p>
                </div>
              </div>

              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                In transit
              </span>
            </header>

            <div className="flex flex-wrap justify-between items-center gap-4 pt-5">
              <div className="flex gap-2 flex-wrap">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ece6dc] to-[#c9a772]" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4cdbf] to-[#3a322b]" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f0eadf] to-[#8a7a66]" />
                <div className="w-14 h-14 rounded-xl bg-[#ece6dc] flex items-center justify-center text-xs text-[#8a8780]">
                  +1
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
                  Track order
                </button>
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Invoice
                </button>
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Reorder
                </button>
              </div>
            </div>
          </article>

          {/* Order 2 */}
          <article className="bg-white rounded-3xl p-7 shadow-sm">
            <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
              <div className="flex gap-8 flex-wrap text-sm">
                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Order
                  </p>
                  <p className="font-medium mt-1">#LM-1029</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Placed
                  </p>
                  <p className="font-medium mt-1">May 18, 2026</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Total
                  </p>
                  <p className="font-medium mt-1">$148.00</p>
                </div>
              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                Delivered
              </span>
            </header>

            <div className="flex justify-between items-center gap-4 pt-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ece6dc] to-[#c9a772]" />

              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Track order
                </button>
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Invoice
                </button>
                <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
                  Reorder
                </button>
              </div>
            </div>
          </article>

          {/* Order 3 */}
          <article className="bg-white rounded-3xl p-7 shadow-sm">
            <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
              <div className="flex gap-8 flex-wrap text-sm">
                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Order
                  </p>
                  <p className="font-medium mt-1">#LM-1017</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Placed
                  </p>
                  <p className="font-medium mt-1">May 3, 2026</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Total
                  </p>
                  <p className="font-medium mt-1">$92.00</p>
                </div>
              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                Delivered
              </span>
            </header>

            <div className="flex justify-between items-center gap-4 pt-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f0eadf] to-[#8a7a66]" />

              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Invoice
                </button>
                <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
                  Reorder
                </button>
              </div>
            </div>
          </article>

          {/* Order 4 */}
          <article className="bg-white rounded-3xl p-7 shadow-sm">
            <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
              <div className="flex gap-8 flex-wrap text-sm">
                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Order
                  </p>
                  <p className="font-medium mt-1">#LM-0998</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Placed
                  </p>
                  <p className="font-medium mt-1">Apr 14, 2026</p>
                </div>

                <div>
                  <p className="text-[#8a8780] text-xs uppercase tracking-widest">
                    Total
                  </p>
                  <p className="font-medium mt-1">$420.00</p>
                </div>
              </div>

              <span className="px-4 py-2 rounded-full bg-stone-200 text-stone-700 text-xs font-medium">
                Cancelled
              </span>
            </header>

            <div className="flex justify-between items-center gap-4 pt-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4cdbf] to-[#3a322b]" />

              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
                  Refund details
                </button>
                <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
                  Reorder
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

    </>
  )
}

export default page