#!/usr/bin/env node

const { firefox } = require('playwright');

async function testAuthentication() {
  console.log('🔐 Testing authentication flow...');
  
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('🌐 Loading sequence page without authentication...');
    
    // Navigate to the sequence page
    const response = await page.goto('http://localhost:3000/app/relances/sequence/?id=2pDnIvlk5m', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log(`📍 Current URL: ${page.url()}`);
    console.log(`📊 Response status: ${response.status()}`);
    
    // Check if we were redirected to login
    if (page.url().includes('/login')) {
      console.log('✅ Successfully redirected to login page');
      
      // Check if login form elements exist
      const usernameExists = await page.$('#username');
      const passwordExists = await page.$('#password');
      
      if (usernameExists && passwordExists) {
        console.log('✅ Login form elements found');
      } else {
        console.log('❌ Login form elements not found');
        console.log('📝 Available elements:');
        const elements = await page.$$eval('*', els => els.map(el => el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : '')));
        console.log(elements.slice(0, 20).join('\n'));
      }
    } else {
      console.log('❌ Not redirected to login page');
      console.log('📝 Page content:');
      const content = await page.content();
      console.log(content.substring(0, 500));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAuthentication();