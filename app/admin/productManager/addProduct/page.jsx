'use client'
import React from 'react'
import  { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Home, 
  Package, 
  Info, 
  Image as ImageIcon, 
  Save, 
  Eye,
  AlertCircle,
  CheckCircle2,
  Tag,
  DollarSign,
  Boxes,
  Hash,
  FileText,
  Type
} from 'lucide-react';
import AdminNavbar from '@/app/components/adminNavbar';
const page = () => {
  
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('active');
  const [category, setCategory] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    'Electronics',
    'Clothing & Apparel',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Health & Beauty',
    'Toys & Games',
    'Food & Grocery'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2)
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 8));
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">NexusAdmin</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-emerald-700">FO</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a href="#" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </a>
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="hover:text-emerald-600 transition-colors">Products</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Add Product</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
            <p className="text-slate-500 mt-1">Create a new product listing for your store</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
              Cancel
            </button>
            <button className="px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all">
              Save as Draft
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-md shadow-emerald-200 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
                  <p className="text-sm text-slate-500">General details about your product</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g., Wireless Bluetooth Headphones"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <p className="text-xs text-red-500 mt-1.5 hidden">Product name is required</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your product features, benefits, and specifications..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">0 / 2000 characters</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none text-slate-700"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      SKU / Product Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g., PRD-2024-001"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Pricing</h2>
                  <p className="text-sm text-slate-500">Set your product pricing details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Discount Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">Leave empty for no discount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Product Images</h2>
                  <p className="text-sm text-slate-500">Upload up to 8 product images</p>
                </div>
              </div>

              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-emerald-400 bg-emerald-50/50' 
                    : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-400">
                  PNG, JPG, WEBP up to 5MB each
                </p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {images.map((img) => (
                    <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(img.id);
                          }}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      {images.indexOf(img) === 0 && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-semibold rounded-md">
                          MAIN
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Product Status</h2>
                  <p className="text-sm text-slate-500">Control product visibility</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStatus('active')}
                  className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                    status === 'active'
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    status === 'active' ? 'border-emerald-500' : 'border-slate-300'
                  }`}>
                    {status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${status === 'active' ? 'text-emerald-700' : 'text-slate-700'}`}>
                      Active
                    </p>
                    <p className="text-xs text-slate-500">Product is visible and purchasable</p>
                  </div>
                </button>

                <button
                  onClick={() => setStatus('draft')}
                  className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                    status === 'draft'
                      ? 'border-amber-500 bg-amber-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    status === 'draft' ? 'border-amber-500' : 'border-slate-300'
                  }`}>
                    {status === 'draft' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${status === 'draft' ? 'text-amber-700' : 'text-slate-700'}`}>
                      Draft
                    </p>
                    <p className="text-xs text-slate-500">Product is hidden from store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Product Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Live Preview</h3>
              </div>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative">
                  {images.length > 0 ? (
                    <img 
                      src={images[0].url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">No image uploaded</p>
                    </div>
                  )}
                  {status === 'draft' && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
                      Draft
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {document.querySelector('input[type="text"]')?.value || 'Product Name'}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-emerald-600">$0.00</span>
                    <span className="text-xs text-slate-400 line-through">$0.00</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-500">In Stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Panel */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Pro Tips</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">High-quality images</p>
                    <p className="text-xs text-slate-400 mt-0.5">Use clear, well-lit photos with a white background for best results.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Detailed descriptions</p>
                    <p className="text-xs text-slate-400 mt-0.5">Include dimensions, materials, and key features to reduce returns.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Competitive pricing</p>
                    <p className="text-xs text-slate-400 mt-0.5">Research similar products to set a competitive price point.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">SEO matters</p>
                    <p className="text-xs text-slate-400 mt-0.5">Use relevant keywords in your title and description for better search visibility.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">0</p>
                  <p className="text-xs text-slate-500 mt-1">Images</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">0</p>
                  <p className="text-xs text-slate-500 mt-1">Variants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    </>
  )
}

export default page