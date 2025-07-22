import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InitPaymentPayload } from "@/api/PaymentApi";
import { initializePayment, veryfyPayment } from "@/api/PaymentApi";

export const useInitializePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['initializePayment'],
    mutationFn: (payload: InitPaymentPayload) => initializePayment(payload),
    onSuccess: (data) => {
    }
  });
}

export const useVerifyPayment = () => {
  return useMutation({
    mutationKey: ['verifyPayment'],
    mutationFn: (reference: string) => veryfyPayment(reference),
    onSuccess: (data) => {
      const navigate = useNavigate()
      navigate({ to: '/dashboard/dashboard/MyBookings' })
      // Handle successful verification, e.g., show success message or update state
      console.log('Payment verified successfully:', data);
    },
    onError: (error) => {
      // Handle error during verification
      console.error('Payment verification failed:', error);
    }
  });
}