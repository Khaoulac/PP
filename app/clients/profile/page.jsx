
'use client'
import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Heart,
  Clock,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Star,
  Award,
  Briefcase,
  Globe,
  Link as LinkIcon,
  User
} from 'lucide-react';
import Link from 'next/link';

const page = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPayments: true,
    emailMarketing: false,
    pushOrders: true,
    pushPayments: false,
    pushUpdates: true
  });

  const [profile, setProfile] = useState({
    fullName: "Alexandra Mitchell",
    email: "alex.mitchell@company.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    joinDate: "March 15, 2022",
    bio: "Product designer and creative director with over 8 years of experience in digital design. Passionate about creating intuitive user experiences.",
   
  
  });

  const membershipLevel = "Platinum";
  const accountStatus = "Active";
  const coverImage = "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop";
  const avatarImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face";

  const stats = [
    { label: "Total Orders", value: "1,284", icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
    { label: "Total Payments", value: "$48,295", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
    { label: "Wishlist Items", value: "24", icon: Heart, color: "bg-rose-50 text-rose-600" },
    { label: "Account Age", value: "2.3 Years", icon: Clock, color: "bg-violet-50 text-violet-600" }
  ];

  const recentActivity = [
    { action: "Updated profile picture", date: "2 hours ago", icon: Camera, color: "bg-blue-500" },
    { action: "Changed password", date: "3 days ago", icon: Lock, color: "bg-amber-500" },
    { action: "Updated billing address", date: "1 week ago", icon: MapPin, color: "bg-emerald-500" },
    { action: "Enabled two-factor auth", date: "2 weeks ago", icon: Shield, color: "bg-violet-500" }
  ];

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/clients/home" className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <h1 className="text-lg font-semibold text-slate-900">Profile Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Banner */}
        <div className="relative mb-24 sm:mb-28">
          <div className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm">
           
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
          </div>
          
          {/* Profile Image */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
               
              </div>
             
            </div>
          </div>

          {/* Membership Badge */}
          
        </div>

        {/* Profile Info Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{profile.fullName}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {accountStatus}
                </span>
              </div>
              
            </div>
           
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'personal', label: 'Personal Info' },
            { id: 'security', label: 'Security' },
           
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About Card */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">About</h3>
                <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Member Since</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{profile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        )}

        {/* Personal Info Section */}
        {activeSection === 'personal' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              


              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    disabled={!editMode}
                    rows={2}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                      editMode 
                        ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!editMode}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                    editMode 
                      ? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white' 
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                />
              </div>
            </div>

            {!editMode && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Click "Edit Profile" to update your personal information.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
                  <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  Update Password
                </button>
                <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
              </div>
            </div>

         
          
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
                <p className="text-sm text-slate-500">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'emailOrders', label: 'Order Updates', description: 'Receive emails about your order status changes' },
                    { key: 'emailPayments', label: 'Payment Confirmations', description: 'Get notified when payments are processed' },
                    { key: 'emailMarketing', label: 'Marketing & Promotions', description: 'Receive special offers and product updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key] ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Push Notifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'pushOrders', label: 'Order Updates', description: 'Push notifications for order status changes' },
                    { key: 'pushPayments', label: 'Payment Alerts', description: 'Get push alerts for payment activity' },
                    { key: 'pushUpdates', label: 'System Updates', description: 'Notifications about platform updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                          notifications[item.key] ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Save Preferences
              </button>
              <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                Reset to Default
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default page;