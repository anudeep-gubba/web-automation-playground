import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PlaygroundLayout } from '@/components/layout/PlaygroundLayout'
import { ProtectedRoute, RoleRoute, GuestOnlyRoute } from '@/components/layout/ProtectedRoute'
import { ROUTES } from '@/constants/routes'

import { HomePage } from '@/pages/home/HomePage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { RegistrationSuccessPage } from '@/pages/auth/RegistrationSuccessPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage'

import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ProfilePage } from '@/pages/dashboard/ProfilePage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
import { AdminDashboardPage } from '@/pages/dashboard/AdminDashboardPage'
import { UserManagementPage } from '@/pages/dashboard/UserManagementPage'

import { AccessDeniedPage } from '@/pages/errors/AccessDeniedPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { ErrorDemoPage } from '@/pages/errors/ErrorDemoPage'

import { PlaygroundDashboardPage } from '@/pages/playground/PlaygroundDashboardPage'
import { BasicActionsPage } from '@/pages/playground/basic-actions/BasicActionsPage'
import { FormsPage } from '@/pages/playground/forms/FormsPage'
import { MousePage } from '@/pages/playground/mouse/MousePage'
import { KeyboardPage } from '@/pages/playground/keyboard/KeyboardPage'
import { ScrollingPage } from '@/pages/playground/scrolling/ScrollingPage'
import { DragDropPage } from '@/pages/playground/drag-drop/DragDropPage'
import { ListsPage } from '@/pages/playground/lists/ListsPage'
import { TablesPage } from '@/pages/playground/tables/TablesPage'
import { DropdownsPage } from '@/pages/playground/dropdowns/DropdownsPage'
import { ModalsPage } from '@/pages/playground/dialogs/ModalsPage'
import { BrowserDialogsPage } from '@/pages/playground/dialogs/BrowserDialogsPage'
import { IframesPage } from '@/pages/playground/iframes/IframesPage'
import { IframeChildPage } from '@/pages/playground/iframes/IframeChildPage'
import { IframeNestedChildPage } from '@/pages/playground/iframes/IframeNestedChildPage'
import { ShadowDomPage } from '@/pages/playground/shadow-dom/ShadowDomPage'
import { WindowsTabsPage } from '@/pages/playground/windows-tabs/WindowsTabsPage'
import { PopupPage } from '@/pages/playground/windows-tabs/PopupPage'
import { UploadDownloadPage } from '@/pages/playground/upload-download/UploadDownloadPage'
import { CookiesPage } from '@/pages/playground/cookies/CookiesPage'
import { LocalStoragePage } from '@/pages/playground/local-storage/LocalStoragePage'
import { SessionStoragePage } from '@/pages/playground/session-storage/SessionStoragePage'
import { BrowserHistoryPage } from '@/pages/playground/browser-history/BrowserHistoryPage'
import { HistorySubPage } from '@/pages/playground/browser-history/HistorySubPage'
import { NetworkPage } from '@/pages/playground/network/NetworkPage'
import { WebSocketPage } from '@/pages/playground/websocket/WebSocketPage'
import { JavaScriptPage } from '@/pages/playground/javascript/JavaScriptPage'
import { AccessibilityPage } from '@/pages/playground/accessibility/AccessibilityPage'
import { ResponsivePage } from '@/pages/playground/responsive/ResponsivePage'
import { DynamicElementsPage } from '@/pages/playground/dynamic-elements/DynamicElementsPage'
import { AdvancedDomPage } from '@/pages/playground/advanced-dom/AdvancedDomPage'
import { DateTimePage } from '@/pages/playground/date-time/DateTimePage'
import { RichTextPage } from '@/pages/playground/rich-text/RichTextPage'
import { SearchPage } from '@/pages/playground/search/SearchPage'
import { TooltipsPopoversPage } from '@/pages/playground/tooltips-popovers/TooltipsPopoversPage'
import { NotificationsPage } from '@/pages/playground/notifications/NotificationsPage'
import { ConfirmationsPage } from '@/pages/playground/confirmations/ConfirmationsPage'
import { TestDataPage } from '@/pages/playground/test-data/TestDataPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* iframe content routes render bare, without any app chrome */}
      <Route path="/iframe-content/basic" element={<IframeChildPage />} />
      <Route path="/iframe-content/nested" element={<IframeNestedChildPage />} />
      <Route path={ROUTES.windowsTabs + '/popup'} element={<PopupPage />} />

      <Route element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.accessDenied} element={<AccessDeniedPage />} />
        <Route path={ROUTES.errorDemo} element={<ErrorDemoPage />} />

        <Route element={<GuestOnlyRoute />}>
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
        </Route>
        <Route path={ROUTES.verifyEmail} element={<VerifyEmailPage />} />
        <Route path="/registration-success" element={<RegistrationSuccessPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PlaygroundLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />

          <Route element={<RoleRoute role="admin" />}>
            <Route path={ROUTES.adminDashboard} element={<AdminDashboardPage />} />
            <Route path={ROUTES.userManagement} element={<UserManagementPage />} />
          </Route>

          <Route path={ROUTES.playground} element={<PlaygroundDashboardPage />} />
          <Route path={ROUTES.basicActions} element={<BasicActionsPage />} />
          <Route path={ROUTES.forms} element={<FormsPage />} />
          <Route path={ROUTES.mouse} element={<MousePage />} />
          <Route path={ROUTES.keyboard} element={<KeyboardPage />} />
          <Route path={ROUTES.scrolling} element={<ScrollingPage />} />
          <Route path={ROUTES.dragDrop} element={<DragDropPage />} />
          <Route path={ROUTES.lists} element={<ListsPage />} />
          <Route path={ROUTES.tables} element={<TablesPage />} />
          <Route path={ROUTES.dropdowns} element={<DropdownsPage />} />
          <Route path={ROUTES.dialogs} element={<ModalsPage />} />
          <Route path={`${ROUTES.dialogs}/browser`} element={<BrowserDialogsPage />} />
          <Route path={ROUTES.iframes} element={<IframesPage />} />
          <Route path={ROUTES.shadowDom} element={<ShadowDomPage />} />
          <Route path={ROUTES.windowsTabs} element={<WindowsTabsPage />} />
          <Route path={ROUTES.uploadDownload} element={<UploadDownloadPage />} />
          <Route path={ROUTES.cookies} element={<CookiesPage />} />
          <Route path={ROUTES.localStorage} element={<LocalStoragePage />} />
          <Route path={ROUTES.sessionStorage} element={<SessionStoragePage />} />
          <Route path={ROUTES.browserHistory} element={<BrowserHistoryPage />} />
          <Route path={`${ROUTES.browserHistory}/page-:page`} element={<HistorySubPage />} />
          <Route path={ROUTES.network} element={<NetworkPage />} />
          <Route path={ROUTES.websocket} element={<WebSocketPage />} />
          <Route path={ROUTES.javascript} element={<JavaScriptPage />} />
          <Route path={ROUTES.accessibility} element={<AccessibilityPage />} />
          <Route path={ROUTES.responsive} element={<ResponsivePage />} />
          <Route path={ROUTES.dynamicElements} element={<DynamicElementsPage />} />
          <Route path={ROUTES.advancedDom} element={<AdvancedDomPage />} />
          <Route path={ROUTES.dateTime} element={<DateTimePage />} />
          <Route path={ROUTES.richText} element={<RichTextPage />} />
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route path={ROUTES.tooltipsPopovers} element={<TooltipsPopoversPage />} />
          <Route path={ROUTES.notifications} element={<NotificationsPage />} />
          <Route path={ROUTES.confirmations} element={<ConfirmationsPage />} />
          <Route path={ROUTES.testData} element={<TestDataPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
