# Web Automation Playground

## Application Requirements Specification

**Version:** 1.0
**Application Type:** Web application
**Primary Purpose:** Web UI and browser automation testing
**Recommended Technology:** React + TypeScript + Vite
**Styling:** CSS / modern responsive CSS
**Runtime:** Browser
**Backend:** Optional lightweight local backend only where required
**Deployment:** Must support local execution and static deployment

---

# 1. Purpose

Build a standalone web application called **Web Automation Playground**.

The application is specifically designed to provide a controlled environment for testing web automation capabilities.

It is not intended to represent a real business application.

The application must expose as many commonly used web automation scenarios as reasonably possible, including:

- HTML elements
- Forms
- Authentication
- Mouse interactions
- Keyboard interactions
- Drag and drop
- Scrolling
- Tables
- Lists
- Dynamic elements
- Modals
- Browser dialogs
- Iframes
- Shadow DOM
- Multiple windows/tabs
- File upload/download
- Cookies
- Local storage
- Session storage
- Browser history
- JavaScript interactions
- Network behavior
- WebSockets
- Accessibility
- Responsive layouts
- Authentication/session handling
- Complex DOM structures
- Challenging locator scenarios

The application must be completely independent of any external automation framework.

---

# 2. Technology Requirements

Use:

- React
- TypeScript
- Vite
- HTML5
- CSS3

Recommended project structure:

```text
web-automation-playground/
├── public/
├── src/
├── tests/
├── scripts/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Do not include:

- Selenium
- Playwright
- Cypress
- WebdriverIO
- Puppeteer
- Any external automation framework

The application must simply provide the web interface that external automation tools can interact with.

---

# 3. Application Architecture

The application should be divided into two major areas.

## Public Application

```text
Home
Registration
Login
Forgot Password
Reset Password
Email Verification
Access Denied
```

## Automation Playground

```text
Dashboard
├── Basic Elements
├── Forms
├── Authentication
├── Mouse Actions
├── Keyboard Actions
├── Scrolling
├── Drag & Drop
├── Lists
├── Tables
├── Dropdowns
├── Modals
├── Browser Dialogs
├── Iframes
├── Shadow DOM
├── Windows & Tabs
├── Upload & Download
├── Cookies
├── Local Storage
├── Session Storage
├── Browser History
├── Network
├── WebSocket
├── JavaScript
├── Accessibility
├── Responsive
├── Dynamic Elements
├── Advanced DOM
└── Test Data
```

---

# 4. Application Navigation

Create a main navigation/sidebar.

Example:

```text
Web Automation Playground

Home
Authentication
Basic Actions
Forms
Mouse Actions
Keyboard Actions
Scrolling
Drag & Drop
Lists
Tables
Dropdowns
Dialogs
IFrames
Shadow DOM
Windows & Tabs
Upload / Download
Cookies
Local Storage
Session Storage
Network
WebSocket
JavaScript
Accessibility
Responsive
Dynamic Elements
Advanced DOM
Test Data
```

Navigation must support:

- Direct navigation
- Browser back
- Browser forward
- Refresh
- Deep links
- Protected routes
- Route redirects
- Unknown route / 404

---

# 5. Stable Automation Identifiers

This is a mandatory requirement.

Every interactive element must have stable, meaningful identifiers.

Prefer:

```html
id="login-email" data-testid="login-email"
```

Use `data-testid` for elements where a dedicated automation identifier is useful.

Identifiers must:

- Be deterministic.
- Not contain random values.
- Not depend on element position.
- Not change between page reloads.
- Not change between builds.
- Be unique within their intended context.
- Be documented.

Example:

```text
login-email
login-password
login-submit
register-email
register-password
basic-button
basic-checkbox
mouse-click-area
drag-source
drop-target
iframe-container
shadow-host
upload-input
download-file
```

---

# 6. Module: Basic Elements

Create a page containing all common HTML controls.

## Elements

- Button
- Link
- Text
- Heading
- Paragraph
- Image
- Icon
- Checkbox
- Radio button
- Switch
- Text input
- Password input
- Number input
- Email input
- Telephone input
- URL input
- Search input
- Date input
- Time input
- DateTime input
- Color input
- Range input
- File input
- Textarea
- Select
- Multi-select
- Progress bar
- Meter
- Details/summary
- HTML5 semantic elements

## Actions

Automation should be able to:

- Click
- Double click
- Read text
- Read attribute
- Check visibility
- Check enabled state
- Check selected state
- Check checked state
- Focus
- Blur
- Hover
- Clear
- Enter text
- Select option
- Deselect option
- Get value

---

# 7. Module: Forms

Create a comprehensive form.

Example:

```text
Registration Form

