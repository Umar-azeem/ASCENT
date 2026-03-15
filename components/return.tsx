import React from "react";

function Return() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 border-b pb-2">
        Returns & Exchanges
      </h2>

      <p className="mb-4 text-base leading-relaxed">
        Your satisfaction is our priority. If you're not happy with your purchase, you can request a return or exchange within <span className="font-semibold">7 days</span>.
      </p>

      <ul className="list-disc list-inside space-y-2 mb-6 text-sm md:text-base">
        <li>Product must be unused and in original packaging</li>
        <li>Return shipping charges are the customer’s responsibility</li>
        <li>Refunds are processed within 5–7 business days</li>
      </ul>

      <p className="text-base">
        To request a return, please contact us at{" "}
        <strong className="text-blue-600">ascentgarments92@gmail.com</strong>.
      </p>
    </section>
  );
}

export default Return;
