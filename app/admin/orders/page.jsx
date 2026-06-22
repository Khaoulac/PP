"use client";
import React from "react";
import { useState } from "react";
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
  MoreHorizontal,
} from "lucide-react";
import * as ordersController from "@/app/lib/controllers/ordersController";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const timelineSteps = [
    { label: "Processing", completed: false },
    { label: "Shipped", completed: false },
    { label: "Out for Delivery", completed: false },
    { label: "Delivered", completed: false },
  ];

  const getPaymentStyles = (p) => {
    switch (p) {
      case "Paid":
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusStyles = (s) => {
    switch (s) {
      case "Delivered":
        return "border-emerald-100 text-emerald-700 bg-emerald-50";
      case "Shipped":
        return "border-sky-100 text-sky-600 bg-sky-50";
      case "Processing":
        return "border-amber-100 text-amber-700 bg-amber-50";
      case "Cancelled":
        return "border-rose-100 text-rose-700 bg-rose-50";
      default:
        return "border-gray-100 text-gray-700 bg-gray-50";
    }
  };

  const getStatusIcon = (s) => {
    switch (s) {
      case "Delivered":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Shipped":
        return <Truck className="w-3.5 h-3.5" />;
      case "Processing":
        return <Clock className="w-3.5 h-3.5" />;
      case "Cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError(null);
    try {
      const data = await ordersController.loadOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load orders", err);
      setOrdersError(err?.message || String(err));
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter, sortKey, sortDir]);

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const matchesId = String(o.id || o.order_id || "")
        .toLowerCase()
        .includes(q);
      const matchesClient = (o.client?.name || "").toLowerCase().includes(q);
      if (!matchesId && !matchesClient) return false;
    }
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (paymentFilter !== "all" && o.payment !== paymentFilter) return false;
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortKey === "amount" || sortKey === "id") {
      return dir * ((a[sortKey] || 0) - (b[sortKey] || 0));
    }
    if (sortKey === "date") {
      return (
        dir *
        (new Date(a.date || a.created_at || 0) -
          new Date(b.date || b.created_at || 0))
      );
    }
    const va = String(a[sortKey] || "").toLowerCase();
    const vb = String(b[sortKey] || "").toLowerCase();
    if (va < vb) return dir * -1;
    if (va > vb) return dir * 1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / itemsPerPage));
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = [
    {
      icon: Package,
      color: "bg-blue-50 text-blue-600",
      value: orders.length,
      label: "Total Orders",
    },
    {
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
      value: `$${orders.reduce((s, o) => s + (o.amount || 0), 0).toFixed(2)}`,
      label: "Total Revenue",
    },
    {
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      value: orders.filter(
        (o) => o.status === "Processing" || o.status === "Pending",
      ).length,
      label: "Pending Orders",
    },
    {
      icon: Truck,
      color: "bg-rose-50 text-rose-600",
      value: orders.filter((o) => o.status === "Cancelled").length,
      label: "Cancelled Orders",
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
                  >
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
            {loadingOrders && (
              <div className="p-8 text-center">Loading orders...</div>
            )}

            {!loadingOrders && paginatedOrders.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("id")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Order ID
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Products
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("date")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Date
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("amount")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Amount
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900 font-mono">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {order.client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.client.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate lg:hidden">
                              {order.client.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {order.products.map((product, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                            >
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
                        <span className="text-sm font-semibold text-gray-900">
                          ${order.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStyles(order.payment)}`}
                        >
                          <CreditCard className="w-3 h-3" />
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(order.status)}`}
                        >
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
            )}

            {!loadingOrders && paginatedOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No orders found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setPaymentFilter("all");
                  }}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 hidden sm:block">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(currentPage * itemsPerPage, sortedOrders.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {sortedOrders.length}
                </span>{" "}
                orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedOrder(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mb-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedOrder.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Placed on {selectedOrder.date}
                  </p>
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
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Order Status
                  </h4>
                  <div className="flex items-center justify-between">
                    {timelineSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ||
                            (selectedOrder.status === "Delivered" &&
                              index <= 3) ||
                            (selectedOrder.status === "Shipped" &&
                              index <= 1) ||
                            (selectedOrder.status === "Processing" &&
                              index === 0)
                              ? "bg-emerald-500 text-white"
                              : selectedOrder.status === "Cancelled"
                                ? "bg-red-100 text-red-400"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {selectedOrder.status === "Cancelled" &&
                          index >= 2 ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </div>
                        <p
                          className={`text-xs font-medium mt-2 ${
                            step.completed ||
                            (selectedOrder.status === "Delivered" &&
                              index <= 3) ||
                            (selectedOrder.status === "Shipped" &&
                              index <= 1) ||
                            (selectedOrder.status === "Processing" &&
                              index === 0)
                              ? "text-emerald-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Customer
                  </h4>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {selectedOrder.client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedOrder.client.name}
                      </p>
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
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Products
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.products.map((product, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <Box className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {product}
                          </span>
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
                      <span className="text-gray-900">
                        ${(selectedOrder.amount * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax (10%)</span>
                      <span className="text-gray-900">
                        ${(selectedOrder.amount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-emerald-600">Free</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        ${selectedOrder.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(selectedOrder.status)}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getPaymentStyles(selectedOrder.payment)}`}
                  >
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
                <div className="flex items-center gap-2">
                  <select
                    value={selectedStatus || ""}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={async () => {
                      if (!selectedOrder) return;
                      try {
                        await ordersController.updateOrder(selectedOrder.id, {
                          status: selectedStatus,
                        });
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === selectedOrder.id
                              ? { ...o, status: selectedStatus }
                              : o,
                          ),
                        );
                        setSelectedOrder((prev) =>
                          prev ? { ...prev, status: selectedStatus } : prev,
                        );
                      } catch (e) {
                        console.error("Failed to update order", e);
                      }
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={async () => {
                      if (!selectedOrder) return;
                      if (
                        !confirm(
                          "Delete this order? This action cannot be undone.",
                        )
                      )
                        return;
                      try {
                        await ordersController.deleteOrder(selectedOrder.id);
                        setOrders((prev) =>
                          prev.filter((o) => o.id !== selectedOrder.id),
                        );
                        setSelectedOrder(null);
                      } catch (e) {
                        console.error("Failed to delete order", e);
                      }
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
