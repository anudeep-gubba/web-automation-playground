// Central route map. Keep in sync with README "Routes" section.
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  accessDenied: '/access-denied',

  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
  adminDashboard: '/admin',
  userManagement: '/admin/users',

  playground: '/playground',
  basicActions: '/playground/basic-actions',
  forms: '/playground/forms',
  mouse: '/playground/mouse',
  keyboard: '/playground/keyboard',
  scrolling: '/playground/scrolling',
  dragDrop: '/playground/drag-drop',
  lists: '/playground/lists',
  tables: '/playground/tables',
  dropdowns: '/playground/dropdowns',
  dialogs: '/playground/dialogs',
  iframes: '/playground/iframes',
  shadowDom: '/playground/shadow-dom',
  windowsTabs: '/playground/windows-tabs',
  uploadDownload: '/playground/upload-download',
  cookies: '/playground/cookies',
  localStorage: '/playground/local-storage',
  sessionStorage: '/playground/session-storage',
  browserHistory: '/playground/browser-history',
  network: '/playground/network',
  websocket: '/playground/websocket',
  javascript: '/playground/javascript',
  accessibility: '/playground/accessibility',
  responsive: '/playground/responsive',
  dynamicElements: '/playground/dynamic',
  advancedDom: '/playground/advanced-dom',
  dateTime: '/playground/date-time',
  richText: '/playground/rich-text',
  search: '/playground/search',
  tooltipsPopovers: '/playground/tooltips-popovers',
  notifications: '/playground/notifications',
  confirmations: '/playground/confirmations',
  testData: '/playground/test-data',

  errorDemo: '/errors',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

// Popup target used by the Windows & Tabs module, kept as its own route so it
// can be opened via window.open() and still deep-link correctly.
export const POPUP_ROUTE = '/playground/windows-tabs/popup'

// Route used by the History module's "Page A/B/C" navigation targets.
export const historyPageRoute = (page: 'a' | 'b' | 'c') => `/playground/browser-history/page-${page}`
