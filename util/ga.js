export const GA_ID = 'G-PR8PXJSQVV'

// log the pageview with their URL
export const pageview = (url) => {
  try {
    window.gtag('config', GA_ID, {
      page_path: url,
    })
  } catch (err) {}
}

// log specific events happening.
export const event = (action, params = {}) => {
  try {
    window.gtag('event', action, { event_category: 'UI', ...params })
  } catch (err) {}
}
