// Native Web Components used by the Shadow DOM playground module. Registered
// once, guarded against Vite HMR re-registration.

class AutomationInput extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return
    const shadow = this.attachShadow({ mode: 'open' })
    const label = this.getAttribute('label') ?? 'Shadow Input'
    shadow.innerHTML = `
      <style>
        :host { display: block; font-family: inherit; }
        label { display: block; font-weight: 600; margin-bottom: 0.3rem; font-size: 0.88rem; }
        input { padding: 0.55rem 0.7rem; border: 1px solid #9aa2b1; border-radius: 6px; width: 100%; box-sizing: border-box; font: inherit; }
      </style>
      <label for="shadow-input">${label}</label>
      <input id="shadow-input" data-testid="shadow-input" />
    `
    const input = shadow.getElementById('shadow-input') as HTMLInputElement
    input.addEventListener('input', () => {
      this.dispatchEvent(new CustomEvent('value-change', { detail: input.value, bubbles: true, composed: true }))
    })
  }
}

class AutomationButton extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return
    const shadow = this.attachShadow({ mode: 'open' })
    const label = this.getAttribute('label') ?? 'Shadow Button'
    shadow.innerHTML = `
      <style>
        button { padding: 0.55rem 1rem; border-radius: 6px; border: none; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; font: inherit; }
      </style>
      <button id="shadow-button" data-testid="shadow-button" type="button">${label}</button>
    `
    const button = shadow.getElementById('shadow-button') as HTMLButtonElement
    let clicks = 0
    button.addEventListener('click', () => {
      clicks += 1
      this.dispatchEvent(new CustomEvent('automation-click', { detail: clicks, bubbles: true, composed: true }))
    })
  }
}

class AutomationDropdown extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        select { padding: 0.55rem 0.7rem; border-radius: 6px; border: 1px solid #9aa2b1; font: inherit; width: 100%; }
      </style>
      <select id="shadow-select" data-testid="shadow-select">
        <option value="alpha">Alpha</option>
        <option value="beta">Beta</option>
        <option value="gamma">Gamma</option>
      </select>
    `
    const select = shadow.getElementById('shadow-select') as HTMLSelectElement
    select.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('value-change', { detail: select.value, bubbles: true, composed: true }))
    })
  }
}

// Nested shadow DOM: the host's shadow root contains a <div> that itself has
// its own (second-level) shadow root with an input inside it.
class AutomationNestedHost extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return
    const outerShadow = this.attachShadow({ mode: 'open' })
    outerShadow.innerHTML = `
      <style>:host{display:block;} .outer-panel{border:1px dashed #9aa2b1;border-radius:8px;padding:0.75rem;}</style>
      <div class="outer-panel" id="shadow-outer-panel" data-testid="shadow-outer-panel">
        <p>Outer shadow root</p>
        <div id="shadow-inner-host" data-testid="shadow-inner-host"></div>
      </div>
    `
    const innerHost = outerShadow.getElementById('shadow-inner-host')!
    const innerShadow = innerHost.attachShadow({ mode: 'open' })
    innerShadow.innerHTML = `
      <style>.inner-panel{border:1px solid #2563eb;border-radius:6px;padding:0.6rem;margin-top:0.5rem;}</style>
      <div class="inner-panel">
        <p>Inner (nested) shadow root</p>
        <input id="shadow-nested-input" data-testid="shadow-nested-input" placeholder="Nested shadow input" />
      </div>
    `
  }
}

export function registerAutomationElements() {
  if (!customElements.get('automation-input')) customElements.define('automation-input', AutomationInput)
  if (!customElements.get('automation-button')) customElements.define('automation-button', AutomationButton)
  if (!customElements.get('automation-dropdown')) customElements.define('automation-dropdown', AutomationDropdown)
  if (!customElements.get('automation-nested-host')) customElements.define('automation-nested-host', AutomationNestedHost)
}
