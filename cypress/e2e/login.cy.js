/// <reference types="cypress" />

describe('Login Page Test', () => {
  it('should open login page and check console', () => {
    // Open the login page
    cy.visit('/app2/login/');
    
    // Wait for page to fully load
    cy.wait(2000);
    
    // Check if the layout is loaded
    cy.get('ss-app-layout').should('exist');
    
    // Check if pebbles are present in the DOM
    cy.get('marki-pebble-blue').should('exist');
    cy.get('marki-pebble-dark').should('exist');
    cy.get('marki-pebble-gray').should('exist');
    
    // Check if pebbles are visible
    cy.get('marki-pebble-blue').should('be.visible');
    cy.get('marki-pebble-dark').should('be.visible');
    cy.get('marki-pebble-gray').should('be.visible');
    
    // Check the number of pebbles (should be 6 total)
    cy.get('marki-pebble-blue').should('have.length', 2);
    cy.get('marki-pebble-dark').should('have.length', 2);
    cy.get('marki-pebble-gray').should('have.length', 2);
    
    // Save console logs
    Cypress.on('window:before:load', (win) => {
      // Override console methods to capture logs
      const originalConsole = {
        log: win.console.log,
        error: win.console.error,
        warn: win.console.warn,
        info: win.console.info
      };
      
      const consoleLogs = {
        log: [],
        error: [],
        warn: [],
        info: []
      };
      
      win.console.log = function(...args) {
        consoleLogs.log.push(args);
        originalConsole.log.apply(console, args);
      };
      
      win.console.error = function(...args) {
        consoleLogs.error.push(args);
        originalConsole.error.apply(console, args);
      };
      
      win.console.warn = function(...args) {
        consoleLogs.warn.push(args);
        originalConsole.warn.apply(console, args);
      };
      
      win.console.info = function(...args) {
        consoleLogs.info.push(args);
        originalConsole.info.apply(console, args);
      };
      
      // Store console logs in Cypress environment
      win.consoleLogs = consoleLogs;
    });
    
    // After page load, output console logs
    cy.window().then((win) => {
      if (win.consoleLogs) {
        console.log('=== CONSOLE LOGS ===');
        
        if (win.consoleLogs.error.length > 0) {
          console.log('ERRORS:');
          win.consoleLogs.error.forEach(log => {
            console.log(...log);
          });
        }
        
        if (win.consoleLogs.warn.length > 0) {
          console.log('WARNINGS:');
          win.consoleLogs.warn.forEach(log => {
            console.log(...log);
          });
        }
        
        if (win.consoleLogs.info.length > 0) {
          console.log('INFOS:');
          win.consoleLogs.info.forEach(log => {
            console.log(...log);
          });
        }
        
        if (win.consoleLogs.log.length > 0) {
          console.log('LOGS:');
          win.consoleLogs.log.forEach(log => {
            console.log(...log);
          });
        }
        
        if (win.consoleLogs.error.length === 0 && 
            win.consoleLogs.warn.length === 0 && 
            win.consoleLogs.info.length === 0 && 
            win.consoleLogs.log.length === 0) {
          console.log('No console logs captured');
        }
      } else {
        console.log('Console logs not available');
      }
    });
    
    // Take a screenshot for visual verification
    cy.screenshot('login-with-pebbles', {
      capture: 'fullPage',
      overwrite: true
    });
  });
});