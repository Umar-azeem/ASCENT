import React from "react";

function Size() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-3xl font-bold mb-4 text-center">Size Guide</h2>
      <p className="text-center mb-8">
        We want your clothes to fit perfectly! Use the charts below to find your correct size.
      </p>

      {/* Men’s Sizes */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Men’s Sizes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Chest (inches)</th>
                <th className="border px-4 py-2">Waist (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">S</td>
                <td className="border px-4 py-2">36-38</td>
                <td className="border px-4 py-2">30-32</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">M</td>
                <td className="border px-4 py-2">39-41</td>
                <td className="border px-4 py-2">33-35</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">L</td>
                <td className="border px-4 py-2">42-44</td>
                <td className="border px-4 py-2">36-38</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Women’s Sizes */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Women’s Sizes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Bust (inches)</th>
                <th className="border px-4 py-2">Waist (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">S</td>
                <td className="border px-4 py-2">32-34</td>
                <td className="border px-4 py-2">26-28</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">M</td>
                <td className="border px-4 py-2">35-37</td>
                <td className="border px-4 py-2">29-31</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">L</td>
                <td className="border px-4 py-2">38-40</td>
                <td className="border px-4 py-2">32-34</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Kids’ Sizes */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Kids’ Sizes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Height (inches)</th>
                <th className="border px-4 py-2">Chest (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">3-4 Y</td>
                <td className="border px-4 py-2">38-41</td>
                <td className="border px-4 py-2">22-23</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">5-6 Y</td>
                <td className="border px-4 py-2">42-45</td>
                <td className="border px-4 py-2">24-25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Size;
