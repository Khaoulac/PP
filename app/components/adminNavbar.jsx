import React from 'react'
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  Mail,
  
} from 'lucide-react';
import Link from 'next/link';
const adminNavbar = () => {
     const [activeTab, setActiveTab] = useState('');
     const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard,link:'/admin/dashboard'  },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, link:'/admin/orders'  },
    { id: 'clients', label: 'Clients', icon: Users ,link:'/admin/clients' },
    { id: 'Product Manager', label: 'Products Manager', icon: BarChart3,link:'/admin/productManager'  },
    { id: 'payement', label: 'Payements', icon: FileText  ,link:'/admin/payement'  },
    // { id: 'messages', label: 'Messages', icon: Mail,link:'/admin/clients'  },
    { id: 'profile', label: 'Settings', icon: Settings ,link:'/admin/adminProfile' },
  ];

  return (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1   overflow-y-auto w-60 bg-white rounded-3xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
               <Link 
                key={item.id}
                href={item.link}
              
                 
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${activeTab === item.id
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
            
               </Link> 
              );
            })}
          </nav>
    </>
  )
}

export default adminNavbar