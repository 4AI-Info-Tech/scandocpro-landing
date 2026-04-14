interface ProgrammaticAnalyticsProperties {
  family: string;
  slug: string;
  target_keyword: string;
  cta_type?: string;
  destination_url?: string;
}

let hasAttemptedInit = false;

async function getPosthog() {
  if (typeof window === 'undefined') {
    return null;
  }

  const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return null;
  }

  const module = await import('posthog-js');
  return module.default;
}

export async function initAnalytics(): Promise<void> {
  if (hasAttemptedInit || typeof window === 'undefined') {
    return;
  }

  hasAttemptedInit = true;

  const posthog = await getPosthog();
  if (!posthog) {
    return;
  }

  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    capture_pageview: false,
  });
}

export function trackProgrammaticEvent(
  eventName:
    | 'programmatic_page_view'
    | 'programmatic_primary_cta_click'
    | 'programmatic_secondary_cta_click'
    | 'programmatic_related_page_click',
  properties: ProgrammaticAnalyticsProperties,
): void {
  if (typeof window === 'undefined') {
    return;
  }

  void getPosthog().then((posthog) => {
    posthog?.capture(eventName, properties);
  });
}
