export class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const label = this.getAttribute('label') || 'Kirim';
      const type = this.getAttribute('type') || 'button';
      const btnId = this.getAttribute('id') || '';
      const btnClass = this.getAttribute('class') || '';
  
      this.shadowRoot.innerHTML = `
              <style>
                  .btn {
                      border: none;
                      border-radius: 5px;
                      font-size: 16px;
                      font-weight: bold;
                      color: white;
                      background: linear-gradient(145deg, #096A68, #137b79);
                      box-shadow: 3px 3px 6px #096A68, -3px -3px 6px #ffffff;
                      cursor: pointer;
                      padding: 10px 20px;
                      text-align: center;
                      width: 100%;
                      transition: all 0.3s ease-in-out;
                  }
                  
                  .btn:hover {
                      background: linear-gradient(145deg, #1aafad, #6bb4b3);
                      transform: scale(1.05);
                  }
              </style>
  
              <button id="${btnId}" class="btn ${btnClass}" type="${type}">
                  ${label}
              </button>
          `;
    }
  }
  
  export class NavbarLink extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
  
      const icon = this.getAttribute('icon') || 'library_add';
      const text = this.getAttribute('text') || 'Default Link';
      const href = this.getAttribute('href') || '#';
      const linkId = this.getAttribute('id') || '';
      const linkClass = this.getAttribute('class') || '';
  
      this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD@100..700,0..1,-50..200">
  
              <style>
                  a {
                      all: unset; 
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                      cursor: pointer;
                      padding: 10px;
                      border-radius: 10px;
                      text-align: center !important;
                  }
              </style>
  
              <a href="${href}" id="${linkId}" class="${linkClass}" part="link">
                  <span class="material-symbols-outlined">${icon}</span>
                  ${text}
              </a>
          `;
    }
  }
  
  export class AppLogo extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD@100..700,0..1,-50..200">
  
              <style>
                  .logo-brand {
                      margin: 40px;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                      white-space: nowrap;
                  }
  
                  .logo-brand h1 {
                      font-size: 3rem;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                      margin: 0;
                  }
  
                  .logo-brand .material-symbols-outlined {
                      font-size: 40px;
                      color: #FCCA40;
                      width: auto;
                      display: flex;
                      align-items: center;
                  }
              </style>
  
              <div class="logo-brand">
                  <span class="material-symbols-outlined">radio_button_partial</span>
                  <h1>Notes App</h1>
              </div>
          `;
    }
  }
  
  export class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
              <style>
                  .loading {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background: rgba(0, 0, 0, 0.5);
                      backdrop-filter: blur(5px);
                      z-index: 9999;
                  }
                  .spinner {
                      width: 50px;
                      height: 50px;
                      border: 5px solid #fff;
                      border-top-color: transparent;
                      border-radius: 50%;
                      animation: spin 1s linear infinite;
                  }
                  @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                  }
              </style>
              <div class="loading">
                  <div class="spinner"></div>
              </div>
          `;
    }
  }
  
  // Daftarkan elemen jika belum ada dalam `customElements`
  if (!customElements.get('app-logo')) {
    customElements.define('app-logo', AppLogo);
  }
  if (!customElements.get('navbar-link')) {
    customElements.define('navbar-link', NavbarLink);
  }
  if (!customElements.get('custom-button')) {
    customElements.define('custom-button', CustomButton);
  }
  if (!customElements.get('loading-indicator')) {
    customElements.define('loading-indicator', LoadingIndicator);
  }
  