First Name
Last Name
Email
Phone
Password
Confirm Password
Date of Birth
Gender
Country
State
Skills
Website
Profile Image
Comments

☐ Terms and Conditions

[Submit]
[Reset]
```

Include:

- Required fields
- Optional fields
- HTML5 validation
- Custom validation
- Error messages
- Field-level validation
- Form-level validation
- Validation on blur
- Validation on submit
- Disabled submit
- Reset functionality

---

# 8. Module: Authentication

Authentication must be a complete standalone flow.

## 8.1 Registration

Provide:

```text
First Name
Last Name
Email
Username
Password
Confirm Password
Phone
Date of Birth
Country
Terms and Conditions

[Register]
```

Validation:

- Required fields
- Invalid email
- Invalid phone
- Weak password
- Password mismatch
- Existing username
- Existing email
- Invalid date
- Missing terms acceptance
- Invalid characters
- Minimum/maximum length

---

# 9. Registration Success Flow

After successful registration:

```text
Registration Successful

Account:
testuser@example.com

[Verify Email]
[Go to Login]
```

The application should maintain deterministic test users/data.

---

# 10. Email Verification

Do not require a real email service.

Create a simulated verification screen.

Example:

```text
Email Verification

Verification Code:
[______]

[Verify]

[Resend Code]
```

Support:

- Valid code
- Invalid code
- Expired code
- Resend
- Empty code
- Incorrect format
- Maximum attempts

The verification code should be deterministic or configurable for testing.

---

# 11. Login

Login screen:

```text
Email / Username
Password

☐ Remember Me

[Login]

Forgot Password?
Create Account
```

Test scenarios:

- Valid login
- Invalid username
- Invalid password
- Both invalid
- Empty fields
- Password masking
- Remember me
- Login with verified account
- Login with unverified account
- Locked account
- Case sensitivity
- Leading/trailing spaces

---

# 12. Forgot Password

Flow:

```text
Forgot Password

Email
[____________]

[Send Reset Link]
```

Then:

```text
Reset Password

Verification Code
New Password
Confirm Password

[Reset Password]
```

Test:

- Valid email
- Unknown email
- Invalid email
- Invalid code
- Expired code
- Weak password
- Password mismatch
- Successful reset

---

# 13. Change Password

Authenticated user:

```text
Current Password
New Password
Confirm Password

[Change Password]
```

Test:

- Valid current password
- Invalid current password
- Weak password
- Same old/new password
- Password mismatch
- Successful change

---

# 14. Logout

Provide:

```text
[Logout]
```

After logout:

- Clear authenticated UI
- Redirect to login
- Prevent access to protected pages
- Preserve/clear appropriate session data based on Remember Me

---

# 15. Authentication State

Implement:

- Authenticated state
- Unauthenticated state
- Protected routes
- Redirect to login
- Redirect after login
- Session expiration
- Logout
- Remember me
- Unauthorized page

Example:

```text
/login
/register
/dashboard
/profile
/settings
/access-denied
```

---

# 16. User Profile

Authenticated dashboard should include:

```text
Profile

Name
Email
Username
Phone
Role
Account Status

[Edit Profile]
[Change Password]
[Logout]
```

Support:

- Edit
- Save
- Cancel
- Validation
- Profile image upload

---

# 17. Module: Mouse Actions

Create a dedicated Mouse Actions page.

Provide areas for:

- Click
- Double click
- Right click
- Mouse down
- Mouse up
- Mouse move
- Hover
- Hover menu
- Tooltip
- Mouse over
- Mouse out
- Drag
- Resize

Example:

```text
┌─────────────────────────┐
│                         │
│       CLICK AREA        │
│                         │
└─────────────────────────┘

