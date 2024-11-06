/**
 * @param start Start timestamp in seconds
 * @param end End timestamp in seconds
 * @returns boolean
 */
export const shouldRenderByTime = (start: number, end: number) => {
  const now = Date.now()
  return now >= start * 1000 && now <= end * 1000
}

/**
 * @param pages Array of page paths (Example: ['/swap', '/pool'])
 * @returns boolean
 */
export const shouldRenderOnPages = (pages: string[]) => {
  return typeof window !== 'undefined' && pages.includes(window.location.pathname)
}

// On these pages, the mobile ad will be placed directly instead of in the app layout
// This is for custom ad placement in the specific pages
export const shouldRenderGlobalMobileAd = () =>
  typeof window !== 'undefined' && !['/', '/home'].includes(window.location.pathname)
