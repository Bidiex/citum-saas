
import { supabase } from '../core/supabase.js';
import { UI } from '../utils/ui.js';
import { renderBusinessSection } from '../modules/business.js'

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Dashboard DOMContentLoaded');

    // 1. Auth Check - Wrapped in try-catch to handle connection errors
    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (!data.session) {
            console.log('No session, redirecting to login');
            window.location.href = 'login.html';
            return;
        }

        console.log('User logged in:', data.session.user.email);
    } catch (err) {
        console.error('Auth Check Critical Error:', err);
        UI.showToast('Error conectando con el sistema. Verifique su conexión o configuración.', 'error');
        // We might want to stop here or allow partial loading. 
        // For now, let's allow navigation to init so UI doesn't freeze, but most data fetches will likely fail too.
    }

    // 2. Initialize Navigation
    initNavigation()

    // 3. Initialize Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => handleLogoutConfirm());
    }

    // 4. Mobile Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open')
        })
    }
})

function handleLogoutConfirm() {
    UI.showConfirm(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas salir?',
        async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.error('Error signing out:', error);
            window.location.href = 'login.html';
        },
        'Cerrar Sesión',
        'Cancelar',
        true // Destructive
    );
}

function initNavigation() {
    console.log('initNavigation started');
    // Handle initial hash or default to #home
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        console.log('Hash change detected:', window.location.hash);
        handleHashChange();
    });
}

function handleHashChange() {
    const hash = window.location.hash || '#home';
    const sectionName = hash.substring(1); // remove '#'
    console.log('handleHashChange:', hash, 'section:', sectionName);

    // Update UI (Sidebar Active State)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === hash) {
            item.classList.add('active');
        }
    });

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }

    // Load Content
    loadSection(sectionName);
}

function loadSection(sectionName) {
    console.log('loadSection:', sectionName);
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error('Main content container not found!');
        return;
    }

    mainContent.innerHTML = ''; // Clear

    switch (sectionName) {
        case 'home':
            mainContent.innerHTML = `
                <div id="section-home">
                    <h1>Bienvenido a Citum</h1>
                    <p class="text-muted">Resumen de tu negocio hoy.</p>
                </div>`;
            break;
        case 'business':
            console.log('Rendering business section...');
            try {
                renderBusinessSection(mainContent);
            } catch (err) {
                console.error('Error calling renderBusinessSection:', err);
            }
            break;
        case 'professionals':
            mainContent.innerHTML = `<h1>Profesionales</h1><p>Gestión de staff.</p>`;
            break;
        case 'services':
            mainContent.innerHTML = `<h1>Servicios</h1><p>Catálogo de servicios.</p>`;
            break;
        case 'promotions':
            mainContent.innerHTML = `<h1>Promociones</h1><p>Campañas activas.</p>`;
            break;
        case 'support':
            mainContent.innerHTML = `<h1>Soporte</h1><p>Tickets y ayuda.</p>`;
            break;
        default:
            console.warn('Section not found:', sectionName);
            mainContent.innerHTML = `<h1>Sección no encontrada</h1><p>La sección "${sectionName}" no existe.</p>`;
    }
}