Last Action:
DOUBLE CLICK
```

---

# 18. Hover Scenarios

Create:

- Hover menu
- Nested hover menu
- Tooltip
- Hidden element revealed on hover
- Hover-dependent button
- Hover card
- Hover image

Example:

```text
Products
   ↓ hover

Products
├── Electronics
├── Clothing
└── Accessories
```

---

# 19. Module: Keyboard Actions

Provide:

- Text fields
- Search field
- Shortcut area
- Keyboard event display

Test:

- Enter
- Escape
- Tab
- Shift+Tab
- Arrow keys
- Home
- End
- Page Up
- Page Down
- Delete
- Backspace
- Ctrl/Cmd+A
- Ctrl/Cmd+C
- Ctrl/Cmd+V
- Ctrl/Cmd+X
- Ctrl/Cmd+Z
- Ctrl/Cmd+F
- Function keys where practical

Display:

```text
Last Key:
ENTER

Last Combination:
CTRL + A
```

---

# 20. Module: Scrolling

Create:

## Vertical page

Very long page.

## Horizontal page

Wide content.

## Scroll container

Independent scrollable container.

## Nested scrolling

Scrollable container inside another scrollable container.

## Infinite scrolling

Load additional content when reaching the bottom.

## Sticky elements

Include:

- Sticky header
- Sticky sidebar
- Sticky footer

Test:

- Scroll up
- Scroll down
- Scroll to top
- Scroll to bottom
- Scroll into view
- Horizontal scrolling
- Nested scrolling
- Infinite scrolling

---

# 21. Module: Drag & Drop

Provide:

```text
Drag Sources

[Item A]
[Item B]
[Item C]

Drop Zones

┌──────────────┐
│ Drop Zone A  │
└──────────────┘

┌──────────────┐
│ Drop Zone B  │
└──────────────┘
```

Support:

- HTML5 drag/drop
- Mouse drag/drop
- Reordering
- Multiple items
- Invalid drop
- Drag between zones
- Drag outside zone

---

# 22. Module: Lists

Create:

- Ordered list
- Unordered list
- Searchable list
- Dynamic list
- Virtualized list
- Infinite list
- Nested list
- Expandable list
- Duplicate text list

Test:

- Count items
- Find item
- Select item
- Iterate items
- Search
- Expand
- Collapse
- Scroll
- Dynamic loading

---

# 23. Module: Tables

Create a comprehensive data table.

Columns:

```text
ID
Name
Email
Role
Status
Date
Amount
Actions
```

Features:

- Sorting
- Filtering
- Pagination
- Search
- Row selection
- Select all
- Column visibility
- Resizable columns
- Fixed columns
- Sticky header
- Expandable rows
- Inline editing
- Delete row
- Add row

Test scenarios:

- Sort ascending
- Sort descending
- Filter
- Search
- Pagination
- Select row
- Select all
- Edit row
- Delete row
- Verify cell value
- Verify row count

---

# 24. Module: Dropdowns

Implement:

- Native select
- Custom dropdown
- Searchable dropdown
- Multi-select dropdown
- Cascading dropdown
- Disabled dropdown
- Dynamic dropdown

Example:

```text
Country
[India ▼]

State
[Telangana ▼]

City
[Hyderabad ▼]
```

Test:

- Open
- Select
- Search
- Clear
- Multi-select
- Dependent selection
- Disabled state

---

# 25. Module: Modals

Create:

- Simple modal
- Large modal
- Nested modal
- Confirmation modal
- Form modal
- Modal with scrolling
- Modal with close button
- Modal closed by backdrop
- Modal closed by Escape

Test:

- Open
- Close
- Submit
- Cancel
- Keyboard close
- Backdrop interaction
- Focus handling

---

# 26. Browser Dialogs

Where browser security permits, implement:

- Alert
- Confirm
- Prompt

Examples:

```text
Alert
Confirm
Prompt
```

For prompt:

```text
Enter your name:
[____________]
```

---

# 27. Module: IFrames

Create multiple iframe scenarios.

## Same-origin iframe

Contains:

- Input
- Button
- Checkbox
- Dropdown

## Nested iframe

```text
Main Page
   ↓
Iframe A
   ↓
