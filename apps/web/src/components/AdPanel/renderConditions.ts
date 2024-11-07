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

/**
 *  On the pages mentioned, the Mobile ads will be placed directly in page instead of in the app layout.
 */
export const shouldRenderGlobalMobileAd = () => {
  const blacklistedPaths = ['/', '/home', '/cake-staking']
  return typeof window !== 'undefined' && !blacklistedPaths.includes(window.location.pathname)
}

/**
 *  On the pages mentioned, the Desktop ads will be placed directly in page instead of in the app layout.
 */
export const shouldRenderGlobalDesktopAd = () => {
  const blacklistedPaths = ['/home', '/cake-staking']
  return typeof window !== 'undefined' && !blacklistedPaths.includes(window.location.pathname)
}
