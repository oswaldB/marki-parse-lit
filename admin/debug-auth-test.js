#!/usr/bin/env node

const { firefox } = require('playwright');

async function debugAuthentication() {
  console.log('🔐 Debugging authentication flow...');
  
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capture console logs
  page.on('console', msg => {
    console.log(`📝 CONSOLE: ${msg.type()}: ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
    console.log(`🔴 PAGE ERROR: ${error.toString()}`);
  });
  
  page.on('requestfailed', request => {
    console.log(`🔴 REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
  });
  
  try {
    console.log('🌐 Loading sequence page without authentication...');
    
    // Navigate to the sequence page
    const response = await page.goto('http://localhost:3000/app/relances/sequence/?id=2pDnIvlk5m', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log(`📍 Current URL: ${page.url()}`);
    console.log(`📊 Response status: ${response.status()}`);
    
    // Wait a bit to see if any console logs appear
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

debugAuthentication();