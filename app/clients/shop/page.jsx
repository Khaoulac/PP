import React from 'react'

const page = () => {
  return (
    <>
       <main className="max-w-full  px-20 pb-24 text-black">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm text-[#8a8780] uppercase tracking-widest">
              Account
            </p>
            <h1 className="font-serif text-5xl md:text-6xl mt-2">
              My Profile
            </h1>
          </div>

          <button className="px-6 py-3 rounded-full bg-[#0f0f10] text-white hover:bg-[#2a2a2c] transition">
            Edit profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <section className="bg-white rounded-3xl p-8 lg:col-span-2 shadow-sm">
            {/* Profile header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-8 border-b border-[#f0eadf]">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#ece6dc] to-[#c9a772] flex items-center justify-center font-serif text-4xl">
                  AM
                </div>

                <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#0f0f10] text-white text-sm">
                  ✎
                </button>
              </div>

              <div>
                <h2 className="font-serif text-3xl">Amelia Morgan</h2>
                <p className="text-[#8a8780] mt-1">
                  Member since March 2023 · Gold tier
                </p>

                <div className="flex gap-2 mt-3">
                  <span className="px-4 py-2 rounded-full border bg-white text-sm">
                    Verified
                  </span>
                  <span className="px-4 py-2 rounded-full border bg-white text-sm">
                    ⭐ 4.9
                  </span>
                </div>
              </div>
            </div>

            {/* Personal info */}
            <h3 className="font-serif text-xl mt-8 mb-4">
              Personal information
            </h3>

            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-[#8a8780] mb-1">Full name</p>
                <p className="font-medium">Amelia Morgan</p>
              </div>

              <div>
                <p className="text-[#8a8780] mb-1">Email</p>
                <p className="font-medium">amelia@lume.studio</p>
              </div>

              <div>
                <p className="text-[#8a8780] mb-1">Phone</p>
                <p className="font-medium">+1 (415) 555 — 0184</p>
              </div>

              <div>
                <p className="text-[#8a8780] mb-1">Address</p>
                <p className="font-medium">221B Baker Street, London</p>
              </div>
            </div>

            {/* Orders */}
            <h3 className="font-serif text-xl mt-10 mb-4">Recent orders</h3>

            <div className="space-y-1">
              {[
                {
                  title: "Linen Throw — Sand",
                  id: "#LM-1029",
                  status: "Delivered",
                  price: "$148",
                  color: "#ece6dc",
                },
                {
                  title: "Ceramic Vase Set",
                  id: "#LM-1017",
                  status: "In transit",
                  price: "$92",
                  color: "#d4cdbf",
                },
                {
                  title: "Oak Side Table",
                  id: "#LM-0998",
                  status: "Delivered",
                  price: "$420",
                  color: "#bfb6a4",
                },
              ].map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between py-4 border-b border-[#f0eadf]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl"
                      style={{ backgroundColor: o.color }}
                    />
                    <div>
                      <p className="font-medium">{o.title}</p>
                      <p className="text-xs text-[#8a8780]">
                        {o.id} · {o.status}
                      </p>
                    </div>
                  </div>

                  <p className="font-medium">{o.price}</p>
                </div>
              ))}
            </div>

            <a
              href="/orders"
              className="text-sm underline mt-4 inline-block"
            >
              View all orders →
            </a>
          </section>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Orders", value: "24" },
                { label: "Spent", value: "$3.2k" },
                { label: "Wishlist", value: "12" },
                { label: "Points", value: "1.8k" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-3xl p-5 shadow-sm"
                >
                  <p className="text-xs text-[#8a8780] uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p className="font-serif text-4xl mt-2">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Shortcuts */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h4 className="font-serif text-lg mb-4">
                Account shortcuts
              </h4>

              {[
                ["Addresses", "/addresses"],
                ["Settings", "/settings"],
                ["Notifications", "/notifications"],
                ["Payment methods", "#"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="flex justify-between py-3 text-sm border-b border-[#f0eadf] last:border-0"
                >
                  <span>{label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            {/* Security */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h4 className="font-serif text-lg mb-2">Security</h4>
              <p className="text-sm text-[#8a8780] mb-4">
                Two-factor authentication active.
              </p>
              <button className="w-full px-6 py-3 rounded-full border border-[#ddd6c9] hover:bg-white">
                Manage security
              </button>
            </div>

            {/* Logout */}
            <button className="w-full px-6 py-3 rounded-full border border-red-200 text-red-700 hover:bg-red-50">
              Log out
            </button>
          </aside>
        </div>
      </main>
    </>
  )
}

export default page