"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  Gift,
  X,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import NavbarClients from "@/app/components/navbarClients";
import { getCart, setCart } from '@/app/lib/cartClient'
const page = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    let mounted = true
    getCart().then((c) => {
      if (!mounted) return
      setCartItems(Array.isArray(c) ? c : [])
    }).catch((err) => console.error('getCart error', err))
    return () => { mounted = false }
  }, [])

  // persist cart on changes
  useEffect(() => {
    setCart(cartItems).catch((err) => console.error('setCart error', err))
  }, [cartItems])

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(
            1,
            Math.min(item.quantity + delta, item.maxPerOrder),
          );
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "SAVE20") {
      setAppliedCoupon({
        code: "SAVE20",
        discount: 0.2,
        type: "percentage",
        label: "20% off",
      });
      setCouponCode("");
    } else if (code === "FREESHIP") {
      setAppliedCoupon({
        code: "FREESHIP",
        discount: 0,
        type: "shipping",
        label: "Free Shipping",
      });
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try SAVE20 or FREESHIP");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping =
    appliedCoupon?.type === "shipping" ? 0 : subtotal > 100 ? 0 : 12.99;
  const discount =
    appliedCoupon?.type === "percentage"
      ? subtotal * appliedCoupon.discount
      : 0;
  const total = subtotal + shipping - discount;
  const totalSavings = originalSubtotal - subtotal + discount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Checkout modal state & handlers
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [useNewCard, setUseNewCard] = useState(true);
  const [selectedSavedCardId, setSelectedSavedCardId] = useState(null);

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [paypalEmail, setPaypalEmail] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const openCheckout = () => {
    setUseNewCard(savedCards.length === 0);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setPaymentMethod("card");
    setIsConfirming(false);
    setOrderConfirmed(false);
    setPaymentError("");
    setSelectedSavedCardId(null);
    setCardHolder("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setSaveCard(false);
    setPaypalEmail("");
  };

  const confirmOrder = () => {
    setPaymentError("");
    if (!paymentMethod) {
      setPaymentError("Please select a payment method.");
      return;
    }

    if (paymentMethod === "card") {
      if (!useNewCard && selectedSavedCardId) {
        // using saved card - OK
      } else {
        const digits = cardNumber.replace(/\D/g, "");
        if (
          !cardHolder.trim() ||
          digits.length < 12 ||
          !/^\d{2}\/\d{2}$/.test(cardExpiry) ||
          !/^\d{3,4}$/.test(cardCvc)
        ) {
          setPaymentError(
            "Please enter valid card details (name, number, expiry MM/YY, CVC).",
          );
          return;
        }
      }
    } else if (paymentMethod === "paypal") {
      if (!paypalEmail || !paypalEmail.includes("@")) {
        setPaymentError("Please enter a valid PayPal email.");
        return;
      }
    }

    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setOrderConfirmed(true);

      if (paymentMethod === "card" && useNewCard && saveCard) {
        const newCard = {
          id: String(Date.now()),
          brand: "Card",
          last4: cardNumber.replace(/\D/g, "").slice(-4),
          exp: cardExpiry,
          name: cardHolder,
        };
        setSavedCards((prev) => [...prev, newCard]);
        setSelectedSavedCardId(newCard.id);
        setUseNewCard(false);
      }

      setCartItems([]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB]   p-4 pt-20">
      <NavbarClients />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </div>

                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </div>
                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quantity
                </div>
                <div className="col-span-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4 mb-4 md:mb-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            SKU: {item.sku}
                          </p>
                          <div className="flex items-center gap-2 mt-2 md:hidden">
                            <span className="text-sm font-bold text-gray-900">
                              {formatCurrency(item.price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price - Desktop */}
                      <div className="hidden md:col-span-2 md:flex md:flex-col md:items-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(item.originalPrice)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-200 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.maxPerOrder}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="md:hidden p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total - Desktop */}
                      <div className="hidden md:col-span-2 md:flex md:items-center md:justify-end gap-3">
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Mobile Total */}
                      <div className="md:hidden flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Total</span>
                        <span className="text-base font-bold text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Have a coupon?
                  </h3>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-sm font-medium text-emerald-700">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-xs text-emerald-600 ml-2">
                          ({appliedCoupon.label})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError("");
                        }}
                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                          couponError ? "border-red-300" : "border-gray-200"
                        }`}
                      />
                      {couponError && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-red-500">
                            {couponError}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-gray-900/20 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  Try codes: SAVE20, FREESHIP
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal ({itemCount} items)
                      </span>
                      <span className="text-gray-900 font-medium">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span
                        className={
                          shipping === 0
                            ? "text-emerald-600 font-medium"
                            : "text-gray-900 font-medium"
                        }
                      >
                        {shipping === 0 ? "Free" : formatCurrency(shipping)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-rose-600 font-medium">
                          -{formatCurrency(discount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(total)}
                        </span>
                        {totalSavings > 0 && (
                          <p className="text-xs text-emerald-600 mt-0.5">
                            You save {formatCurrency(totalSavings)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={openCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 mb-3"
                  >
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Truck className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        Free Shipping
                        <br />
                        over $100
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        Secure
                        <br />
                        Payment
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Gift className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        30-Day
                        <br />
                        Returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="bg-white rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore
              our products and find something you'll love.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
              <ArrowLeft className="w-4 h-4" />
              Start Shopping
            </button>
          </div>
        )}
      </div>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeCheckout}
          ></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 z-10">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Checkout</h3>
              <button
                onClick={closeCheckout}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {!orderConfirmed ? (
              <>
                <p className="text-sm text-gray-500 mt-2">
                  Select a payment method and confirm your order.
                </p>

                <div className="mt-4 space-y-3">
                  <label
                    className={`flex items-center gap-3 p-3 border rounded-lg ${paymentMethod === "card" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-black" >
                        Credit / Debit Card
                      </div>
                      <div className="text-xs text-gray-500 ">
                        Secure online payment
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">Card</div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 border rounded-lg ${paymentMethod === "paypal" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium  text-black">PayPal</div>
                      <div className="text-xs text-gray-500">
                        Use your PayPal account
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">PayPal</div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 border rounded-lg ${paymentMethod === "cod" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium  text-black">
                        Cash on Delivery
                      </div>
                      <div className="text-xs text-gray-500">
                        Pay when the order arrives
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">COD</div>
                  </label>
                </div>

                {paymentError && (
                  <div className="mt-3 text-sm text-rose-600">
                    {paymentError}
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="mt-4">
                    {savedCards.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500 mb-2">
                          Saved cards
                        </div>
                        {savedCards.map((card) => (
                          <label
                            key={card.id}
                            className={`flex items-center justify-between p-3 border rounded-lg ${selectedSavedCardId === card.id && !useNewCard ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {card.brand} • ****{card.last4}
                              </div>
                              <div className="text-xs text-gray-500">
                                {card.name} • {card.exp}
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="savedCard"
                              checked={
                                selectedSavedCardId === card.id && !useNewCard
                              }
                              onChange={() => {
                                setSelectedSavedCardId(card.id);
                                setUseNewCard(false);
                              }}
                              className="hidden"
                            />
                          </label>
                        ))}
                        <label
                          className={`flex items-center gap-3 p-3 border rounded-lg ${useNewCard ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
                        >
                          <input
                            type="radio"
                            name="savedCard"
                            checked={useNewCard}
                            onChange={() => setUseNewCard(true)}
                            className="hidden"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              Use a new card
                            </div>
                            <div className="text-xs text-gray-500">
                              Enter card details below
                            </div>
                          </div>
                        </label>
                      </div>
                    )}

                    {(useNewCard || savedCards.length === 0) && (
                      <div className="mt-3 space-y-2">
                        <input
                          placeholder="Cardholder name"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                        <input
                          placeholder="Card number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 border text-black rounded-lg text-sm"
                        />
                        <div className="flex gap-2">
                          <input
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="flex-1 px-3 py-2  text-black border rounded-lg text-sm"
                          />
                          <input
                            placeholder="CVC"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-24 px-3 py-2  text-black border rounded-lg text-sm"
                          />
                        </div>
                        <label className="flex items-center  text-black gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={() => setSaveCard(!saveCard)}
                            className="w-4 h-4 "
                          />
                          Save this card for next time
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-4">
                    <input
                      placeholder="PayPal email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full px-3 py-2 border text-black rounded-lg text-sm"
                    />
                  </div>
                )}

                <div className="mt-5 pt-4 border-t flex items-center justify-between">
                  <div>
                    <div className="text-sm   text-black">Total</div>
                    <div className="text-lg font-semibold  text-black">
                      {formatCurrency(total)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={closeCheckout}
                      className="px-4 py-2  text-black rounded-lg text-sm "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmOrder}
                      disabled={isConfirming}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                    >
                      {isConfirming ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-6 text-center">
                <CheckCircle2 className="mx-auto w-12 h-12 text-emerald-600" />
                <h4 className="mt-4 font-semibold">Order Confirmed</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Thank you! Your order has been placed.
                </p>
                <div className="mt-4">
                  <button
                    onClick={closeCheckout}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
