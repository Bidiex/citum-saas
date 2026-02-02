import { supabase } from '../core/supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Auth Check
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '../pages/login.html';
        return;
    }

    // 2. Check if business already exists (Double check to avoid duplicates)
    // If it exists, redirect to dashboard
    const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

    if (existingBusiness) {
        window.location.href = 'dashboard.html';
        return;
    }

    initOnboarding();
});

function initOnboarding() {
    const nameInput = document.getElementById('business-name');
    const slugInput = document.getElementById('business-slug');
    const form = document.getElementById('onboarding-form');

    // Auto-generate slug
    nameInput.addEventListener('input', (e) => {
        const slug = slugify(e.target.value);
        slugInput.value = slug;
    });

    // Avatar Preview
    const logoInput = document.getElementById('business-logo');
    const previewArea = document.getElementById('avatar-preview-area');

    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewArea.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                previewArea.style.border = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // Generate Schedule Rows
    generateScheduleRows();

    // Form Submit
    form.addEventListener('submit', handleOnboardingSubmit);
}

function slugify(text) {
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

function generateScheduleRows() {
    const container = document.getElementById('weekly-schedule');
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Starting with Monday (1) to Sunday (0) usually makes more sense for businesses, 
    // but 0-6 index is standard. Let's render Mon-Sun order visually but keep IDs correct.
    const orderedDays = [1, 2, 3, 4, 5, 6, 0];

    orderedDays.forEach(dayIndex => {
        const dayName = days[dayIndex];
        const row = document.createElement('div');
        row.className = 'schedule-row';
        row.innerHTML = `
            <div style="width: 120px; display: flex; align-items: center;">
                <input type="checkbox" id="day-${dayIndex}-active" checked style="margin-right: 8px;">
                <label for="day-${dayIndex}-active" style="margin-bottom:0; cursor:pointer;">${dayName}</label>
            </div>
            <input type="time" id="day-${dayIndex}-open" class="form-input schedule-time" value="09:00">
            <span style="margin: 0 8px;">a</span>
            <input type="time" id="day-${dayIndex}-close" class="form-input schedule-time" value="18:00">
        `;
        container.appendChild(row);

        // Toggle inputs on checkbox change
        const checkbox = row.querySelector(`#day-${dayIndex}-active`);
        const inputs = row.querySelectorAll('input[type="time"]');

        checkbox.addEventListener('change', (e) => {
            inputs.forEach(input => input.disabled = !e.target.checked);
            row.style.opacity = e.target.checked ? '1' : '0.5';
        });
    });
}

async function handleOnboardingSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    setLoading(btn, true, 'Guardando...');

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No usuario autenticado');

        // 1. Validate Phone
        const phone = document.getElementById('business-phone').value;
        if (!phone.startsWith('3') || phone.length !== 10) {
            throw new Error('El teléfono debe tener 10 dígitos y comenzar por 3.');
        }

        // 2. Validate Slug Uniqueness
        const slug = document.getElementById('business-slug').value;
        const { data: slugCheck } = await supabase
            .from('businesses')
            .select('id')
            .eq('slug', slug)
            .single();

        if (slugCheck) {
            throw new Error('Este nombre de negocio (URL) ya está en uso. Por favor elige otro.');
        }

        // Upload Logo if present
        const logoInput = document.getElementById('business-logo');
        let logoUrl = null;
        if (logoInput.files.length > 0) {
            const file = logoInput.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('logos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('logos')
                .getPublicUrl(filePath);

            logoUrl = publicUrl;
        }

        // 3. Insert Business
        const businessData = {
            user_id: user.id,
            name: document.getElementById('business-name').value,
            slug: slug,
            description: document.getElementById('business-desc').value,
            address: document.getElementById('business-address').value,
            phone: phone,
            logo_url: logoUrl
        };

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .insert(businessData)
            .select()
            .single();

        if (businessError) throw businessError;

        // 4. Insert Hours
        const hoursData = [];
        const days = [0, 1, 2, 3, 4, 5, 6];
        days.forEach(dayIndex => {
            const isActive = document.getElementById(`day-${dayIndex}-active`).checked;
            if (isActive) {
                hoursData.push({
                    business_id: business.id,
                    day_of_week: dayIndex,
                    open_time: document.getElementById(`day-${dayIndex}-open`).value,
                    close_time: document.getElementById(`day-${dayIndex}-close`).value,
                    is_active: true
                });
            }
        });

        if (hoursData.length > 0) {
            const { error: hoursError } = await supabase
                .from('business_hours')
                .insert(hoursData);

            if (hoursError) throw hoursError; // Non-fatal? Maybe, but better to fail.
        }

        // Success
        alert('¡Negocio creado exitosamente!');
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error(error);
        alert(error.message || 'Error al guardar el negocio');
    } finally {
        setLoading(btn, false, 'Guardar y Continuar');
    }
}

function setLoading(btn, isLoading, text) {
    btn.disabled = isLoading;
    btn.textContent = text;
}
