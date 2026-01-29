import { supabase } from '../core/supabase.js'

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form')
    const registerForm = document.getElementById('register-form')
    const showRegisterBtn = document.getElementById('show-register')
    const showLoginBtn = document.getElementById('show-login')

    // Toggle Logic
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault()
            loginForm.classList.add('hidden')
            registerForm.classList.remove('hidden')
            document.querySelector('.login-header h1').textContent = 'Crear Cuenta'
            document.querySelector('.login-header p').textContent = 'Únete a Citum'
        })
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault()
            registerForm.classList.add('hidden')
            loginForm.classList.remove('hidden')
            document.querySelector('.login-header h1').textContent = 'Citum'
            document.querySelector('.login-header p').textContent = 'Gestiona tu agenda profesional'
        })
    }

    // Forms Handlers
    if (loginForm) loginForm.addEventListener('submit', handleLogin)
    if (registerForm) registerForm.addEventListener('submit', handleRegister)
})

async function handleLogin(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const submitBtn = e.target.querySelector('button[type="submit"]')

    try {
        setLoading(submitBtn, true, 'Iniciando...')
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        window.location.href = 'dashboard.html'
    } catch (error) {
        alert('Error: ' + error.message)
    } finally {
        setLoading(submitBtn, false, 'Iniciar Sesión')
    }
}

async function handleRegister(e) {
    e.preventDefault()
    const email = document.getElementById('reg-email').value
    const password = document.getElementById('reg-password').value
    const confirmPassword = document.getElementById('reg-password-confirm').value
    const submitBtn = e.target.querySelector('button[type="submit"]')

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
    }

    try {
        setLoading(submitBtn, true, 'Registrando...')
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error

        alert('Registro exitoso. ' + (data.session ? 'Bienvenido!' : 'Por favor revisa tu correo para confirmar.'))
        if (data.session) window.location.href = 'dashboard.html'
    } catch (error) {
        alert('Error: ' + error.message)
    } finally {
        setLoading(submitBtn, false, 'Crear Cuenta')
    }
}

function setLoading(btn, isLoading, text) {
    if (isLoading) {
        btn.disabled = true
        btn.textContent = text
    } else {
        btn.disabled = false
        btn.textContent = text
    }
}
