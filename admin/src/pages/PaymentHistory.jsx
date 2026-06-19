import React, { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, CheckCircle, Clock, Search } from "lucide-react";

function PaymentHistory({ token }) {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/history`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setPayments(response.data.payments);
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filtered = payments.filter((p) => {
    const matchSearch =
      `${p.address?.firstName} ${p.address?.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.paystackReference?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ||
      (filter === "paid" && p.payment) ||
      (filter === "pending" && !p.payment);

    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-8 animate-pulse">
        <div className="h-8 bg-muted w-48 rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      <p className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-widest text-foreground">
        Payment History
      </p>

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Total Paid",
              value: `₦${summary.totalPaid.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: <DollarSign size={16} />,
              color: "text-green-500",
              bg: "bg-green-50",
            },
            {
              label: "Total Pending",
              value: `₦${summary.totalPending.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: <Clock size={16} />,
              color: "text-yellow-500",
              bg: "bg-yellow-50",
            },
            {
              label: "Paid Orders",
              value: summary.paidCount,
              icon: <CheckCircle size={16} />,
              color: "text-primary",
              bg: "bg-secondary",
            },
            {
              label: "Pending Orders",
              value: summary.pendingCount,
              icon: <Clock size={16} />,
              color: "text-orange-500",
              bg: "bg-orange-50",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="border border-border p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${card.bg} flex items-center justify-center ${card.color} shrink-0`}
              >
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-black text-foreground truncate">
                  {card.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest leading-tight">
                  {card.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 border border-border px-3 py-2.5 flex-1">
          <Search size={14} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or reference..."
            className="text-sm outline-none bg-transparent w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-2">
          {["all", "paid", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE HEADER — desktop only */}
      <div className="hidden lg:grid grid-cols-[1fr_120px_110px_130px_100px] gap-4 px-4 py-2 bg-muted text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <p>Customer</p>
        <p>Method</p>
        <p>Amount</p>
        <p>Date</p>
        <p>Status</p>
      </div>

      {/* ROWS */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No payments found.
          </div>
        ) : (
          filtered.map((payment, i) => (
            <div
              key={i}
              className="border border-border px-4 py-4 flex flex-col lg:grid lg:grid-cols-[1fr_120px_110px_130px_100px] gap-3 lg:gap-4 lg:items-center"
            >
              {/* CUSTOMER */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {payment.address?.firstName} {payment.address?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {payment.address?.email}
                </p>
                {payment.paystackReference && (
                  <p className="text-xs text-muted-foreground font-mono truncate max-w-[220px]">
                    Ref: {payment.paystackReference}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between lg:contents">
                <div className="flex flex-col gap-0.5 lg:contents">
                  {/* METHOD */}
                  <p className="text-xs font-semibold text-foreground uppercase lg:block">
                    {payment.paymentMethod}
                  </p>

                  {/* AMOUNT */}
                  <p className="text-sm font-bold text-foreground lg:block">
                    ₦
                    {Number(payment.amount).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  {/* DATE */}
                  <p className="text-xs text-muted-foreground lg:block">
                    {new Date(payment.date).toDateString()}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 font-semibold uppercase tracking-widest shrink-0 ${
                    payment.payment
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {payment.payment ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;
