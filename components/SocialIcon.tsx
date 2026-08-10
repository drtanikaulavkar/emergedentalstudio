export type SocialPlatform = "Instagram" | "Facebook" | "LinkedIn";

export function SocialIcon({platform}: {platform: SocialPlatform}) {
  if (platform === "Instagram") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "Facebook") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  }

  if (platform === "LinkedIn") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM7.7 9.6h-3v8.9h3V9.6ZM6.2 4.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm12.3 8.4c0-2.6-1.4-3.8-3.2-3.8-1.5 0-2.2.8-2.6 1.4V9.6h-3v8.9h3.1v-4.4c0-1.2.2-2.3 1.7-2.3s1.5 1.4 1.5 2.4v4.3h2.5v-5.3Z"
        />
      </svg>
    );
  }

  return null;
}
