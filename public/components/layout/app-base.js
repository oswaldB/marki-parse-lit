import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';
import '/components/check-auth.js';
import '/components/sidebar.js';
import '/components/galet-component.js';
import '/components/toaster.js';
import '/components/toaster-store.js';
import '/assets/parse-config.js';
import '/components/parse-credentials.js';



class appLayout extends LitElement {
    createRenderRoot() {
        return this; // Désactive le shadow DOM
    }

    render() {
        return html`
                <!-- Toaster Component -->
                <toaster-component></toaster-component>
                
                <!-- Galets -->
                <galet-component></galet-component>
                
                <!-- Auth Check -->
                <check-auth></check-auth>
                <!-- Sidebar -->
                <sidebar-component></sidebar-component>
                <!-- Main Content -->
                    <div class="flex flex-col min-h-screen">
                        <main class="flex-1 p-6">
                            <slot></slot>
                        </main>
                    </div>
                `;
            }
        }

customElements.define('app-layout', appLayout);