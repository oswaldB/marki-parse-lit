class SSConsoleMonitor extends window.LitElement {
  static properties = {
    errors: { type: Array },
    showConsolePanel: { type: Boolean },
    currentError: { type: Object },
    showAllErrors: { type: Boolean }
  };

  constructor() {
    super();
    this.errors = [];
    this.showConsolePanel = false;
    this.currentError = null;
    this.showAllErrors = false;
    this.originalConsoleError = console.error;
    this.originalConsoleLog = console.log;
    this.originalConsoleWarn = console.warn;
    this.originalConsoleInfo = console.info;
    this.originalConsoleDebug = console.debug;
    this.originalConsoleTrace = console.trace;
    
    // Store original error handler
    this.originalWindowOnError = window.onerror;
    
    // Store original network methods
    this.originalFetch = window.fetch;
    this.originalXHR = window.XMLHttpRequest;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupConsoleMonitoring();
  }

  // Early initialization - capture errors as soon as the script loads
  static initializeEarly() {
    const instance = new SSConsoleMonitor();
    instance.setupConsoleMonitoring();
    
    // Store the early instance
    window.ssConsoleMonitorEarlyInstance = instance;
    
    return instance;
  }

  disconnectedCallback() {
    this.restoreConsole();
    super.disconnectedCallback();
  }

  setupConsoleMonitoring() {
    // Only override if not already overridden
    if (console.error === this.originalConsoleError) {
      console.error = (...args) => {
        this.captureLog('error', args);
        this.originalConsoleError.apply(console, args);
      };
    }

    // Only override if not already overridden
    if (console.log === this.originalConsoleLog) {
      console.log = (...args) => {
        this.captureLog('log', args);
        this.originalConsoleLog.apply(console, args);
      };
    }

    if (console.warn === this.originalConsoleWarn) {
      console.warn = (...args) => {
        this.captureLog('warn', args);
        this.originalConsoleWarn.apply(console, args);
      };
    }

    if (console.info === this.originalConsoleInfo) {
      console.info = (...args) => {
        this.captureLog('info', args);
        this.originalConsoleInfo.apply(console, args);
      };
    }

    if (console.debug === this.originalConsoleDebug) {
      console.debug = (...args) => {
        this.captureLog('debug', args);
        if (this.originalConsoleDebug) {
          this.originalConsoleDebug.apply(console, args);
        }
      };
    }

    if (console.trace === this.originalConsoleTrace) {
      console.trace = (...args) => {
        this.captureLog('trace', args);
        if (this.originalConsoleTrace) {
          this.originalConsoleTrace.apply(console, args);
        }
      };
    }

    // Capture ALL window errors (including syntax errors, undefined variables, etc.)
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMessage = this.formatNativeError(message, source, lineno, colno, error);
      this.captureLog('error', [errorMessage]);
      return false; // Let the browser also show the error in console
    };

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      let errorMessage = 'Unhandled Promise Rejection:';
      if (event.reason instanceof Error) {
        errorMessage += ` ${event.reason.name}: ${event.reason.message}`;
        if (event.reason.stack) {
          errorMessage += `\n${event.reason.stack}`;
        }
      } else {
        errorMessage += ` ${JSON.stringify(event.reason)}`;
      }
      this.captureLog('error', [errorMessage]);
    });

    // Capture resource loading errors (404, failed to load, etc.)
    window.addEventListener('error', (event) => {
      if (event.target instanceof HTMLImageElement || 
          event.target instanceof HTMLScriptElement ||
          event.target instanceof HTMLLinkElement) {
        const errorMessage = `Resource load error: ${event.target.tagName} at ${event.target.src || event.target.href}`;
        this.captureLog('error', [errorMessage]);
      }
    }, true); // Use capture phase to catch before other handlers

    // Capture network errors (404, 500, etc.) by overriding fetch and XMLHttpRequest
    this.overrideFetch();
    this.overrideXHR();

    // Capture console API calls that might be made before our override
    this.captureExistingConsoleLogs();
  }

  restoreConsole() {
    console.error = this.originalConsoleError;
    console.log = this.originalConsoleLog;
    console.warn = this.originalConsoleWarn;
    console.info = this.originalConsoleInfo;
    console.debug = this.originalConsoleDebug;
    console.trace = this.originalConsoleTrace;
    window.onerror = this.originalWindowOnError;
    
    // Restore network methods
    window.fetch = this.originalFetch;
    window.XMLHttpRequest = this.originalXHR;
  }

  captureLog(type, args) {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: type,
      args: args,
      stack: type === 'error' ? this.getStackTrace() : null
    };

    // Keep only the last 100 logs to prevent memory issues
    this.errors = [...this.errors, logEntry].slice(-100);
    
    // Show the most recent log
    this.currentError = logEntry;
    
    // Log to console for debugging using original console.log to avoid infinite loop
    this.originalConsoleLog.call(console, `[Console Monitor] ${type.toUpperCase()} captured:`, logEntry);
  }

  getStackTrace() {
    try {
      throw new Error('Stack trace');
    } catch (e) {
      return e.stack || 'No stack trace available';
    }
  }

  formatErrorArgs(args) {
    return args.map(arg => {
      if (arg instanceof Error) {
        return `${arg.name}: ${arg.message}`;
      } else if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          // Handle circular references or other JSON.stringify errors
          return `[Object: ${arg.constructor ? arg.constructor.name : 'Object'}]`;
        }
      }
      return String(arg);
    }).join(' ');
  }

  dismissError() {
    this.showConsolePanel = false;
  }

  clearErrors() {
    this.errors = [];
    this.dismissError();
  }

  toggleShowAllErrors() {
    this.showAllErrors = !this.showAllErrors;
  }

  getLogIcon(type) {
    const icons = {
      'error': '🔴',
      'warn': '⚠️',
      'log': '📝',
      'info': 'ℹ️'
    };
    return icons[type] || '📝';
  }

  getLogColor(type) {
    const colors = {
      'error': '#ef4444',
      'warn': '#f59e0b',
      'log': '#64748b',
      'info': '#3b82f6'
    };
    return colors[type] || '#64748b';
  }

  static styles = window.css`
    :host {
      display: block;
    }

    /* Floating Console Bubble */
    .console-bubble {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      font-weight: bold;
    }

    .console-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .console-bubble.has-errors {
      background-color: #ef4444;
      animation: pulse 2s infinite;
    }

    .console-bubble.has-warnings {
      background-color: #f59e0b;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .console-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #ef4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    /* Console Panel */
    .console-panel {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 500px;
      max-width: 90vw;
      max-height: 60vh;
      background-color: #1e293b;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .console-panel.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    .console-header {
      background-color: #334155;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #475569;
    }

    .console-title {
      color: white;
      font-size: 16px;
      font-weight: bold;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .console-controls {
      display: flex;
      gap: 8px;
    }

    .console-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 13px;
      line-height: 1.4;
    }

    .console-log-entry {
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      display: flex;
      gap: 8px;
      word-break: break-word;
    }

    .log-icon {
      flex-shrink: 0;
    }

    .log-message {
      flex: 1;
    }

    .log-timestamp {
      font-size: 11px;
      color: #94a3b8;
      margin-left: 8px;
      flex-shrink: 0;
    }

    .log-error {
      background-color: rgba(239, 68, 68, 0.1);
      border-left: 3px solid #ef4444;
    }

    .log-warn {
      background-color: rgba(245, 158, 11, 0.1);
      border-left: 3px solid #f59e0b;
    }

    .log-info {
      background-color: rgba(59, 130, 246, 0.1);
      border-left: 3px solid #3b82f6;
    }

    .log-log {
      background-color: rgba(100, 116, 139, 0.1);
      border-left: 3px solid #64748b;
    }

    .log-debug {
      background-color: rgba(16, 185, 129, 0.1);
      border-left: 3px solid #10b981;
    }

    .log-trace {
      background-color: rgba(139, 92, 246, 0.1);
      border-left: 3px solid #8b5cf6;
    }

    .console-actions {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      background-color: #334155;
      border-top: 1px solid #475569;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-size: 14px;
      color: white;
    }

    .btn-primary {
      background-color: #3b82f6;
    }

    .btn-secondary {
      background-color: transparent;
      border: 1px solid #475569;
    }

    .btn-danger {
      background-color: #ef4444;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn:active {
      transform: translateY(1px);
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #475569;
      transition: .4s;
      border-radius: 24px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .toggle-slider {
      background-color: #3b82f6;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }

    .hidden {
      display: none;
    }
  `;

  render() {
    // Determine bubble state based on log types
    const hasErrors = this.errors.some(log => log.type === 'error');
    const hasWarnings = this.errors.some(log => log.type === 'warn') && !hasErrors;
    
    // Get error count
    const errorCount = this.errors.filter(log => log.type === 'error').length;
    const warningCount = this.errors.filter(log => log.type === 'warn').length;
    const logCount = this.errors.filter(log => log.type === 'log' || log.type === 'info').length;
    
    return window.html`
      <!-- Console Bubble -->
      <div 
        class="console-bubble ${hasErrors ? 'has-errors' : hasWarnings ? 'has-warnings' : ''}" 
        @click=${() => this.showConsolePanel = !this.showConsolePanel}
      >
        ${hasErrors ? '🚨' : hasWarnings ? '⚠️' : '🐞'}
        ${errorCount > 0 ? window.html`<div class="console-badge">${errorCount}</div>` : ''}
      </div>
      
      <!-- Console Panel -->
      <div class="console-panel ${this.showConsolePanel ? 'visible' : ''}">
        <div class="console-header">
          <h3 class="console-title">
            <span>🐞 Console Monitor</span>
            <span style="font-size: 12px; color: #94a3b8;">
              (${this.errors.length} ${this.errors.length === 1 ? 'log' : 'logs'})
            </span>
          </h3>
          <div class="console-controls">
            <label class="toggle-switch">
              <input type="checkbox" .checked=${this.showAllErrors} @change=${this.toggleShowAllErrors}>
              <span class="toggle-slider"></span>
            </label>
            <button class="btn btn-secondary" @click=${this.clearErrors} title="Effacer tous les logs">
              🗑️
            </button>
            <button class="btn btn-secondary" @click=${this.dismissError} title="Fermer">
              ✕
            </button>
          </div>
        </div>
        
        <div class="console-content">
          ${this.showAllErrors ? this.renderAllLogs() : this.renderCurrentLog()}
        </div>
        
        <div class="console-actions">
          <button class="btn btn-secondary" @click=${this.dismissError}>Fermer</button>
          <button class="btn btn-danger" @click=${this.clearErrors}>Effacer tout</button>
        </div>
      </div>
    `;
  }

  renderCurrentLog() {
    if (!this.currentError) {
      return window.html`<div style="color: #94a3b8; text-align: center; padding: 20px;">
        Aucune activité de console récente
      </div>`;
    }
    
    return window.html`
      <div class="console-log-entry ${this.getLogClass(this.currentError.type)}">
        <div class="log-icon">${this.getLogIcon(this.currentError.type)}</div>
        <div class="log-message">
          <strong>${this.currentError.type.toUpperCase()}</strong>: 
          ${this.formatErrorArgs(this.currentError.args)}
          ${this.currentError.stack ? window.html`<br><br>
            <div style="font-size: 12px; color: #94a3b8; font-family: monospace;">
              ${this.currentError.stack}
            </div>
          ` : ''}
        </div>
        <div class="log-timestamp">
          ${new Date(this.currentError.timestamp).toLocaleTimeString()}
        </div>
      </div>
    `;
  }

  renderAllLogs() {
    if (this.errors.length === 0) {
      return window.html`<div style="color: #94a3b8; text-align: center; padding: 20px;">
        Aucun log disponible
      </div>`;
    }
    
    return this.errors.map(log => window.html`
      <div class="console-log-entry ${this.getLogClass(log.type)}">
        <div class="log-icon">${this.getLogIcon(log.type)}</div>
        <div class="log-message">
          <strong>${log.type.toUpperCase()}</strong>: 
          ${this.formatErrorArgs(log.args)}
          ${log.stack ? window.html`<br><br>
            <div style="font-size: 12px; color: #94a3b8; font-family: monospace;">
              ${log.stack}
            </div>
          ` : ''}
        </div>
        <div class="log-timestamp">
          ${new Date(log.timestamp).toLocaleTimeString()}
        </div>
      </div>
    `);
  }

  getLogClass(type) {
    return `log-${type}`;
  }

  formatNativeError(message, source, lineno, colno, error) {
    let errorMessage = message;
    
    if (error && error.stack) {
      errorMessage = `${error.name}: ${error.message}\n${error.stack}`;
    } else if (source && lineno && colno) {
      errorMessage = `${message}\n at ${source}:${lineno}:${colno}`;
    }
    
    // Add browser-specific context
    if (typeof window !== 'undefined') {
      errorMessage += `\n[Browser: ${navigator.userAgent}]`;
      errorMessage += `\n[URL: ${window.location.href}]`;
    }
    
    return errorMessage;
  }

  captureExistingConsoleLogs() {
    // Override console methods that might have been called before our component loaded
    const consoleMethods = ['log', 'info', 'warn', 'error', 'debug', 'trace'];
    
    consoleMethods.forEach(method => {
      if (console[method] && typeof console[method] === 'function') {
        const originalMethod = console[method];
        console[method] = (...args) => {
          // Capture the log
          this.captureLog(method, args);
          // Call original method
          originalMethod.apply(console, args);
        };
      }
    });
  }

  getLogIcon(type) {
    const icons = {
      'error': '🔴',
      'warn': '⚠️',
      'log': '📝',
      'info': 'ℹ️',
      'debug': '🐛',
      'trace': '🔍'
    };
    return icons[type] || '📝';
  }

  getLogColor(type) {
    const colors = {
      'error': '#ef4444',
      'warn': '#f59e0b',
      'log': '#64748b',
      'info': '#3b82f6',
      'debug': '#10b981',
      'trace': '#8b5cf6'
    };
    return colors[type] || '#64748b';
  }

  overrideFetch() {
    if (!this.originalFetch || window.fetch !== this.originalFetch) return;
    
    const that = this;
    window.fetch = async function(...args) {
      const startTime = Date.now();
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'unknown';
      const method = (typeof args[0] === 'object' ? args[0]?.method : args[1]?.method) || 'GET';
      
      try {
        const response = await that.originalFetch.apply(window, args);
        
        if (!response.ok) {
          const errorDetails = await that.formatFetchError(response, startTime);
          that.captureLog('error', [`Network Error: ${response.status} ${response.statusText}`, errorDetails]);
        }
        
        return response;
      } catch (error) {
        const errorDetails = await that.formatFetchError(error, startTime);
        that.captureLog('error', [`Fetch Failed: ${error.message}`, errorDetails]);
        throw error; // Re-throw the error
      }
    };
  }

  overrideXHR() {
    if (!this.originalXHR) return;
    
    const originalXHROpen = this.originalXHR.prototype.open;
    const originalXHRSend = this.originalXHR.prototype.send;
    
    this.originalXHR.prototype.open = function(method, url) {
      this._method = method;
      this._url = url;
      this._startTime = Date.now();
      return originalXHROpen.apply(this, arguments);
    };
    
    this.originalXHR.prototype.send = function(body) {
      const startTime = this._startTime;
      const method = this._method;
      const url = this._url;
      
      const originalOnReadyStateChange = this.onreadystatechange;
      
      this.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 400) {
            const errorDetails = `XHR Error: ${this.status} ${this.statusText}\n` +
                                `Method: ${method}\n` +
                                `URL: ${url}\n` +
                                `Duration: ${Date.now() - startTime}ms`;
            window.ssConsoleMonitorInstance?.captureLog('error', [errorDetails]);
          }
        }
        
        if (originalOnReadyStateChange) {
          originalOnReadyStateChange.apply(this, arguments);
        }
      };
      
      return originalXHRSend.apply(this, arguments);
    };
    
    // Store reference to this instance for XHR callbacks
    window.ssConsoleMonitorInstance = this;
  }

  async formatFetchError(error, startTime) {
    let errorDetails = '';
    
    if (error instanceof Response) {
      const duration = Date.now() - startTime;
      const url = error.url || 'unknown';
      const method = error.method || 'GET';
      
      errorDetails = `HTTP ${error.status} ${error.statusText}\n` +
                    `Method: ${method}\n` +
                    `URL: ${url}\n` +
                    `Duration: ${duration}ms`;
      
      try {
        const responseText = await error.clone().text();
        if (responseText) {
          errorDetails += `\nResponse: ${responseText.substring(0, 200)}${responseText.length > 200 ? '...' : ''}`;
        }
      } catch (e) {
        errorDetails += `\nResponse: [Unable to read response body]`;
      }
    } else if (error instanceof Error) {
      errorDetails = `Fetch Error: ${error.name}\n` +
                    `Message: ${error.message}\n` +
                    `Duration: ${Date.now() - startTime}ms`;
      
      if (error.stack) {
        errorDetails += `\nStack: ${error.stack}`;
      }
    }
    
    return errorDetails;
  }
}

customElements.define('ss-console-monitor', SSConsoleMonitor);

// Early initialization - capture errors as soon as this script loads
if (typeof window !== 'undefined') {
  // Only initialize early if there's not already an instance
  if (!window.ssConsoleMonitorEarlyInstance) {
    SSConsoleMonitor.initializeEarly();
  }
  
  // Merge early errors with the main instance when it connects
  const mergeEarlyErrors = () => {
    const earlyInstance = window.ssConsoleMonitorEarlyInstance;
    const mainInstance = document.querySelector('ss-console-monitor');
    
    if (earlyInstance && mainInstance) {
      // Copy errors from early instance to main instance
      mainInstance.errors = [...earlyInstance.errors, ...mainInstance.errors];
      mainInstance.currentError = earlyInstance.currentError || mainInstance.currentError;
      
      // Clean up early instance
      window.ssConsoleMonitorEarlyInstance = null;
    }
  };
  
  // Try to merge immediately if DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(mergeEarlyErrors, 100);
  } else {
    window.addEventListener('DOMContentLoaded', mergeEarlyErrors);
  }
}