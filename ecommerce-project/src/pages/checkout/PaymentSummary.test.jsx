import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PaymentSummary } from "./PaymentSummary"

describe('Payment summary coponent', () => {
    let paymentSummary;
    let loadCart;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 3,
            "productCostCents": 3984,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 3984,
            "taxCents": 398,
            "totalCostCents": 4382
        };
        loadCart = vi.fn();
    });

    it('it displays the correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items 3:')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('payment-summary-product-cost')
        ).toHaveTextContent('$39.84');

        expect(
            screen.getByTestId('payment-summary-shipping-cost')
        ).toHaveTextContent('$0.00');

        expect(
            screen.getByTestId('payment-summary-total-before-tax-cents')
        ).toHaveTextContent('$39.84');

        expect(
            screen.getByTestId('payment-summary-estimated-tax-cents')
        ).toHaveTextContent('$3.98');

        // last row 1st solution
        expect(
            screen.getByTestId('payment-summary-order-total-cents')
        ).toHaveTextContent('$43.82');

        // last row 2st solution (optional-previous solution was more clear in this case)
        expect(
            within(screen.getByTestId('payment-summary-order-total-cents'))
                .getByText('$43.82')
        ).toBeInTheDocument();
    });
});