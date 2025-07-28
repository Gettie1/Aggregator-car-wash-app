import { createFileRoute } from "@tanstack/react-router"
import type { Payments } from "@/types/users"
import { usePayments } from "@/hooks/payments"

export const Route = createFileRoute('/dashboard/dashboard/payments')({
  component: RouteComponent,
})
function RouteComponent() {
  const { data: payments, isLoading } = usePayments()

  if (isLoading) return <div>Loading payments...</div>
  if (!payments || !Array.isArray(payments)) return <div>No payments found.</div>

  return (
    <div>
      <h1>Payments</h1>
      <ul>
        {payments.map((payment: Payments) => (
          <li key={payment.payment_id} className="mb-4 border p-4 rounded shadow-sm">
            <p><strong>Status:</strong> {payment.payment_status}</p>
            <p><strong>Method:</strong> {payment.payment_method}</p>
            <p><strong>Reference:</strong> {payment.paystack_reference}</p>
            <p><strong>Date:</strong> {new Date(payment.payment_date).toLocaleString()}</p>
            <p><strong>Amount:</strong> KES {Number(payment.amount).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
