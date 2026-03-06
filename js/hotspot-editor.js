/**
 * Hotspot Editor - Visual tool for creating interactive catalog maps
 */

let hotspots = [];
let selectedHotspot = null;
let imageLoaded = false;

const imageUpload = document.getElementById('imageUpload');
const imageInput = document.getElementById('imageInput');
const categorySelect = document.getElementById('categorySelect');
const previewInput = document.getElementById('previewInput');
const selectPreviewBtn = document.getElementById('selectPreviewBtn');
const previewPath = document.getElementById('previewPath');
const previewDisplay = document.getElementById('previewDisplay');
const deleteBtn = document.getElementById('deleteBtn');
const generateBtn = document.getElementById('generateBtn');
const codeOutput = document.getElementById('codeOutput');
const hotspotsList = document.getElementById('hotspotsList');
const hotspotsCount = document.getElementById('hotspotsCount');
const coordsDisplay = document.getElementById('coordsDisplay');
const copyNotification = document.getElementById('copyNotification');

// Upload image
let uploadClickHandler = (e) => {
    // Only trigger file input if clicking on the upload area itself, not on the canvas
    if (!imageLoaded && e.target.closest('#imageUpload') && !e.target.closest('.canvas-wrapper')) {
        imageInput.click();
    }
};
imageUpload.addEventListener('click', uploadClickHandler);

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            loadImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Preview image selection
selectPreviewBtn.addEventListener('click', () => {
    if (!selectedHotspot) {
        alert('Сначала выберите точку на карте!');
        return;
    }
    previewInput.click();
});

previewInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && selectedHotspot) {
        // Store the relative path (you can customize this based on your folder structure)
        const relativePath = `imgs/cataloge/${file.name}`;
        
        selectedHotspot.preview = relativePath;
        previewPath.textContent = `✓ ${file.name}`;
        previewPath.style.color = '#51cf66';
        previewPath.style.fontWeight = '600';
        previewDisplay.classList.add('has-file');
        
        updateHotspotsList();
    }
    
    // Reset input so the same file can be selected again
    e.target.value = '';
});

// Drag and drop
imageUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUpload.style.borderColor = '#c3a762';
});

imageUpload.addEventListener('dragleave', () => {
    imageUpload.style.borderColor = '#ccc';
});

imageUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUpload.style.borderColor = '#ccc';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            loadImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function loadImage(src) {
    imageUpload.classList.add('has-image');
    imageUpload.innerHTML = `
        <div class="canvas-wrapper" id="canvasWrapper">
            <img src="${src}" alt="Map" class="canvas-image" id="canvasImage">
        </div>
    `;
    
    imageLoaded = true;
    
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvasImage = document.getElementById('canvasImage');
    
    // Show coordinates on hover
    canvasImage.addEventListener('mousemove', (e) => {
        const rect = canvasImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        coordsDisplay.innerHTML = `
            <strong>Координаты курсора:</strong><br>
            top: ${Math.round(y * 10) / 10}%<br>
            left: ${Math.round(x * 10) / 10}%<br>
            <small style="color: #666;">Кликните чтобы добавить точку</small>
        `;
    });
    
    // Click to add hotspot
    canvasImage.addEventListener('click', (e) => {
        const rect = canvasImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        addHotspot(x, y);
    });
}

function addHotspot(x, y) {
    const id = Date.now();
    const hotspot = {
        id,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        category: '',
        title: '',
        preview: ''
    };
    
    hotspots.push(hotspot);
    renderHotspot(hotspot);
    selectHotspot(hotspot);
    updateHotspotsList();
}

