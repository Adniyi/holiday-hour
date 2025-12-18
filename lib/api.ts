const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Business {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  type?: string;
  paystack_customer_id?: string;
  payment_status: "pending" | "paid" | "failed";
  created_at: string;
  last_edited: string;
}

export interface Holiday {
  name: string;
  date: string;
  status: "closed" | "special" | "normal";
  open_time?: string;
  close_time?: string;
  notes?: string;
}

export interface RegularHours {
  [key: string]: {
    open: string;
    close: string;
  };
}

export interface Page {
  id: string;
  business_id: string;
  holidays: Holiday[];
  regular_hours: RegularHours;
  custom_css?: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  page_id: string;
  views: number;
  last_viewed?: string;
  sources: Array<{
    date: string;
    source: string;
    count: number;
  }>;
}

export interface CreateBusinessData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  type?: string;
}

export interface CreatePageData {
  business_id: string;
  holidays: Holiday[];
  regular_hours: RegularHours;
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "An error occurred" }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  businesses: {
    create: (data: CreateBusinessData) =>
      fetchAPI("/api/businesses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    get: (id: string) => fetchAPI(`/api/businesses/${id}`),
    update: (id: string, data: Partial<CreateBusinessData>, token: string) =>
      fetchAPI(`/api/businesses/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),
  },
  pages: {
    create: (data: CreatePageData) =>
      fetchAPI("/api/pages", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    get: (id: string) => fetchAPI(`/api/pages/${id}`),
    update: (id: string, data: Partial<CreatePageData>, token: string) =>
      fetchAPI(`/api/pages/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),
    getByBusinessId: (businessId: string) =>
      fetchAPI(`/api/pages/business/${businessId}`),
  },
  analytics: {
    get: (pageId: string) => fetchAPI(`/api/analytics/${pageId}`),
    incrementView: (pageId: string, source: string = "direct") =>
      fetchAPI(`/api/analytics/${pageId}/view`, {
        method: "POST",
        body: JSON.stringify({ source }),
      }),
  },
  auth: {
    requestMagicLink: (email: string, businessId: string) =>
      fetchAPI("/api/auth/magic-link", {
        method: "POST",
        body: JSON.stringify({ email, business_id: businessId }),
      }),
    verifyToken: (token: string) =>
      fetchAPI("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      }),
  },
  payment: {
    initiate: (businessId: string, email: string) =>
      fetchAPI("/api/payment/initialize", {
        method: "POST",
        body: JSON.stringify({ business_id: businessId, email }),
      }),
    verify: (reference: string) => fetchAPI(`/api/payment/verify/${reference}`),
  },
};
