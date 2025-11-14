import { createFileRoute } from "@tanstack/react-router"
import type { Payments } from "@/types/users"
import { usePayments } from "@/hooks/payments"

export const Route = createFileRoute('/dashboard/dashboard/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: payments, isLoading } = usePayments()

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <span className="text-lg text-gray-500">Loading payments...</span>
    </div>
  )
  if (!payments || !Array.isArray(payments)) return (
    <div className="flex items-center justify-center h-64">
      <span className="text-lg text-gray-500">No payments found.</span>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Payments Receipts</h1>
      <ul className="space-y-6">
        {payments.map((payment: Payments) => (
          <li
            key={payment.payment_id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                payment.payment_status === "paid"
                  ? "bg-green-100 text-green-700"
                  : payment.payment_status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1)}
              </span>
              <span className="text-gray-500 text-sm mt-2 md:mt-0">
                {new Date(payment.payment_date).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700"><strong>Method:</strong> {payment.payment_method}</p>
                <p className="text-gray-700"><strong>Reference:</strong> {payment.paystack_reference}</p>
              </div>
              <div className="flex items-center md:justify-end">
                <span className="text-xl font-bold text-blue-700">
                  KES {Number(payment.amount).toLocaleString()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
