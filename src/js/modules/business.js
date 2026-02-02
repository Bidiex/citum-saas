import { supabase } from '../core/supabase.js';
import { UI } from '../utils/ui.js';

export async function renderBusinessSection(container) {
    // Show Spinner immediately
    container.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No usuario');

        // Fetch Business Info
        const { data: business, error: busError } = await supabase
            .from('businesses')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (busError) throw busError;

        // Fetch Hours
        const { data: hours, error: hoursError } = await supabase
            .from('business_hours')
            .select('*')
            .eq('business_id', business.id);

        // Render Form
        const html = `
            <div class="card">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h2><i class="ri-store-2-line" style="margin-right: 8px;"></i> Mi Negocio</h2>
                        <p class="text-muted">Gestiona la información pública de su negocio</p>
                    </div>
                    <button type="button" id="btn-save-business-header" class="btn btn-primary">
                        <i class="ri-save-line"></i>
                        <span class="btn-text">Guardar Cambios</span>
                    </button>
                </div>
                <div class="card-content">
                    <form id="edit-business-form" class="business-form-grid">
                        <!-- Avatar Section (Full Width) -->
                        <div class="form-group avatar-span" style="display: flex; justify-content: center;">
                            <div class="avatar-upload-container">
                                <label for="edit-business-logo" class="avatar-preview" id="edit-avatar-preview">
                                    ${business.logo_url
                ? `<img src="${business.logo_url}" alt="Logo">`
                : `<i class="ri-image-add-line"></i>`
            }
                                </label>
                                <label for="edit-business-logo" class="avatar-label">Cambiar Logo</label>
                                <input type="file" id="edit-business-logo" accept="image/*" style="display: none;">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label"><i class="ri-file-text-line" style="margin-right: 6px;"></i> Nombre</label>
                            <input type="text" id="edit-name" class="form-input" value="${business.name}" required>
                        </div>

                        <div class="form-group form-col-span-2">
                            <label class="form-label"><i class="ri-article-line" style="margin-right: 6px;"></i> Descripción</label>
                            <textarea id="edit-desc" class="form-input" rows="2">${business.description || ''}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label"><i class="ri-map-pin-line" style="margin-right: 6px;"></i> Dirección</label>
                            <input type="text" id="edit-address" class="form-input" value="${business.address || ''}" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label"><i class="ri-whatsapp-line" style="margin-right: 6px;"></i> Teléfono (WhatsApp)</label>
                            <input type="tel" id="edit-phone" class="form-input" value="${business.phone || ''}" required maxlength="10">
                        </div>

                        <div class="form-group">
                            <label class="form-label"><i class="ri-link" style="margin-right: 6px;"></i> URL (Slug)</label>
                            <div class="input-group">
                                <input type="text" class="form-input" value="${window.location.origin}/agenda/${business.slug}" disabled style="background-color: var(--secondary); color: var(--muted-foreground);">
                                <button type="button" id="btn-copy-url" class="btn btn-outline">
                                    <i class="ri-file-copy-line"></i> Copiar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Schedule Section (New Card) -->
            <div class="card" style="margin-top: var(--spacing-lg);">
                <div class="card-header">
                    <h3><i class="ri-time-line" style="margin-right: 8px;"></i> Horarios de Atención</h3>
                    <p class="text-muted text-sm font-normal">Configura los días y horas en que tu negocio está abierto para recibir citas.</p>
                </div>
                <div class="card-content">
                     <div id="edit-schedule-container" class="schedule-list"></div>
                </div>
            </div>

            <!-- Closures Section -->
            <div class="card" style="margin-top: var(--spacing-lg);">
                 <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3><i class="ri-calendar-close-line" style="margin-right: 8px;"></i> Temporadas de Cierre</h3>
                         <p class="text-muted text-sm font-normal">Programa días festivos o vacaciones donde no habrá servicio.</p>
                    </div>
                    <button id="btn-add-closure" class="btn btn-outline">
                        <i class="ri-add-line"></i>
                        <span class="btn-text">Agregar Cierre</span>
                    </button>
                </div>
                <div class="card-content">
                    <div id="closures-list" class="text-sm text-muted">Cargando cierres...</div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Populate Schedule
        renderEditSchedule(document.getElementById('edit-schedule-container'), hours);

        // Load Closures
        loadClosures(business.id);

        // Events
        // Header button triggers form submit
        document.getElementById('btn-save-business-header').addEventListener('click', () => {
            document.getElementById('edit-business-form').requestSubmit();
        });

        // Avatar Preview Event
        const logoInput = document.getElementById('edit-business-logo');
        const previewArea = document.getElementById('edit-avatar-preview');
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    previewArea.innerHTML = `<img src="${evt.target.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`;
                    previewArea.style.border = 'none';
                }
                reader.readAsDataURL(file);
            }
        });

        // Copy URL functionality
        const copyBtn = document.getElementById('btn-copy-url');
        copyBtn.addEventListener('click', () => {
            const url = `${window.location.origin}/agenda/${business.slug}`;
            navigator.clipboard.writeText(url).then(() => {
                copyBtn.classList.remove('btn-outline');
                copyBtn.classList.add('btn-primary');
                copyBtn.innerHTML = '<i class="ri-check-line"></i> Copiado';

                setTimeout(() => {
                    copyBtn.classList.remove('btn-primary');
                    copyBtn.classList.add('btn-outline');
                    copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copiar';
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
                UI.showToast('Error al copiar URL', 'error');
            });
        });

        document.getElementById('edit-business-form').addEventListener('submit', (e) => updateBusiness(e, business.id));
        document.getElementById('btn-add-closure').addEventListener('click', () => addClosure(business.id));

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="alert alert-error">Error cargando negocio: ${error.message}</div>`;
    }
}

function renderEditSchedule(container, hours) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const orderedDays = [1, 2, 3, 4, 5, 6, 0];

    orderedDays.forEach(dayIndex => {
        const dayName = days[dayIndex];
        const dayData = hours.find(h => h.day_of_week === dayIndex);
        const isActive = dayData ? dayData.is_active : false;
        const open = dayData ? dayData.open_time : '09:00';
        const close = dayData ? dayData.close_time : '18:00';

        const row = document.createElement('div');
        row.className = 'schedule-row';
        row.innerHTML = `
            <div class="schedule-day-check">
                <input type="checkbox" id="edit-day-${dayIndex}-active" ${isActive ? 'checked' : ''}>
                <label for="edit-day-${dayIndex}-active">${dayName}</label>
            </div>
            <div class="schedule-inputs">
                <input type="time" id="edit-day-${dayIndex}-open" class="form-input schedule-time" value="${open}" ${!isActive ? 'disabled' : ''}>
                <span>a</span>
                <input type="time" id="edit-day-${dayIndex}-close" class="form-input schedule-time" value="${close}" ${!isActive ? 'disabled' : ''}>
            </div>
        `;
        container.appendChild(row);

        const checkbox = row.querySelector(`#edit-day-${dayIndex}-active`);
        const inputs = row.querySelectorAll('input[type="time"]');

        checkbox.addEventListener('change', (e) => {
            inputs.forEach(input => input.disabled = !e.target.checked);
        });
    });
}

