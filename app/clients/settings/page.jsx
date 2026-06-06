import React from 'react'
import Navbar from '../../components/navbar'
const page = () => {
  return (
    <>
    
    <Navbar/>
 <main className="max-w-full  px-20 pb-24 pt-20 text-black">
        <p className="text-sm text-[#8a8780] uppercase tracking-[0.2em] mb-2">
          Account
        </p>

        <h1 className="font-serif text-5xl md:text-6xl mb-10">Settings</h1>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white rounded-3xl p-4 shadow-sm h-fit sticky top-6">
            <div className="space-y-1">
              <a
                href="#sec"
                className="block px-4 py-3 rounded-xl bg-[#ece6dc]"
              >
                Security
              </a>
              <a
                href="#email"
                className="block px-4 py-3 rounded-xl hover:bg-[#ece6dc]"
              >
                Email preferences
              </a>
              <a
                href="#notif"
                className="block px-4 py-3 rounded-xl hover:bg-[#ece6dc]"
              >
                Notifications
              </a>
              <a
                href="#priv"
                className="block px-4 py-3 rounded-xl hover:bg-[#ece6dc]"
              >
                Privacy
              </a>
              <a
                href="#rec"
                className="block px-4 py-3 rounded-xl hover:bg-[#ece6dc]"
              >
                Recommendations
              </a>
              <a
                href="#danger"
                className="block px-4 py-3 rounded-xl text-red-700 hover:bg-red-50"
              >
                Danger Zone
              </a>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            {/* Security */}
            <section
              id="sec"
              className="bg-white rounded-3xl p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl">Change Password</h2>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-[#8a8780] mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-[#ddd6c9] rounded-2xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8a8780] mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-[#ddd6c9] rounded-2xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8a8780] mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-[#ddd6c9] rounded-2xl px-4 py-3"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-full bg-[#0f0f10] text-white hover:bg-[#2a2a2c] transition">
                  Update Password
                </button>

                <button className="px-6 py-3 rounded-full border border-[#ddd6c9] hover:bg-white transition">
                  Enable 2FA
                </button>
              </div>
            </section>

            {/* Email Preferences */}
            <section
              id="email"
              className="bg-white rounded-3xl p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl">Email Preferences</h2>

              <div className="mt-4 divide-y">
                {[
                  {
                    title: "Order receipts",
                    desc: "Always sent — required.",
                    active: true,
                  },
                  {
                    title: "Weekly edit",
                    desc: "New arrivals & editorial picks.",
                    active: true,
                  },
                  {
                    title: "Promotions",
                    desc: "Sales and exclusive offers.",
                    active: false,
                  },
                  {
                    title: "Back-in-stock alerts",
                    desc: "For items in your wishlist.",
                    active: true,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[#8a8780]">{item.desc}</p>
                    </div>

                    <div
                      className={`w-11 h-6 rounded-full relative ${
                        item.active ? "bg-[#0f0f10]" : "bg-[#ddd6c9]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                          item.active ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section
              id="notif"
              className="bg-white rounded-3xl p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl">Notification Settings</h2>

              <div className="mt-4 divide-y">
                {[
                  {
                    title: "Push notifications",
                    desc: "On your devices.",
                    active: true,
                  },
                  {
                    title: "SMS updates",
                    desc: "Delivery alerts only.",
                    active: true,
                  },
                  {
                    title: "In-app banners",
                    desc: "Surface inside the storefront.",
                    active: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[#8a8780]">{item.desc}</p>
                    </div>

                    <div
                      className={`w-11 h-6 rounded-full relative ${
                        item.active ? "bg-[#0f0f10]" : "bg-[#ddd6c9]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${
                          item.active ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy */}
            <section
              id="priv"
              className="bg-white rounded-3xl p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl">Privacy</h2>

              <div className="mt-4 divide-y">
                {[
                  {
                    title: "Personalised recommendations",
                    desc: "Uses browsing history.",
                    active: true,
                  },
                  {
                    title: "Share data with partners",
                    desc: "For analytics & ads.",
                    active: false,
                  },
                  {
                    title: "Public profile",
                    desc: "Allow reviews to show your name.",
                    active: true,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[#8a8780]">{item.desc}</p>
                    </div>

                    <div
                      className={`w-11 h-6 rounded-full relative ${
                        item.active ? "bg-[#0f0f10]" : "bg-[#ddd6c9]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${
                          item.active ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 px-6 py-3 rounded-full border border-[#ddd6c9]">
                Download My Data
              </button>
            </section>

            {/* Recommendations */}
            <section
              id="rec"
              className="rounded-3xl p-7 shadow-sm bg-gradient-to-br from-white to-[#ece6dc]"
            >
              <h2 className="font-serif text-2xl">
                Security Recommendations
              </h2>

              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-green-600">✓</span>
                  Two-factor authentication is active.
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600">✓</span>
                  No suspicious sign-ins in the last 30 days.
                </li>

                <li className="flex gap-3">
                  <span className="text-amber-600">!</span>
                  Add a backup email for account recovery.
                  <a href="#" className="underline">
                    Add
                  </a>
                </li>

                <li className="flex gap-3">
                  <span className="text-amber-600">!</span>
                  Your password was set 8 months ago. Consider rotating.
                </li>
              </ul>
            </section>

            {/* Danger Zone */}
            <section
              id="danger"
              className="bg-white rounded-3xl p-7 border border-red-100 shadow-sm"
            >
              <h2 className="font-serif text-2xl text-red-700">
                Delete Account
              </h2>

              <p className="text-[#8a8780] mt-2 max-w-xl">
                Permanently remove your Lumé account, order history,
                addresses, and saved payment methods. This action cannot
                be undone.
              </p>

              <button className="mt-5 px-6 py-3 rounded-full bg-red-700 text-white hover:bg-red-800 transition">
                Delete My Account
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default page