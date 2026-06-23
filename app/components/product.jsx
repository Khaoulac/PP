"use client"
import React, { useEffect, useState } from 'react'
import { addToCartApi } from '@/app/lib/cartClient'

const Product = ({ product: initialProduct = null, productId = null }) => {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(!initialProduct)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchProduct = async () => {
      if (initialProduct) return
      setLoading(true)
      setError(null)
      try {
        const base = 'http://127.0.0.1:8000/api/products'
        const url = productId ? `${base}/${productId}` : base
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
        const data = await res.json()
        // If endpoint returns collection when hitting /api/products, pick the first item
        const p = Array.isArray(data) ? data[0] : data
        if (mounted) setProduct(p)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProduct()
    return () => { mounted = false }
  }, [initialProduct, productId])

  const handleAddToCart = async (e) => {
    e.preventDefault()
    try {
      await addToCartApi(product || { id: null, name: 'Unknown', price: 0, image: '/images/img1.jpeg' })
      alert('Added to cart')
    } catch (err) {
      console.error(err)
      alert('Failed to add to cart')
    }
  }

  const rawImg = product?.images_urls?.[0] || (Array.isArray(product?.images) ? product.images[0] : null)
  let imageUrl = '/images/img1.jpeg'
  if (rawImg) {
    if (typeof rawImg === 'string' && (rawImg.startsWith('http://') || rawImg.startsWith('https://'))) {
      imageUrl = rawImg
    } else if (typeof rawImg === 'string') {
      const p = rawImg.replace(/^\//, '')
      imageUrl = `http://127.0.0.1:8000/${p}`
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-80 bg-white rounded-3xl p-6 shadow-sm">Loading...</div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-80 bg-white rounded-3xl p-6 shadow-sm">Error: {error}</div>
    )
  }

  return (
    <>
      <div className="group cursor-pointer  w-full max-w-80">
        <div className="bg-white rounded-3xl overflow-hidden border h-90 border-gray-100 transition-all duration-500 hover:shadow-2xl">

          {/* Image Area */}
          <div className="relative overflow-hidden  aspect-[5/4] bg-gray-50">

            {/* Main Image */}
            <img
              src={product?.image || imageUrl}
              alt={product?.name ?? 'Product Image'}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/img1.jpeg'; }}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />

            <div className="absolute top-4 left-4 z-10"></div>
            <button
              onClick={handleAddToCart}
              className={`
                absolute
                bottom-4
                left-4
                right-4
                bg-black
                text-white
                rounded-2xl
                py-3
                flex
                items-center
                justify-center
                gap-2
                translate-y-20
                opacity-0
                transition-all
                duration-500
                group-hover:translate-y-0
                group-hover:opacity-100
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>

              Add to Cart
            </button>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">

            {/* Category */}
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              {product?.category?.name ?? 'General'}
            </span>

            {/* Product Name */}
            <h3 className="mt-1 text-md font-semibold text-gray-900">
              {product?.name ?? 'Product'}
            </h3>

            {/* Price */}
            <div className="mt-1 flex items-center justify-between">

              <span className="text-2xl font-bold text-gray-900">
                ${product?.price ?? 0}
              </span>

              <span className="text-sm text-gray-400">
                USD
              </span>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Product