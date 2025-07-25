const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-6">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        Welcome to <strong>CleanRide Carwash</strong>. By accessing or using our website, mobile app, or carwash services
        ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
        please do not use the Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="mb-4">
        You must be at least 18 years old to use our services. By using the Service, you represent that you meet this requirement.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Service Description</h2>
      <p className="mb-4">
        CleanRide Carwash offers vehicle cleaning services at designated locations or through mobile wash units.
        Details of available services, pricing, and scheduling are provided within our app or website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Provide accurate and complete information when booking a service.</li>
        <li>Ensure vehicle is available at the agreed time and location.</li>
        <li>Respect staff and follow safety guidelines during service delivery.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments</h2>
      <p className="mb-4">
        All services must be paid through our accepted payment methods (e.g., mobile money, card). Prices are subject
        to change but will be confirmed before final booking.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cancellations & Refunds</h2>
      <p className="mb-4">
        Cancellations must be made [insert cancellation policy, e.g., 2 hours] in advance for a full refund. Late
        cancellations or no-shows may result in a partial or no refund.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
      <p className="mb-4">
        All content and materials on our platform (logos, text, designs, etc.) are owned by CleanRide Carwash or licensed
        to us. You may not reproduce or use them without permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        CleanRide Carwash is not liable for indirect, incidental, or consequential damages. We do not guarantee
        uninterrupted or error-free service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access if you violate these Terms. You may also stop using the service at any time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms occasionally. Continued use of the Service means you agree to the updated version.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the laws of Kenya, without
        regard to conflict of law principles.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p className="mb-4">
        For any questions about these Terms, please contact us at:
      </p>
      <ul className="list-none pl-0 mb-6">
        <li><strong>CleanRide Carwash</strong></li>
        <li>Email: support@cleanride.com</li>
        <li>Phone: +254-728177993</li>
        <li>Address: Yala</li>
      </ul>

      <p className="text-sm text-gray-500 mt-6">
        By using our service, you agree to these Terms of Service.
      </p>
    </div>
  );
};

export default TermsOfService;
