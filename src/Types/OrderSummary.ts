export interface OrderSummary {
  price: number;
  discount: number;
  tax: number;
  total: number;
}

export interface OrderSummaryProps {
  summary: OrderSummary;
  onCheckout: () => void;
}
