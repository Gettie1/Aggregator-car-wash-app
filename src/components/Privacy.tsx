const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Effective Date: {new Date().toLocaleDateString()}</p>

      <p className="mb-4">
        At <strong>CleanRide Carwash</strong>, your privacy is important to us. This Privacy Policy explains how we collect,
        use, store, and protect your personal information when you use our carwash services and related platforms
        (website and mobile app, collectively the "System").
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personal Information:</strong> Name, phone number, email, vehicle details, location (if enabled), payment info.</li>
        <li><strong>Non-Personal Information:</strong> Device info, browser type, IP address, pages visited.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and improve services</li>
        <li>Confirm bookings and updates</li>
        <li>Process payments</li>
        <li>Customer support</li>
        <li>Promotions (only with consent)</li>
        <li>Security and fraud prevention</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We <strong>do not sell</strong> your information. We may share data with payment processors, service providers, or
        authorities (if legally required), all under confidentiality agreements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention</h2>
      <p className="mb-4">
        We retain personal data as long as needed for service delivery, legal compliance, and dispute resolution.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Access your data</li>
        <li>Correct inaccurate info</li>
        <li>Request deletion (unless legally required to retain it)</li>
        <li>Opt out of marketing emails</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Security</h2>
      <p className="mb-4">
        We implement security measures like encryption, secure servers, and access controls. However, no online method
        is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Children's Privacy</h2>
      <p className="mb-4">
        Our services are not intended for users under 18. We do not knowingly collect data from children.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy periodically. Changes will be posted with an updated effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p className="mb-2">For any questions, please contact:</p>
      <ul className="list-none pl-0 mb-4">
        <li><strong>CleanRide Carwash</strong></li>
        <li>Email: support@cleanride.com</li>
        <li>Phone: +254-728-177-993</li>
        <li>Address: Yala</li>
      </ul>

      <p className="text-sm text-gray-500 mt-6">
        By using our service, you agree to the terms of this Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
