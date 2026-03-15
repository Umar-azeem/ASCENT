import React from "react";

const Faq = () => {
  return (
    <>
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                1. Do you offer Cash on Delivery?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, we offer COD across Pakistan.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                2. How long does delivery take?
              </h4>
              <p className="text-gray-600 mt-1">
                2–4 working days depending on your location.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                3. How can I track my order?
              </h4>
              <p className="text-gray-600 mt-1">
                Once shipped, you’ll receive a tracking number via SMS or email.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                4. Do you offer international shipping?
              </h4>
              <p className="text-gray-600 mt-1">
                No, we currently only deliver within Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
