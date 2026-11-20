
import InfoPageLayout from "@/components/InfoPageLayout";

export default function RefundPolicyPage() {
  return (
    <InfoPageLayout
      title="Refund Policy"
      description="Understand how refunds, cancellations and payment disputes are handled when using TradeBridge."
    >
      <p>
        This Refund Policy explains the general approach to refunds for transactions
        and services connected with TradeBridge. The applicable process depends on
        who received the payment, the payment method and the service involved.
      </p>

      <h2>1. Marketplace Transactions Between Users</h2>
      <p>
        Where a buyer pays a seller directly, the seller is generally responsible
        for addressing refund requests arising from that transaction. TradeBridge
        does not automatically receive, hold or control payments arranged directly
        between users and cannot guarantee that a seller will issue a refund.
      </p>
      <p>
        Buyers should agree on the seller's refund, return and delivery conditions
        before making payment. Keep receipts, messages and other transaction records.
      </p>

      <h2>2. Payments Collected by TradeBridge</h2>
      <p>
        If TradeBridge introduces a service for which it directly collects a payment,
        the refund terms for that service will be shown during the relevant purchase
        or checkout process. Those service-specific terms will apply together with
        this policy, subject to applicable law.
      </p>

      <h2>3. When You May Request a Refund</h2>
      <p>
        Depending on the service and applicable law, a refund request may be considered
        where:
      </p>
      <ul>
        <li>A payment was successfully collected by TradeBridge but the paid service was not provided.</li>
        <li>The same payment was collected more than once due to a verified processing error.</li>
        <li>A transaction was cancelled under the applicable service-specific cancellation terms.</li>
        <li>A refund is required by applicable consumer protection law.</li>
      </ul>
      <p>
        A request is not automatically approved simply because it is submitted.
        The circumstances and available evidence will be reviewed.
      </p>

      <h2>4. Situations That May Not Qualify</h2>
      <ul>
        <li>Change of mind after a completed transaction, where no legal or contractual refund right applies.</li>
        <li>Disputes about a direct user-to-user payment that TradeBridge did not process.</li>
        <li>Requests without sufficient transaction details to identify the payment.</li>
        <li>Losses caused by a user's failure to verify a seller, product or payment instruction, subject to applicable law.</li>
      </ul>

      <h2>5. How to Submit a Request</h2>
      <p>
        Contact TradeBridge through the <a href="/contact">Contact page</a> and provide:
      </p>
      <ul>
        <li>Your name and account email address.</li>
        <li>The date and amount of the payment.</li>
        <li>The service, order or listing involved.</li>
        <li>The payment reference or transaction ID, if available.</li>
        <li>A clear explanation of the issue and relevant supporting evidence.</li>
      </ul>
      <p>
        Do not send your password, card PIN, banking password or one-time verification
        code when requesting support.
      </p>

      <h2>6. Review and Processing</h2>
      <p>
        We may request additional information to verify a claim. If a refund is
        approved for a payment processed by TradeBridge, it will generally be sent
        through the original payment method where possible. Processing times may
        depend on the payment provider or financial institution.
      </p>

      <h2>7. Chargebacks and Payment Disputes</h2>
      <p>
        If you believe a payment was unauthorised or incorrectly processed, contact
        your bank or payment provider promptly. You may also contact TradeBridge
        where the payment relates to a TradeBridge service. Do not submit false
        or misleading payment disputes.
      </p>

      <h2>8. Statutory Rights</h2>
      <p>
        Nothing in this policy is intended to remove or reduce rights that consumers
        have under applicable Nigerian law. Where the law provides a refund or
        remedy, that legal requirement takes priority over any inconsistent wording
        in this policy.
      </p>

      <h2>9. Policy Updates</h2>
      <p>
        We may update this policy as our payment and marketplace services change.
        The current version will be published on this page.
      </p>
    </InfoPageLayout>
  );
}