async function updateBusiness(e, businessId) {
    e.preventDefault();
    // Header button is external, so we find the submitter or default to generic logic. 
    // Since we triggered requestSubmit, the event is valid.

    // UI Feedback is tricky since button is outside form. 
    const saveBtn = document.getElementById('btn-save-business-header');
    const originalText = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="btn-text">Guardando...</span>';

    try {
        const phone = document.getElementById('edit-phone').value;
        if (!phone.startsWith('3') || phone.length !== 10) throw new Error('Teléfono inválido');

        // 1. Upload new Logo if selected
        const logoInput = document.getElementById('edit-business-logo');
        let newLogoUrl = null;

        if (logoInput.files.length > 0) {
            const file = logoInput.files[0];
            const fileExt = file.name.split('.').pop();
            // Use user_id prefix if available, but we don't have user object here easily.
            // Using businessId is safer for collision avoidance in this context.
            const fileName = `biz-${businessId}-${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('logos')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('logos')
                .getPublicUrl(fileName);

            newLogoUrl = publicUrl;
        }

        // 2. Prepare Update Data
        const updateData = {
            name: document.getElementById('edit-name').value,
            description: document.getElementById('edit-desc').value,
            address: document.getElementById('edit-address').value,
            phone: phone
        };

        if (newLogoUrl) {
            updateData.logo_url = newLogoUrl;
        }

        // 3. Updates Businesses Table
        const { error: updateError } = await supabase
            .from('businesses')
            .update(updateData)
            .eq('id', businessId);

        if (updateError) throw updateError;

        // 4. Update Hours
        const hoursData = [];
        const days = [0, 1, 2, 3, 4, 5, 6];
        days.forEach(dayIndex => {
            const isActive = document.getElementById(`edit-day-${dayIndex}-active`).checked;
            hoursData.push({
                business_id: businessId,
                day_of_week: dayIndex,
                open_time: document.getElementById(`edit-day-${dayIndex}-open`).value,
                close_time: document.getElementById(`edit-day-${dayIndex}-close`).value,
                is_active: isActive
            });
        });

        const { error: hoursError } = await supabase
            .from('business_hours')
            .upsert(hoursData, { onConflict: 'business_id, day_of_week' });

        if (hoursError) throw hoursError;

        UI.showToast('Cambios guardados correctamente', 'success');

        // Reload to show correct logo if updated
        if (newLogoUrl) {
            // Quick refresh of image without full reload if possible, but full render is safer
            renderBusinessSection(document.getElementById('section-business') || document.getElementById('main-content')); // fallback
        }

    } catch (error) {
        UI.showToast('Error: ' + error.message, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
    }
}

async function loadClosures(businessId) {
    const list = document.getElementById('closures-list');
    const { data: closures } = await supabase
        .from('business_closures')
        .select('*')
        .eq('business_id', businessId)
        .order('start_date', { ascending: true });

    if (!closures || closures.length === 0) {
        list.innerHTML = '<p>No hay cierres programados.</p>';
        return;
    }

    list.innerHTML = `
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Razón</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${closures.map(c => `
                        <tr>
                            <td>${c.start_date}</td>
                            <td>${c.end_date}</td>
                            <td>${c.reason || '-'}</td>
                            <td>
                                <button class="btn btn-ghost btn-xs text-red-500" onclick="deleteClosure('${c.id}', '${businessId}')" title="Eliminar">
                                    <i class="ri-delete-bin-line"></i>
                                    <span class="btn-text">Eliminar</span>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Hack for onclick function scope in module
    window.deleteClosure = (id, busId) => {
        UI.showConfirm(
            'Eliminar Cierre',
            '¿Estás seguro de que deseas eliminar este periodo de cierre?',
            async () => {
                const { error } = await supabase.from('business_closures').delete().eq('id', id);
                if (error) {
                    UI.showToast('Error al eliminar cierre', 'error');
                } else {
                    UI.showToast('Cierre eliminado', 'success');
                    loadClosures(busId);
                }
            },
            'Eliminar',
            'Cancelar',
            true
        );
    };
}

async function addClosure(businessId) {
    const start = prompt('Fecha inicio (YYYY-MM-DD):');
    if (!start) return;
    const end = prompt('Fecha fin (YYYY-MM-DD):');
    if (!end) return;
    const reason = prompt('Razón (opcional):');

    try {
        const { error } = await supabase.from('business_closures').insert({
            business_id: businessId,
            start_date: start,
            end_date: end,
            reason: reason
        });
        if (error) throw error;
        loadClosures(businessId);
        UI.showToast('Cierre agregado', 'success');
    } catch (err) {
        UI.showToast('Error al agregar cierre: ' + err.message, 'error');
    }
}
