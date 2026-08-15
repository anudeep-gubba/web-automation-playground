import { ROUTES } from './routes'

export interface NavItem {
  label: string
  path: string
  testId: string
}

// Order mirrors requirement.md section 4 (Application Navigation).
export const PLAYGROUND_NAV: NavItem[] = [
  { label: 'Dashboard', path: ROUTES.playground, testId: 'nav-playground-dashboard' },
  { label: 'Basic Elements', path: ROUTES.basicActions, testId: 'nav-basic-actions' },
  { label: 'Forms', path: ROUTES.forms, testId: 'nav-forms' },
  { label: 'Mouse Actions', path: ROUTES.mouse, testId: 'nav-mouse' },
  { label: 'Keyboard Actions', path: ROUTES.keyboard, testId: 'nav-keyboard' },
  { label: 'Scrolling', path: ROUTES.scrolling, testId: 'nav-scrolling' },
  { label: 'Drag & Drop', path: ROUTES.dragDrop, testId: 'nav-drag-drop' },
  { label: 'Lists', path: ROUTES.lists, testId: 'nav-lists' },
  { label: 'Tables', path: ROUTES.tables, testId: 'nav-tables' },
  { label: 'Dropdowns', path: ROUTES.dropdowns, testId: 'nav-dropdowns' },
  { label: 'Modals', path: ROUTES.dialogs, testId: 'nav-dialogs' },
  { label: 'Browser Dialogs', path: `${ROUTES.dialogs}/browser`, testId: 'nav-browser-dialogs' },
  { label: 'Iframes', path: ROUTES.iframes, testId: 'nav-iframes' },
  { label: 'Shadow DOM', path: ROUTES.shadowDom, testId: 'nav-shadow-dom' },
  { label: 'Windows & Tabs', path: ROUTES.windowsTabs, testId: 'nav-windows-tabs' },
  { label: 'Upload & Download', path: ROUTES.uploadDownload, testId: 'nav-upload-download' },
  { label: 'Cookies', path: ROUTES.cookies, testId: 'nav-cookies' },
  { label: 'Local Storage', path: ROUTES.localStorage, testId: 'nav-local-storage' },
  { label: 'Session Storage', path: ROUTES.sessionStorage, testId: 'nav-session-storage' },
  { label: 'Browser History', path: ROUTES.browserHistory, testId: 'nav-browser-history' },
  { label: 'Network', path: ROUTES.network, testId: 'nav-network' },
  { label: 'WebSocket', path: ROUTES.websocket, testId: 'nav-websocket' },
  { label: 'JavaScript', path: ROUTES.javascript, testId: 'nav-javascript' },
  { label: 'Accessibility', path: ROUTES.accessibility, testId: 'nav-accessibility' },
  { label: 'Responsive', path: ROUTES.responsive, testId: 'nav-responsive' },
  { label: 'Dynamic Elements', path: ROUTES.dynamicElements, testId: 'nav-dynamic-elements' },
  { label: 'Advanced DOM', path: ROUTES.advancedDom, testId: 'nav-advanced-dom' },
  { label: 'Date & Time', path: ROUTES.dateTime, testId: 'nav-date-time' },
  { label: 'Rich Text', path: ROUTES.richText, testId: 'nav-rich-text' },
  { label: 'Search', path: ROUTES.search, testId: 'nav-search' },
  { label: 'Tooltips & Popovers', path: ROUTES.tooltipsPopovers, testId: 'nav-tooltips-popovers' },
  { label: 'Notifications', path: ROUTES.notifications, testId: 'nav-notifications' },
  { label: 'Confirmations', path: ROUTES.confirmations, testId: 'nav-confirmations' },
  { label: 'Test Data', path: ROUTES.testData, testId: 'nav-test-data' },
]
