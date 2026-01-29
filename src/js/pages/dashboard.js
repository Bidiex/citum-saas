
import { supabase } from '../core/supabase.js'

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
    document.getElementById('logout-btn').addEventListener('click', handleLogout)

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

    // Placeholder content for now - In future tasks this will load actual modules
    let content = ''
    switch (sectionName) {
        case 'home':
            content = `<h1>Dashboard</h1><p>Métricas generales aquí.</p>`
            break
        case 'business':
            content = `<h1>Mi Negocio</h1><p>Configuración del negocio.</p>`
            break
        case 'professionals':
            content = `<h1>Profesionales</h1><p>Gestión de staff.</p>`
            break
        case 'services':
            content = `<h1>Servicios</h1><p>Catálogo de servicios.</p>`
            break
        case 'promotions':
            content = `<h1>Promociones</h1><p>Campañas activas.</p>`
            break
        case 'support':
            content = `<h1>Soporte</h1><p>Tickets y ayuda.</p>`
            break
        default:
            content = `<h1>Sección no encontrada</h1>`
    }

    mainContent.innerHTML = content
}