Iframe B
```

## Cross-origin iframe

Where technically appropriate and safe.

Provide stable identifiers and deterministic content.

---

# 28. Module: Shadow DOM

Create custom web components using Shadow DOM.

Example:

```text
<automation-input>
<automation-button>
<automation-dropdown>
```

Include:

- Open shadow root
- Nested shadow DOM
- Shadow DOM input
- Shadow DOM button
- Shadow DOM dropdown

The purpose is to provide realistic Shadow DOM automation challenges.

---

# 29. Module: Windows & Tabs

Provide links/buttons that:

- Open new tab
- Open new window
- Open same tab
- Open popup
- Close popup
- Return to original page

Test:

- Switch tab
- Switch window
- Verify title
- Verify URL
- Close child window
- Return to parent

---

# 30. Module: Upload

Provide:

```text
[Choose File]

[Upload]

Selected File:
sample.pdf
```

Support:

- Single file
- Multiple files
- Image
- PDF
- CSV
- JSON
- TXT

Validate:

- File name
- File size
- File type
- Multiple files
- Invalid extension
- Oversized file

---

# 31. Module: Download

Provide downloadable files:

```text
Download TXT
Download CSV
Download JSON
Download PDF
Download Image
Download ZIP
```

The downloads should use deterministic local/static files.

---

# 32. Module: Cookies

Create a UI to manage cookies.

Display:

```text
Cookie Name
Cookie Value
Expiration
Path
Domain
```

Actions:

```text
[Set Cookie]
[Read Cookies]
[Delete Cookie]
[Clear Cookies]
```

Test:

- Create cookie
- Read cookie
- Modify cookie
- Delete cookie
- Expiring cookie
- Session cookie

---

# 33. Module: Local Storage

Provide:

```text
Key
Value

[Set]
[Get]
[Update]
[Delete]
[Clear]
```

Display current local storage.

Test:

- Create
- Read
- Update
- Delete
- Clear
- Refresh persistence

---

# 34. Module: Session Storage

Same functionality as Local Storage.

Test:

- Create
- Read
- Update
- Delete
- Clear
- Refresh
- New tab behavior

---

# 35. Module: Browser History

Create controls:

```text
[Go Page A]
[Go Page B]
[Go Page C]

[Back]
[Forward]
```

Support:

- Browser back
- Browser forward
- History navigation
- URL changes
- Route changes

---

# 36. Module: Dynamic Elements

Create intentionally dynamic scenarios.

Examples:

- Element appears after delay
- Element disappears after delay
- Element changes text
- Element changes state
- Element becomes enabled
- Element becomes disabled
- Dynamic list
- Dynamic table
- Loading spinner
- Skeleton loader
- Delayed API response simulation

Provide deterministic delays/configuration.

Example:

```text
Element Status:
WAITING

After 3 seconds:

Element Status:
READY
```

---

# 37. Module: Network

Create a controlled network testing page.

Provide simulated:

- Success response
- 400 response
- 401 response
- 403 response
- 404 response
- 500 response
- Delayed response
- Timeout simulation
- Empty response
- Large response

The application should not require a third-party API.

---

# 38. Module: WebSocket

Provide a local WebSocket demonstration if practical.

UI:

```text
Connection:
CONNECTED

[Connect]
[Disconnect]
[Send Message]

Message:
[____________]

