const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://dashboard-backend-5ji4.onrender.com"
    : "http://localhost:5000");

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    // ✅ Build headers safely (no undefined)
    const headers: HeadersInit = {
      ...(options.body instanceof FormData
        ? {} // Let browser set Content-Type
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });
    if (!res.ok) {
      let errMsg: string;
      try {
        const errJson = await res.json();
        errMsg = errJson.error || JSON.stringify(errJson);
      } catch {
        errMsg = await res.text();
      }
      throw new Error(`API request failed (${res.status}): ${errMsg}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ API Error [${endpoint}]:`, error);
    throw error;
  }
}

export default apiRequest;