function renderHotspot(hotspot) {
    const canvasWrapper = document.getElementById('canvasWrapper');
    
    const hotspotEl = document.createElement('div');
    hotspotEl.className = 'editor-hotspot';
    hotspotEl.id = `hotspot-${hotspot.id}`;
    hotspotEl.style.left = `${hotspot.x}%`;
    hotspotEl.style.top = `${hotspot.y}%`;
    
    const labelText = hotspot.title || 'Новая точка';
    
    hotspotEl.innerHTML = `
        <div class="editor-hotspot-dot"></div>
        <div class="hotspot-label">${labelText}</div>
    `;
    
    // Click to select
    hotspotEl.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        selectHotspot(hotspot);
    });
    
    // Drag to move
    makeDraggable(hotspotEl, hotspot);
    
    canvasWrapper.appendChild(hotspotEl);
}

function makeDraggable(element, hotspot) {
    let isDragging = false;
    let startX, startY;
    
    element.addEventListener('mousedown', (e) => {
        if (e.target.closest('.editor-hotspot-dot')) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            element.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const canvasImage = document.getElementById('canvasImage');
        const rect = canvasImage.getBoundingClientRect();
        
        const newX = ((e.clientX - rect.left) / rect.width) * 100;
        const newY = ((e.clientY - rect.top) / rect.height) * 100;
        
        hotspot.x = Math.max(0, Math.min(100, Math.round(newX * 10) / 10));
        hotspot.y = Math.max(0, Math.min(100, Math.round(newY * 10) / 10));
        
        element.style.left = `${hotspot.x}%`;
        element.style.top = `${hotspot.y}%`;
        
        updateCoordinatesDisplay(hotspot);
    });
    
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'move';
            updateHotspotsList();
            e.stopPropagation();
        }
    });
}

function selectHotspot(hotspot) {
    selectedHotspot = hotspot;
    
    // Update UI
    document.querySelectorAll('.editor-hotspot').forEach(el => el.classList.remove('selected'));
    document.getElementById(`hotspot-${hotspot.id}`).classList.add('selected');
    
    document.querySelectorAll('.hotspot-item').forEach(el => el.classList.remove('selected'));
    const listItem = document.getElementById(`list-${hotspot.id}`);
    if (listItem) listItem.classList.add('selected');
    
    // Fill form
    categorySelect.value = hotspot.category;
    
    // Update preview path display
    if (hotspot.preview) {
        const fileName = hotspot.preview.split('/').pop();
        previewPath.textContent = `✓ ${fileName}`;
        previewPath.style.color = '#51cf66';
        previewPath.style.fontWeight = '600';
        previewDisplay.classList.add('has-file');
    } else {
        previewPath.textContent = 'Файл не выбран';
        previewPath.style.color = '#666';
        previewPath.style.fontWeight = 'normal';
        previewDisplay.classList.remove('has-file');
    }
    
    deleteBtn.style.display = 'block';
    updateCoordinatesDisplay(hotspot);
}

function updateCoordinatesDisplay(hotspot) {
    coordsDisplay.innerHTML = `
        <strong>Координаты:</strong><br>
        top: ${hotspot.y}%<br>
        left: ${hotspot.x}%
    `;
}