Received Messages:
...
```

Test:

- Connect
- Disconnect
- Send
- Receive
- Multiple messages
- Reconnect

---

# 39. Module: JavaScript Interaction

Create controlled scenarios where JavaScript modifies the page.

Examples:

- Change text
- Change attribute
- Enable element
- Disable element
- Hide element
- Show element
- Scroll element
- Create element
- Remove element

Provide a visible state panel showing the result.

---

# 40. Module: Advanced DOM

Include:

- Deeply nested DOM
- Duplicate IDs scenario for negative testing
- Duplicate text
- Hidden elements
- Visually hidden elements
- Disabled elements
- Read-only fields
- Off-screen elements
- Overlapping elements
- Covered elements
- Transparent elements
- Elements behind another element
- Dynamically generated elements
- Detached/re-attached elements

The application must clearly label these as intentional automation challenges.

---

# 41. Module: Accessibility

The application must include accessibility test scenarios.

Implement:

- Semantic HTML
- ARIA labels
- ARIA roles
- ARIA states
- ARIA descriptions
- Accessible forms
- Keyboard navigation
- Focus management
- Focus trap
- Screen-reader-friendly elements
- Accessible modal
- Accessible dropdown
- Accessible table

Include deliberate examples of:

- Accessible element
- Poorly labelled element
- Duplicate labels
- Hidden accessibility element
- Disabled accessibility element

These scenarios allow automation frameworks to validate accessibility-based locators.

---

# 42. Module: Responsive Design

Create a responsive playground.

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Test:

- Responsive navigation
- Mobile menu
- Desktop menu
- Responsive table
- Responsive cards
- Responsive forms
- Element visibility changes
- Layout changes
- Breakpoints

Display:

```text
Current View:
DESKTOP

Viewport:
1440 × 900
```

---

# 43. Module: Date & Time Controls

Include:

- Date picker
- Date range picker
- Time picker
- DateTime picker
- Calendar
- Month selector
- Year selector

Test:

- Select date
- Select range
- Navigate month
- Navigate year
- Invalid date
- Disabled dates
- Today
- Past dates
- Future dates

---

# 44. Module: Rich Text Editor

Provide a simple rich text editor.

Support:

- Bold
- Italic
- Underline
- Heading
- Lists
- Links
- Alignment
- Undo
- Redo
- Clear formatting

Test keyboard and mouse interactions.

---

# 45. Module: Search

Create a search interface.

Features:

- Search box
- Suggestions
- Autocomplete
- Search results
- No results
- Loading state
- Result filtering
- Result sorting
- Clear search

Test:

- Type
- Search
- Select suggestion
- Keyboard navigation
- Empty search
- Special characters

---

# 46. Module: Tooltips & Popovers

Create:

- Tooltip on hover
- Tooltip on focus
- Tooltip on click
- Popover
- Nested popover
- Context menu

Test:

- Open
- Close
- Hover
- Focus
- Escape
- Outside click

---

# 47. Module: Authentication Edge Cases

Include dedicated scenarios for:

- Account locked
- Account disabled
- Unverified account
- Expired password
- Expired session
- Unauthorized route
- Forbidden route
- Redirect after login
- Redirect after logout
- Multiple sessions
- Remember me
- Session timeout
- Invalid reset token
- Invalid verification code

---

# 48. Test User Accounts

Provide deterministic accounts.

Example:

```text
Standard User
Email: user@example.com
Password: User@123

Admin User
Email: admin@example.com
Password: Admin@123

Locked User
Email: locked@example.com
Password: Locked@123

Unverified User
Email: unverified@example.com
Password: User@123
```

Credentials should be documented and configurable.

Do not use real external accounts.

---

# 49. Role-Based Access

Provide at least:

```text
ADMIN
USER
```

Admin can access:

```text
Admin Dashboard
User Management
Advanced Settings
```

Standard user must not access those pages.

Provide:

```text
403 Access Denied
```

for unauthorized access.

---

# 50. Test Data

Create deterministic datasets for:

- Users
- Products
- Orders
- Table rows
- Lists
- Countries
- States
- Cities
- Files
- Search results

The data should be locally available.

---

# 51. Theme

Support:

- Light mode
- Dark mode
- System preference

The automation playground must remain usable in both themes.

---

# 52. Offline Operation

Core playground functionality must work without external internet connectivity.

The following must work locally:

- Authentication
- Forms
- Basic actions
- Mouse
- Keyboard
- Scrolling
- Tables
- Lists
- Dialogs
- Iframes where possible
- Shadow DOM
- Storage
- Cookies
- Downloads
- Uploads
- JavaScript scenarios
- Accessibility
- Responsive testing

Network-specific scenarios can use local endpoints.

---

# 53. Local Backend

A lightweight local backend may be introduced if required for:

- Registration
- Login
- Session handling
- Password reset
- Dynamic data
- API simulation
- WebSocket
- Network failure simulation

If a backend is required, keep it inside the same repository.

Recommended:

```text
server/
```

The backend must remain simple and deterministic.

---

# 54. Project Structure

Recommended:

```text
web-automation-playground/
│
├── public/
│   ├── downloads/
│   ├── images/
│   └── files/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── home/
│   │   ├── authentication/
│   │   ├── basic-actions/
│   │   ├── forms/
│   │   ├── mouse/
│   │   ├── keyboard/
│   │   ├── scrolling/
│   │   ├── drag-drop/
│   │   ├── lists/
│   │   ├── tables/
│   │   ├── dropdowns/
│   │   ├── dialogs/
│   │   ├── iframes/
│   │   ├── shadow-dom/
│   │   ├── windows-tabs/
│   │   ├── upload-download/
│   │   ├── cookies/
│   │   ├── local-storage/
│   │   ├── session-storage/
│   │   ├── network/
│   │   ├── websocket/
│   │   ├── javascript/
│   │   ├── accessibility/
│   │   ├── responsive/
│   │   ├── dynamic-elements/
│   │   └── advanced-dom/
│   │
│   ├── services/
│   ├── hooks/
│   ├── routes/
│   ├── constants/
│   ├── types/
│   └── styles/
│
├── server/
│
├── tests/
│
├── scripts/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 55. Routing

