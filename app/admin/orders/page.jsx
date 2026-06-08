'use client'
import React from 'react'
import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
  AlertTriangle,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  Box,
  ArrowUpDown,
  Download,
  Printer,
  MoreHorizontal
} from 'lucide-react';

const page = () => {
 
 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 8;

  const orders = [
    { id: 'ORD-2024-001', client: { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 123-4567', address: '123 Main St, New York, NY 10001' }, products: ['Wireless Headphones', 'Phone Case'], date: '2026-06-07', amount: 124.99, payment: 'Paid', status: 'Delivered' },
    { id: 'ORD-2024-002', client: { name: 'Michael Chen', email: 'mchen@example.com', phone: '+1 (555) 234-5678', address: '456 Oak Ave, Los Angeles, CA 90001' }, products: ['Smart Watch Pro', 'Charging Cable', 'Screen Protector'], date: '2026-06-07', amount: 289.50, payment: 'Paid', status: 'Shipped' },
    { id: 'ORD-2024-003', client: { name: 'Emma Davis', email: 'emma@example.com', phone: '+1 (555) 345-6789', address: '789 Pine Rd, Chicago, IL 60601' }, products: ['Yoga Mat', 'Water Bottle'], date: '2026-06-06', amount: 67.00, payment: 'Pending', status: 'Processing' },
    { id: 'ORD-2024-004', client: { name: 'James Wilson', email: 'james@example.com', phone: '+1 (555) 456-7890', address: '321 Elm St, Houston, TX 77001' }, products: ['Mechanical Keyboard', 'Mouse Pad'], date: '2026-06-06', amount: 178.99, payment: 'Paid', status: 'Delivered' },
    { id: 'ORD-2024-005', client: { name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 (555) 567-8901', address: '654 Maple Dr, Phoenix, AZ 85001' }, products: ['Running Shoes', 'Socks Pack'], date: '2026-06-05', amount: 145.00, payment: 'Failed', status: 'Cancelled' },
    { id: 'ORD-2024-006', client: { name: 'Robert Taylor', email: 'robert@example.com', phone: '+1 (555) 678-9012', address: '987 Cedar Ln, Seattle, WA 98101' }, products: ['Coffee Maker', 'Coffee Beans'], date: '2026-06-05', amount: 89.99, payment: 'Paid', status: 'Shipped' },
    { id: 'ORD-2024-007', client: { name: 'Jennifer Brown', email: 'jen@example.com', phone: '+1 (555) 789-0123', address: '147 Birch St, Miami, FL 33101' }, products: ['Desk Lamp', 'Notebook Set', 'Pen Holder'], date: '2026-06-04', amount: 56.50, payment: 'Pending', status: 'Processing' },
    { id: 'ORD-2024-008', client: { name: 'David Martinez', email: 'david@example.com', phone: '+1 (555) 890-1234', address: '258 Spruce Ave, Denver, CO 80201' }, products: ['Backpack', 'Travel Organizer'], date: '2026-06-04', amount: 112.00, payment: 'Paid', status: 'Delivered' },
    { id: 'ORD-2024-009', client: { name: 'Amanda White', email: 'amanda@example.com', phone: '+1 (555) 901-2345', address: '369 Willow Way, Boston, MA 02101' }, products: ['Bluetooth Speaker'], date: '2026-06-03', amount: 79.99, payment: 'Paid', status: 'Shipped' },
    { id: 'ORD-2024-010', client: { name: 'Christopher Lee', email: 'chris@example.com', phone: '+1 (555) 012-3456', address: '741 Ash Blvd, Portland, OR 97201' }, products: ['Gaming Mouse', 'Mouse Pad XL', 'Cable Management'], date: '2026-06-03', amount: 95.00, payment: 'Refunded', status: 'Cancelled' },
    { id: 'ORD-2024-011', client: { name: 'Michelle Garcia', email: 'michelle@example.com', phone: '+1 (555) 123-4560', address: '852 Poplar St, Austin, TX 78701' }, products: ['Plant Pot Set', 'Soil Mix'], date: '2026-06-02', amount: 42.50, payment: 'Paid', status: 'Delivered' },
    { id: 'ORD-2024-012', client: { name: 'Daniel Thompson', email: 'dan@example.com', phone: '+1 (555) 234-5670', address: '963 Redwood Rd, San Diego, CA 92101' }, products: ['Fitness Tracker', 'Resistance Bands'], date: '2026-06-02', amount: 134.99, payment: 'Pending', status: 'Processing' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (sortOrder === 'asc') return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Shipped': return <Truck className="w-3.5 h-3.5" />;
      case 'Processing': return <Clock className="w-3.5 h-3.5" />;
      case 'Cancelled': return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getPaymentStyles = (payment) => {
    switch (payment) {
      case 'Paid': return 'text-emerald-600 bg-emerald-50';
      case 'Pending': return 'text-amber-600 bg-amber-50';
      case 'Failed': return 'text-red-600 bg-red-50';
      case 'Refunded': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-slate-900 text-white' },
    { label: 'Pending', value: orders.filter(o => o.status === 'Processing').length, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'Completed', value: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length, icon: XCircle, color: 'bg-red-50 text-red-600' },
  ];

  const timelineSteps = [
    { label: 'Order Placed', completed: true },
    { label: 'Processing', completed: true },
    { label: 'Shipped', completed: false },
    { label: 'Delivered', completed: false },
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID or client name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            {paginatedOrders.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('id')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Order ID
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Products</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('date')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Date
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('amount')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Amount
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900 font-mono">{order.id}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {order.client.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{order.client.name}</p>
                            <p className="text-xs text-gray-500 truncate lg:hidden">{order.client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {order.products.map((product, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                              {product}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {order.date}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">${order.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStyles(order.payment)}`}>
                          <CreditCard className="w-3 h-3" />
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setPaymentFilter('all'); }}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 hidden sm:block">
                Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, sortedOrders.length)}</span> of <span className="font-medium text-gray-900">{sortedOrders.length}</span> orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-slate-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mb-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedOrder.id}</h3>
                <p className="text-sm text-gray-500 mt-0.5">Placed on {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Timeline */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Order Status</h4>
                <div className="flex items-center justify-between">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed || (selectedOrder.status === 'Delivered' && index <= 3) || (selectedOrder.status === 'Shipped' && index <= 1) || (selectedOrder.status === 'Processing' && index === 0)
                          ? 'bg-emerald-500 text-white'
                          : selectedOrder.status === 'Cancelled'
                            ? 'bg-red-100 text-red-400'
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {selectedOrder.status === 'Cancelled' && index >= 2 ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </div>
                      <p className={`text-xs font-medium mt-2 ${
                        step.completed || (selectedOrder.status === 'Delivered' && index <= 3) || (selectedOrder.status === 'Shipped' && index <= 1) || (selectedOrder.status === 'Processing' && index === 0)
                          ? 'text-emerald-600'
                          : 'text-gray-400'
                      }`}>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Customer</h4>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {selectedOrder.client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{selectedOrder.client.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      {selectedOrder.client.email}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      {selectedOrder.client.phone}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {selectedOrder.client.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Products</h4>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                          <Box className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{product}</span>
                      </div>
                      <span className="text-sm text-gray-500">Qty: 1</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t border-gray-100 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">${(selectedOrder.amount * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (10%)</span>
                    <span className="text-gray-900">${(selectedOrder.amount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getPaymentStyles(selectedOrder.payment)}`}>
                  <CreditCard className="w-3 h-3" />
                  {selectedOrder.payment}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    </>
  )
}

export default page