function updateHotspotsList() {
    hotspotsList.innerHTML = '';
    hotspotsCount.textContent = hotspots.length;
    
    hotspots.forEach(hotspot => {
        const item = document.createElement('div');
        item.className = 'hotspot-item';
        item.id = `list-${hotspot.id}`;
        
        if (selectedHotspot && selectedHotspot.id === hotspot.id) {
            item.classList.add('selected');
        }
        
        const hasPreview = hotspot.preview ? '<i class="fas fa-image" style="color: #51cf66; margin-left: 5px;"></i>' : '';
        
        item.innerHTML = `
            <div class="hotspot-item-info">
                <div class="hotspot-item-title">${hotspot.title || 'Без названия'}${hasPreview}</div>
                <div class="hotspot-item-coords">${hotspot.category || 'Без категории'} • ${hotspot.y}%, ${hotspot.x}%</div>
            </div>
            <div class="hotspot-item-delete" data-id="${hotspot.id}">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.hotspot-item-delete')) {
                selectHotspot(hotspot);
            }
        });
        
        item.querySelector('.hotspot-item-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHotspot(hotspot.id);
        });
        
        hotspotsList.appendChild(item);
    });
}

function deleteHotspot(id) {
    hotspots = hotspots.filter(h => h.id !== id);
    
    const element = document.getElementById(`hotspot-${id}`);
    if (element) element.remove();
    
    if (selectedHotspot && selectedHotspot.id === id) {
        selectedHotspot = null;
        categorySelect.value = '';
        previewPath.textContent = 'Файл не выбран';
        previewPath.style.color = '#666';
        previewPath.style.fontWeight = 'normal';
        previewDisplay.classList.remove('has-file');
        deleteBtn.style.display = 'none';
        coordsDisplay.innerHTML = '<strong><i class="fas fa-crosshairs"></i> Координаты:</strong> Выберите точку';
    }
    
    updateHotspotsList();
}

// Update hotspot data on input change
categorySelect.addEventListener('change', () => {
    if (selectedHotspot) {
        selectedHotspot.category = categorySelect.value;
        
        // Get title from selected option's data-title attribute
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        selectedHotspot.title = selectedOption.getAttribute('data-title') || '';
        
        updateHotspotLabel(selectedHotspot);
        updateHotspotsList();
    }
});

function updateHotspotLabel(hotspot) {
    const element = document.getElementById(`hotspot-${hotspot.id}`);
    if (element) {
        const label = element.querySelector('.hotspot-label');
        label.textContent = hotspot.title || 'Новая точка';
    }
}

deleteBtn.addEventListener('click', () => {
    if (selectedHotspot) {
        deleteHotspot(selectedHotspot.id);
    }
});

// Generate code
generateBtn.addEventListener('click', () => {
    if (hotspots.length === 0) {
        alert('Добавьте хотя бы одну точку!');
        return;
    }
    
    let code = `<!-- Interactive Catalog Map -->\n`;
    code += `<section class="interactive-catalog-map">\n`;
    code += `    <div class="container">\n`;
    code += `        <div class="interactive-map-wrapper">\n`;
    code += `            <img src="imgs/cataloge/ваше-изображение.png" alt="Catalog Map" class="catalog-map-image">\n\n`;
    
    hotspots.forEach(hotspot => {
        if (!hotspot.category) return;
        
        code += `            <!-- ${hotspot.title || 'Точка'} -->\n`;
        code += `            <div class="hotspot" data-category="${hotspot.category}" style="top: ${hotspot.y}%; left: ${hotspot.x}%;">\n`;
        code += `                <div class="hotspot-pulse"></div>\n`;
        code += `                <div class="hotspot-preview">\n`;
        code += `                    <div class="hotspot-preview-image">\n`;
        code += `                        <img src="${hotspot.preview || 'imgs/cataloge/placeholder.png'}" alt="${hotspot.title}">\n`;
        code += `                    </div>\n`;
        code += `                    <div class="hotspot-preview-content">\n`;
        code += `                        <div class="hotspot-preview-title">${hotspot.title}</div>\n`;
        code += `                        <div class="hotspot-preview-action">\n`;
        code += `                            <span>Посмотреть все</span>\n`;
        code += `                            <i class="fas fa-arrow-right"></i>\n`;
        code += `                        </div>\n`;
        code += `                    </div>\n`;
        code += `                </div>\n`;
        code += `            </div>\n\n`;
    });
    
    code += `        </div>\n`;
    code += `    </div>\n`;
    code += `</section>`;
    
    codeOutput.textContent = code;
    codeOutput.style.display = 'block';
    
    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        showCopyNotification();
    });
    
    // Scroll to code
    codeOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function showCopyNotification() {
    copyNotification.classList.add('show');
    setTimeout(() => {
        copyNotification.classList.remove('show');
    }, 3000);
}

// Click on code to copy
codeOutput.addEventListener('click', () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        showCopyNotification();
    });
});
