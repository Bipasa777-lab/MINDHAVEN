// lib/analytics.ts
export function logEvent(event: string, data?: Record<string, any>) {
  console.log("Analytics Event:", event, data);

  // Example: Send to Google Analytics or custom API
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, data || {});
  }
}

// Example usage:
// logEvent("user_signup", { email: "test@example.com" });
