import type { ContactPayload, InterestPayload, SiteContent } from '@/types/site';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchSiteContent() {
  const response = await fetch('/api/content/site');
  return handleResponse<SiteContent>(response);
}

export async function submitContact(payload: ContactPayload) {
  const response = await fetch('/api/forms/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return handleResponse<{ success: boolean; message: string }>(response);
}

export async function submitInterest(payload: InterestPayload) {
  const response = await fetch('/api/forms/interest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return handleResponse<{ success: boolean; message: string }>(response);
}