Use clean routes.

Example:

```text
/
 /login
 /register
 /forgot-password
 /reset-password
 /verify-email

 /dashboard
 /profile
 /settings

 /playground/basic-actions
 /playground/forms
 /playground/mouse
 /playground/keyboard
 /playground/scrolling
 /playground/drag-drop
 /playground/lists
 /playground/tables
 /playground/dropdowns
 /playground/dialogs
 /playground/iframes
 /playground/shadow-dom
 /playground/windows-tabs
 /playground/upload-download
 /playground/cookies
 /playground/local-storage
 /playground/session-storage
 /playground/network
 /playground/websocket
 /playground/javascript
 /playground/accessibility
 /playground/responsive
 /playground/dynamic
 /playground/advanced-dom
```

---

# 56. Error Pages

Implement:

```text
404 Not Found
403 Forbidden
401 Unauthorized
500 Internal Error
Network Error
```

Each page should have stable identifiers and deterministic content.

---

# 57. Loading States

Create realistic loading scenarios:

- Spinner
- Skeleton
- Progress bar
- Delayed content
- Loading button
- Disabled button while loading

Example:

```text
[Loading...]
```

then:

```text
[Submit]
```

---

# 58. Notifications

Implement application notifications:

- Success toast
- Error toast
- Warning toast
- Information toast
- Persistent notification
- Auto-dismiss notification

Test:

- Display
- Close
- Auto-dismiss
- Multiple notifications
- Notification stacking

---

# 59. Confirmation Workflows

Provide workflows such as:

```text
Delete Item

Are you sure?

[Cancel]
[Delete]
```

Include:

- Confirmation
- Cancellation
- Loading
- Success
- Failure

---

# 60. Internationalization Readiness

Keep user-facing strings centralized.

The architecture should allow future support for multiple languages.

Include test scenarios for:

- Long text
- Short text
- Unicode
- Special characters
- RTL-ready layouts where practical

---

# 61. Performance / Large Data Scenarios

Provide controlled large datasets.

Examples:

```text
1,000 list items
5,000 table rows
Large text
Large image
Large file
```

Use virtualization where appropriate.

The application should remain usable while providing realistic automation targets.

---

# 62. Browser Compatibility

The application should be tested against modern:

- Chrome
- Edge
- Firefox
- Safari

Do not rely on browser-specific functionality unless the feature is explicitly part of a browser-specific test scenario.

Where behavior differs between browsers, document the difference.

---

# 63. Build and Run Requirements

Provide:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

Recommended scripts:

```text
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run test
npm run test:unit
npm run test:integration
```

---

# 64. Deployment

The frontend should be capable of static deployment.

Supported targets may include:

- Local server
- Nginx
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

If authentication/network functionality requires a backend, document the backend deployment separately.

---

# 65. Application Testing

The application itself should include:

## Unit tests

For:

- Utility functions
- Validation
- State management
- Authentication logic

## Component tests

For:

- Forms
- Buttons
- Dropdowns
- Tables
- Dialogs
- Navigation

