
"use client"
import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Filter,
  Eye,
  Download,
  Truck,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
  ArrowUpDown,
} from 'lucide-react'

const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'Shipped':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'Delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Cancelled':
      return 'bg-red-50 text-red-700 border-red-200'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'Processing':
      return <Clock className="w-3.5 h-3.5 mr-1.5" />
    case 'Shipped':
      return <Truck className="w-3.5 h-3.5 mr-1.5" />
    case 'Delivered':
      return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
    case 'Cancelled':
      return <XCircle className="w-3.5 h-3.5 mr-1.5" />
    default:
      return null
  }
}

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const [orders, setOrders] = useState([])
  const [ordersError, setOrdersError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/orders')
        if (!res.ok) {
          const t = await res.text().catch(() => '')
          throw new Error(`Failed to fetch orders (${res.status}) ${t}`)
        }
        const data = await res.json()
        if (!mounted) return
        setOrders(Array.isArray(data) ? data : [data])
      } catch (err) {
        console.error('fetchOrders error', err)
        if (mounted) setOrdersError(err.message || String(err))
      }
      finally {
        if (mounted) setLoading(false)
      }
    }
    fetchOrders()
    return () => { mounted = false }
  }, [])

  const stats = useMemo(() => {
    const total = orders.length
    const processing = orders.filter((o) => o.status === 'Processing').length
    const delivered = orders.filter((o) => o.status === 'Delivered').length
    const cancelled = orders.filter((o) => o.status === 'Cancelled').length
    return { total, processing, delivered, cancelled }
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter
      const q = searchQuery.trim().toLowerCase()
      if (!q) return matchesStatus
      const matchesSearch =
        (order.id && order.id.toLowerCase().includes(q)) ||
        (order.customer && order.customer.toLowerCase().includes(q)) ||
        (Array.isArray(order.products) && order.products.some((p) => p.toLowerCase().includes(q)))
      return matchesStatus && matchesSearch
    })
  }, [searchQuery, statusFilter, orders])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage))
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const getTotalQuantity = (quantities) => Array.isArray(quantities) ? quantities.reduce((a, b) => a + b, 0) : 0

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Orders Management</h1>
              <p className="text-gray-500 mt-1 text-sm">Manage and track all your customer orders</p>
            </div>

            {ordersError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                <strong>Error loading orders:</strong>
                <div className="text-sm mt-1">{ordersError}</div>
              </div>
            )}

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center mr-2 text-gray-500">
              <Filter className="w-4 h-4 mr-1.5" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status); setCurrentPage(1) }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500 mt-0.5">Total Orders</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
            <p className="text-sm text-gray-500 mt-0.5">Processing</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Completed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            <p className="text-sm text-gray-500 mt-0.5">Delivered</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-red-50 rounded-xl">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">Issues</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
            <p className="text-sm text-gray-500 mt-0.5">Cancelled</p>
          </div>
        </div>

        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">Order <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
                      </div>
                    </td>
                  </tr>
                ) : paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center"><Package className="w-4 h-4 text-indigo-600" /></div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                            <p className="text-xs text-gray-500">{order.customer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6"><p className="text-sm text-gray-700">{formatDate(order.date)}</p></td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-700 truncate">{Array.isArray(order.products) ? order.products.join(', ') : ''}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{Array.isArray(order.products) ? `${order.products.length} item${order.products.length > 1 ? 's' : ''}` : ''}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center"><span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700">{getTotalQuantity(order.quantities)}</span></td>
                      <td className="py-4 px-6 text-right"><p className="text-sm font-semibold text-gray-900">${Number(order.total || 0).toFixed(2)}</p></td>
                      <td className="py-4 px-6 text-center"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>{getStatusIcon(order.status)}{order.status}</span></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Download Invoice"><Download className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Track Order"><Truck className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Search className="w-8 h-8 text-gray-400" /></div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center"><Package className="w-5 h-5 text-indigo-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>{getStatusIcon(order.status)}{order.status}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700 font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{Array.isArray(order.products) ? order.products.join(', ') : ''}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{getTotalQuantity(order.quantities)} items</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-semibold text-gray-900">${Number(order.total || 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"><Eye className="w-4 h-4" />View</button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"><Download className="w-4 h-4" />Invoice</button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"><Truck className="w-4 h-4" />Track</button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-gray-400" /></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {filteredOrders.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="font-medium text-gray-900">{filteredOrders.length}</span> results</p>

            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"><ChevronLeft className="w-4 h-4" /></button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => handlePageChange(p)} className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${currentPage === p ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>{p}</button>
              ))}

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page