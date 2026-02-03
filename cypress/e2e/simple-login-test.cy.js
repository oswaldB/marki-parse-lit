/// <reference types="cypress" />

describe('Simple Login Page Console Test', () => {
  it('should open login page and save console logs', () => {
    // Configure console logging
    const consoleLogs = [];
    
    // Override console methods before page load
    Cypress.on('window:before:load', (win) => {
      ['log', 'error', 'warn', 'info'].forEach((method) => {
        const original = win.console[method];
        win.console[method] = function(...args) {
          consoleLogs.push({
            method: method.toUpperCase(),
            args: args,
            timestamp: new Date().toISOString()
          });
          original.apply(console, args);
        };
      });
    });
    
    // Open the login page
    cy.visit('/app2/login/', {
      onBeforeLoad: (win) => {
        // Ensure console override is in place
        win.consoleLogs = consoleLogs;
      }
    });
    
    // Wait for page to load
    cy.wait(3000);
    
    // Output all captured console logs
    cy.window().then((win) => {
      console.log('\n=== CONSOLE LOGS FROM LOGIN PAGE ===');
      console.log(`Total logs captured: ${consoleLogs.length}`);
      console.log('====================================\n');
      
      consoleLogs.forEach((log, index) => {
        console.log(`[${log.timestamp}] [${log.method}]:`);
        log.args.forEach(arg => {
          if (typeof arg === 'object') {
            console.log(JSON.stringify(arg, null, 2));
          } else {
            console.log(arg);
          }
        });
        if (index < consoleLogs.length - 1) {
          console.log('---');
        }
      });
      
      if (consoleLogs.length === 0) {
        console.log('No console logs were captured.');
      }
    });
    
    // Simple verification that page loaded
    cy.get('body').should('exist');
    cy.title().should('include', 'Connexion');
    
    console.log('\n=== TEST COMPLETED ===');
  });
});