## Integration tests

For:

- Registration
- Login
- Logout
- Password reset
- Protected routes
- Dynamic behavior
- Storage

Do not use an external browser automation framework as part of the application runtime.

---

# 66. Documentation

README must contain:

## Prerequisites

- Node.js
- npm

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Project architecture

Document major directories.

## Application modules

Document every playground module.

## Test accounts

Document deterministic test accounts.

## Routes

Document all routes.

## Automation IDs

Document important stable identifiers.

## Platform/browser differences

Document browser-specific behavior.

## Local backend

Document how to start it if applicable.

---

# 67. Definition of Done

The application is complete when:

- [ ] One React + TypeScript project runs successfully.
- [ ] Application can run locally.
- [ ] Production build works.
- [ ] Authentication flows work.
- [ ] Registration works.
- [ ] Login works.
- [ ] Logout works.
- [ ] Forgot password works.
- [ ] Reset password works.
- [ ] Email verification simulation works.
- [ ] Change password works.
- [ ] Protected routes work.
- [ ] Role-based access works.
- [ ] Basic elements are implemented.
- [ ] Forms are implemented.
- [ ] Mouse actions are implemented.
- [ ] Keyboard actions are implemented.
- [ ] Scrolling scenarios are implemented.
- [ ] Drag/drop scenarios are implemented.
- [ ] Lists are implemented.
- [ ] Tables are implemented.
- [ ] Dropdown scenarios are implemented.
- [ ] Dialogs are implemented.
- [ ] Browser dialogs are implemented where possible.
- [ ] IFrames are implemented.
- [ ] Shadow DOM scenarios are implemented.
- [ ] Multiple tabs/windows are implemented.
- [ ] Upload functionality is implemented.
- [ ] Download functionality is implemented.
- [ ] Cookies are implemented.
- [ ] Local storage is implemented.
- [ ] Session storage is implemented.
- [ ] Browser history scenarios are implemented.
- [ ] Dynamic elements are implemented.
- [ ] Network scenarios are implemented.
- [ ] WebSocket scenarios are implemented where practical.
- [ ] JavaScript interaction scenarios are implemented.
- [ ] Accessibility scenarios are implemented.
- [ ] Responsive scenarios are implemented.
- [ ] Date/time controls are implemented.
- [ ] Rich text editor is implemented.
- [ ] Search/autocomplete is implemented.
- [ ] Tooltips/popovers are implemented.
- [ ] Error pages are implemented.
- [ ] Loading states are implemented.
- [ ] Toast notifications are implemented.
- [ ] Stable automation identifiers exist throughout the application.
- [ ] Core functionality works without external internet access.
- [ ] Test data is deterministic.
- [ ] README is complete.
- [ ] No Selenium/Playwright/Cypress/WebdriverIO/Puppeteer code is included.

---

# 68. Scope Boundary

This application must be completely independent of external automation frameworks.

The application provides:

```text
Web Application
      │
      ├── UI
      ├── DOM
      ├── Authentication
      ├── Browser behaviors
      ├── Storage
      ├── Network scenarios
      └── Test data
```

External automation systems consume it separately:

```text
                    WEB AUTOMATION PLAYGROUND
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       Selenium            Playwright          WebdriverIO
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                         Test Execution
```

The playground itself must never depend on those automation tools.

---

# 69. Final Objective

The final application should function as a **comprehensive Web Automation Certification Playground**.

It should allow an automation engineer to test practically every common category of browser interaction against one controlled application:

```text
Authentication
      ↓
Forms
      ↓
Elements
      ↓
Mouse
      ↓
Keyboard
      ↓
Scrolling
      ↓
Drag & Drop
      ↓
Lists
      ↓
Tables
      ↓
Dialogs
      ↓
IFrames
      ↓
Shadow DOM
      ↓
Windows / Tabs
      ↓
Files
      ↓
Cookies / Storage
      ↓
Network
      ↓
WebSocket
      ↓
JavaScript
      ↓
Accessibility
      ↓
Responsive UI
      ↓
Dynamic DOM
      ↓
Advanced Browser Scenarios
```

The application should be **deterministic, locally runnable, framework-independent, automation-friendly, and reusable across future web automation projects**.
