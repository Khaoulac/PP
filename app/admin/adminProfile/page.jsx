'use client'
import React from 'react'   
import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Key,
  Lock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Clock,
  FileText,
  ChevronRight,
  Save,
  Globe,
  Briefcase
} from 'lucide-react';
import AdminNavbar from '@/app/components/adminNavbar';
const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailClients: true,
    emailPayments: false,
    pushOrders: true,
    pushSecurity: true,
    pushUpdates: false,
    smsAlerts: false,
    weeklyReport: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const stats = [
    { label: 'Total Orders', value: '1,284', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Revenue', value: '$48,250', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Hours', value: '342h', icon: Clock, color: 'bg-violet-50 text-violet-600' },
    { label: 'Reports', value: '156', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  ];

  const activities = [
    { action: 'Updated profile picture', time: '2 hours ago', icon: Camera },
    { action: 'Changed password', time: '3 days ago', icon: Key },
    { action: 'Enabled 2FA authentication', time: '1 week ago', icon: Shield },
    { action: 'Updated notification settings', time: '2 weeks ago', icon: Bell },
  ];

  return (
     <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <main className="flex max-w-7xl mr-auto px-4 sm:px-6 lg:pr-8 py-8">
        <div>
        <AdminNavbar/>
        </div>
        {/* Profile Hero Card */}
     <div className='ml-35'>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-slate-900" />
          <div className="px-6 sm:px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6 gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center text-white text-2xl font-bold">
                    AD
                  </div>
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-slate-900 hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 pt-2 sm:pb-2">
                <h2 className="text-2xl font-bold text-gray-900">Alex Davidson</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Super Administrator
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    San Francisco, CA
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined March 2024
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Account Active
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl mb-8 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-500">Update your personal details and contact information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="Alex Davidson"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      defaultValue="alex.davidson@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="San Francisco, CA, USA"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>

             

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      defaultValue="https://alex.davidson.dev"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                 
                  <div className="relative">
                   
                    <input
                      type="submit"
                      value='Update'
                      className="w-2/3 text-center  ml-15 pr-4 py-2.5 bg-gray-900 border border-gray-200 rounded-xl text-sm text-white cursor-pointer hover:bg-white hover:text-black transition-all "
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Experienced system administrator with 8+ years in SaaS platform management. Specialized in user management, security protocols, and system optimization."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-none"
                />
              </div>
            </div>

           
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                </div>
              </div>

              <div className="space-y-5 max-w-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Must be at least 8 characters with letters, numbers, and symbols</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>

                <button className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Enabled
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    <Key className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                    <p className="text-xs text-gray-500">Google Authenticator configured</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-slate-900 hover:underline">
                  Configure
                </button>
              </div>
            </div>

            {/* Login Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                  <p className="text-sm text-gray-500">Manage your active login sessions</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Session</p>
                      <p className="text-xs text-gray-500">San Francisco, CA • Chrome on macOS</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Active now</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Mobile App</p>
                      <p className="text-xs text-gray-500">San Francisco, CA • iPhone 15 Pro</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-red-600 hover:text-red-700">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-500">Choose how you want to be notified</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'emailOrders', label: 'New Orders', desc: 'Get notified when a new order is placed' },
                    { key: 'emailClients', label: 'New Clients', desc: 'Get notified when a new client registers' },
                    { key: 'emailPayments', label: 'Payment Updates', desc: 'Get notified about payment status changes' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-slate-900' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Push Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'pushOrders', label: 'Order Alerts', desc: 'Real-time alerts for order updates' },
                    { key: 'pushSecurity', label: 'Security Alerts', desc: 'Get notified about security events' },
                    { key: 'pushUpdates', label: 'System Updates', desc: 'Notifications about platform updates' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-slate-900' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Other */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Other</h4>
                <div className="space-y-4">
                  {[
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS' },
                    { key: 'weeklyReport', label: 'Weekly Summary', desc: 'Get a weekly digest of your activity' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-slate-900' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>

    </>
  )
}

export default page