
import { supabase } from '../core/supabase.js';
import { UI } from '../utils/ui.js';
import { renderBusinessSection } from '../modules/business.js'

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Auth Check - checkSession() is async, but we want to fail fast.
    // However, clean JS modules flow: verify session first.
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        window.location.href = 'login.html'
        return
    }

    console.log('User logged in:', session.user.email)

    // 2. Initialize Navigation
    initNavigation()

    // 3. Initialize Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
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
        });
    }

    // 4. Mobile Toggle
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open')
    })
})

async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error logging out:', error)
    window.location.href = 'login.html'
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item')
    const mainContent = document.getElementById('main-content')

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()

            // UI Update
            navItems.forEach(nav => nav.classList.remove('active'))
            item.classList.add('active')

            // Section Switch Logic
            const section = item.getAttribute('data-section')
            loadSection(section)

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open')
            }
        })
    })
}

function loadSection(sectionName) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '' // Clear

    switch (sectionName) {
        case 'home':
            mainContent.innerHTML = `<h1>Dashboard</h1><p>Métricas generales aquí.</p>`
            break
        case 'business':
            renderBusinessSection(mainContent)
            break
        case 'professionals':
            mainContent.innerHTML = `<h1>Profesionales</h1><p>Gestión de staff.</p>`
            break
        case 'services':
            mainContent.innerHTML = `<h1>Servicios</h1><p>Catálogo de servicios.</p>`
            break
        case 'promotions':
            mainContent.innerHTML = `<h1>Promociones</h1><p>Campañas activas.</p>`
            break
        case 'support':
            mainContent.innerHTML = `<h1>Soporte</h1><p>Tickets y ayuda.</p>`
            break
        default:
            mainContent.innerHTML = `<h1>Sección no encontrada</h1>`
    }
}
