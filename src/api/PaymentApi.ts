import axios from 'axios';

const url = `http://localhost:4001/payments`;

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'credit_card',
  MOBILE_TRANSFER = 'mobile_transfer',
}

export interface InitPaymentPayload {
  email: string
  amount: number
  first_name: string
  last_name: string
  phone_number: string
  booking_id: number
  payment_method: PaymentMethod
}

interface InitPaymentResponse {
  data: {
    paystack_reference: string
    authorization_url: string
    paystack_access_code: string
    payment_status: string
    payment_date: string
    email: string
    amount: number
    currency: string
  }
  message: string
}

export const initializePayment = async (payload: InitPaymentPayload) => {
  const response = await axios.post<InitPaymentResponse>(`${url}/initialize`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const veryfyPayment = async (reference: string) => {
  const response = await axios.get(`${url}/verify/${reference}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
