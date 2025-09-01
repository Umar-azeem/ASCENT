import React from "react";

function Shipping() {
  return (
    <div className="max-w-2xl mx-auto my-4 px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Shipping Information
      </h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <span className="font-semibold text-gray-900">Local Delivery:</span>{" "}
          2–4 business days within Pakistan
        </li>
        <li>
          <span className="font-semibold text-gray-900">Shipping Partner:</span>{" "}
          TCS, Leopards, or Pakistan Post
        </li>
        <li>
          <span className="font-semibold text-gray-900">Charges:</span> Rs. 200 flat rate{" "}
          <span className="text-green-600 font-medium">(Free over Rs. 2,500)</span>
        </li>
        <li>
          <span className="font-semibold text-gray-900">International Shipping:</span>{" "}
          Currently not available
        </li>
      </ul>

      <p className="mt-6 text-sm text-gray-600">
        <span className="font-semibold text-red-500">Note:</span> Please ensure your shipping
        address is correct. We are not responsible for delays due to incorrect addresses.
      </p>
    </div>
  );
}

export default Shipping;
