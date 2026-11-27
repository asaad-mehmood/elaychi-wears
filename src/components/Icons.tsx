// Small inline icons (no icon library needed).
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A green cardamom (elaychi) pod: the brand mark.
export function PodMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 2.5c4.6 3.6 6.4 7.7 6.4 11 0 4.3-2.9 7.6-6.4 8-3.5-.4-6.4-3.7-6.4-8 0-3.3 1.8-7.4 6.4-11Z" fill="var(--elaychi-pod)" />
      <path d="M12 2.5c4.6 3.6 6.4 7.7 6.4 11 0 4.3-2.9 7.6-6.4 8" fill="none" stroke="var(--elaychi)" strokeWidth="1.3" />
      <path d="M12 5.5v15M8.6 9.5c1 3 1 7.5.4 10M15.4 9.5c-1 3-1 7.5-.4 10" fill="none" stroke="var(--elaychi)" strokeWidth="1" strokeLinecap="round" opacity=".75" />
    </svg>
  );
}
