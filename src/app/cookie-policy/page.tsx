
import InfoPageLayout from "@/components/InfoPageLayout";

export default function CookiePolicyPage() {
  return (
    <InfoPageLayout
      title="Cookie Policy"
      description="Learn how TradeBridge may use cookies and similar technologies to operate, secure and improve the marketplace."
    >
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website.
        They help websites remember information about your visit, such as preferences
        and session details. Similar technologies may include local storage, pixels
        and software development tools.
      </p>

      <h2>2. Why TradeBridge May Use Cookies</h2>
      <p>Cookies and similar technologies may be used to:</p>
      <ul>
        <li>Keep the website and account features working.</li>
        <li>Remember settings and preferences.</li>
        <li>Support account security and prevent misuse.</li>
        <li>Understand how visitors use the website.</li>
        <li>Improve website performance and user experience.</li>
      </ul>

      <h2>3. Types of Cookies</h2>
      <ul>
        <li><strong>Essential cookies:</strong> support core website functions, security and account sessions.</li>
        <li><strong>Preference cookies:</strong> remember choices such as language or display preferences.</li>
        <li><strong>Analytics cookies:</strong> help us understand website traffic and usage patterns, where enabled.</li>
        <li><strong>Marketing cookies:</strong> may be used to measure or personalise advertising, if such tools are introduced.</li>
      </ul>

      <h2>4. Third-Party Technologies</h2>
      <p>
        Some services integrated into TradeBridge, such as analytics, hosting,
        payment or security providers, may use their own cookies or similar
        technologies. Their use is subject to their respective privacy policies
        and settings.
      </p>

      <h2>5. Managing Cookies</h2>
      <p>
        You can manage or delete cookies through your browser settings. Blocking
        essential cookies may affect login, security or other website features.
        Where required by law, we will seek consent before using non-essential
        cookies or similar technologies.
      </p>

      <h2>6. Local Storage</h2>
      <p>
        TradeBridge may use browser storage technologies to remember certain
        information or support website functionality. You can clear locally stored
        website data through your browser settings, but doing so may sign you out
        or remove saved preferences.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy when our technologies or legal requirements
        change. The latest version will be available on this page.
      </p>

      <h2>8. Contact</h2>
      <p>
        If you have questions about cookies or privacy, please use our
        <a href="/contact"> Contact page</a>.
      </p>
    </InfoPageLayout>
  );
}
