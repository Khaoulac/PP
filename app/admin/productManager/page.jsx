'use client';
import React from 'react';
import  { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  X,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Box,
  Tag,
  Grid3X3,
  Layers,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import AdminNavbar from '@/app/components/adminNavbar';
const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 8;

  const products = [
    { id: 1, name: 'Wireless Bluetooth Headphones', sku: 'WBH-001', category: 'Electronics', stock: 45, price: 89.99, status: 'Active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Organic Green Tea Set', sku: 'OGT-002', category: 'Food & Beverage', stock: 120, price: 34.50, status: 'Active', image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=100&h=100&fit=crop' },
    { id: 3, name: 'Premium Leather Wallet', sku: 'PLW-003', category: 'Accessories', stock: 0, price: 65.00, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop' },
    { id: 4, name: 'Smart Fitness Watch', sku: 'SFW-004', category: 'Electronics', stock: 28, price: 199.99, status: 'Active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 5, name: 'Ceramic Coffee Mug Set', sku: 'CCM-005', category: 'Home & Kitchen', stock: 8, price: 42.00, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop' },
    { id: 6, name: 'Running Shoes Pro', sku: 'RSP-006', category: 'Sports', stock: 0, price: 129.99, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 7, name: 'Yoga Mat Premium', sku: 'YMP-007', category: 'Sports', stock: 55, price: 55.00, status: 'Active', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop' },
    { id: 8, name: 'Stainless Steel Water Bottle', sku: 'SSB-008', category: 'Home & Kitchen', stock: 200, price: 24.99, status: 'Active', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop' },
    { id: 9, name: 'Mechanical Keyboard RGB', sku: 'MKR-009', category: 'Electronics', stock: 15, price: 149.99, status: 'Active', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop' },
    { id: 10, name: 'Cotton T-Shirt Pack', sku: 'CTP-010', category: 'Clothing', stock: 0, price: 39.99, status: 'Inactive', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    { id: 11, name: 'Desk Lamp LED', sku: 'DLI-011', category: 'Home & Kitchen', stock: 32, price: 45.00, status: 'Active', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop' },
    { id: 12, name: 'Backpack Travel Pro', sku: 'BTP-012', category: 'Accessories', stock: 5, price: 78.50, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
  ];

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (sortOrder === 'asc') return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Inactive': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'Out of Stock': return 'bg-red-50 text-red-700 border-red-200';
      case 'Low Stock': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Inactive': return <XCircle className="w-3.5 h-3.5" />;
      case 'Out of Stock': return <XCircle className="w-3.5 h-3.5" />;
      case 'Low Stock': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStockColor = (stock, status) => {
    if (status === 'Out of Stock') return 'text-red-600';
    if (stock <= 10) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-slate-900 text-white' },
    { label: 'Active Products', value: products.filter(p => p.status === 'Active').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Out of Stock', value: products.filter(p => p.status === 'Out of Stock').length, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Revenue', value: `$${products.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString()}`, icon: DollarSign, color: 'bg-blue-50 text-blue-600' },
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
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Products</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex max-w-7xl mr-auto px-4 sm:px-6 lg:pr-8 py-8">
        <div>
            <AdminNavbar/>
        </div>
        {/* Stats Cards */}
        <div className='ml-20'>

      
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
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
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                    ))}
                  </select>
                  <Grid3X3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            {paginatedProducts.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Product
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">SKU</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('stock')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Stock
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('price')} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Price
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 md:hidden">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">{product.sku}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <Tag className="w-3.5 h-3.5 text-gray-400" />
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Box className="w-3.5 h-3.5 text-gray-400" />
                          <span className={`text-sm font-medium ${getStockColor(product.stock, product.status)}`}>
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(product.status)}`}>
                          {getStatusIcon(product.status)}
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setStatusFilter('all'); }}
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
                Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, sortedProducts.length)}</span> of <span className="font-medium text-gray-900">{sortedProducts.length}</span> products
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
          </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
              <button onClick={() => setShowDeleteModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img src={productToDelete.image} alt={productToDelete.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{productToDelete.name}</span>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Product
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