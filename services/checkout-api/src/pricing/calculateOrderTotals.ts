import { CartLine, OrderTotals } from "../../../../packages/shared-contracts/src/types";

export function calculateOrderTotals(lines: CartLine[], taxRate: number, couponRate = 0): OrderTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const discountedSubtotal = subtotal - subtotal * couponRate;

  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = Number((discountedSubtotal + tax - subtotal * couponRate).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountedSubtotal: Number(discountedSubtotal.toFixed(2)),
    tax,
    total
  };
}
