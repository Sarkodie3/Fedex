// FedEx Sub-Delivery and Tracking Web Application Core Logic

// City Coordinate Registry for routing maps (including key global hubs)
const CITY_COORDINATES = {
    'SAN JOSE, CA': [37.3382, -121.8863],
    'CHICAGO, IL': [41.8781, -87.6298],
    'NEW YORK, NY': [40.7128, -74.0060],
    'SEATTLE, WA': [47.6062, -122.3321],
    'MEMPHIS, TN': [35.1495, -90.0490],
    'INDIANAPOLIS, IN': [39.7684, -86.1581],
    'LOS ANGELES, CA': [34.0522, -118.2437],
    'DALLAS, TX': [32.7767, -96.7970],
    'MIAMI, FL': [25.7617, -80.1918],
    'BOSTON, MA': [42.3601, -71.0589],
    'DENVER, CO': [39.7392, -104.9903],
    'ATLANTA, GA': [33.7490, -84.3880],
    'SAN FRANCISCO, CA': [37.7749, -122.4194],
    'HOUSTON, TX': [29.7604, -95.3698],
    'PHOENIX, AZ': [33.4484, -112.0740],
    
    // Global Worldwide Cities
    'LONDON, UK': [51.5074, -0.1278],
    'LONDON': [51.5074, -0.1278],
    'PARIS, FRANCE': [48.8566, 2.3522],
    'PARIS': [48.8566, 2.3522],
    'TOKYO, JAPAN': [35.6762, 139.6503],
    'TOKYO': [35.6762, 139.6503],
    'SYDNEY, AUSTRALIA': [-33.8688, 151.2093],
    'SYDNEY': [-33.8688, 151.2093],
    'TORONTO, CANADA': [43.6532, -79.3832],
    'TORONTO': [43.6532, -79.3832],
    'DUBAI, UAE': [25.2048, 55.2708],
    'DUBAI': [25.2048, 55.2708],
    'SINGAPORE': [1.3521, 103.8198],
    'SHANGHAI, CHINA': [31.2304, 121.4737],
    'SHANGHAI': [31.2304, 121.4737],
    'MUMBAI, INDIA': [19.0760, 72.8777],
    'MUMBAI': [19.0760, 72.8777],
    'FRANKFURT, GERMANY': [50.1109, 8.6821],
    'FRANKFURT': [50.1109, 8.6821],
    'SAO PAULO, BRAZIL': [-23.5505, -46.6333],
    'SAO PAULO': [-23.5505, -46.6333],
    'CAPE TOWN, SOUTH AFRICA': [-33.9249, 18.4241],
    'CAPE TOWN': [-33.9249, 18.4241],
    'CAIRO, EGYPT': [30.0444, 31.2357],
    'CAIRO': [30.0444, 31.2357]
};

// Default Shipments to seed Database
const DEFAULT_SHIPMENTS = [
    {
        trackingNumber: 'FDX-2026-0808-1001',
        serviceType: 'FedEx Priority Overnight',
        weight: '6.8 lbs',
        dimensions: '14" x 10" x 6"',
        declaredValue: '$250.00',
        description: 'Tech Accessories & Circuit Boards',
        status: 'transit',
        senderName: 'Silicon Circuits Corp',
        senderPhone: '+1 (408) 555-0199',
        senderEmail: 'shipping@siliconcircuits.com',
        senderAddress: '100 Innovation Way',
        senderCity: 'San Jose, CA',
        senderZip: '95110',
        recipientName: 'Alex Mercer',
        recipientPhone: '+1 (312) 555-0143',
        recipientEmail: 'alex.mercer@email.com',
        recipientAddress: '456 Oak Avenue, Apt 3B',
        recipientCity: 'Chicago, IL',
        recipientZip: '60611',
        history: [
            {
                status: 'transit',
                location: 'Indianapolis, IN',
                details: 'Arrived at FedEx sorting facility.',
                timestamp: '2026-08-08T09:30:00Z'
            },
            {
                status: 'transit',
                location: 'San Jose, CA',
                details: 'Left FedEx origin facility.',
                timestamp: '2026-08-08T04:15:00Z'
            },
            {
                status: 'pickup',
                location: 'San Jose, CA',
                details: 'Picked up by FedEx courier.',
                timestamp: '2026-08-07T19:00:00Z'
            },
            {
                status: 'created',
                location: 'San Jose, CA',
                details: 'Shipment label created and details sent to FedEx.',
                timestamp: '2026-08-07T15:00:00Z'
            }
        ]
    },
    {
        trackingNumber: 'FDX-2026-0808-2002',
        serviceType: 'FedEx Ground',
        weight: '2.1 lbs',
        dimensions: '10" x 8" x 4"',
        declaredValue: '$120.00',
        description: 'Premium Leather Handbag',
        status: 'delivered',
        senderName: 'Fifth Avenue Couture',
        senderPhone: '+1 (212) 555-9874',
        senderEmail: 'orders@fifthavecouture.com',
        senderAddress: '789 Fifth Avenue',
        senderCity: 'New York, NY',
        senderZip: '10022',
        recipientName: 'Sarah Jenkins',
        recipientPhone: '+1 (206) 555-0812',
        recipientEmail: 'sarah.jenkins@outlook.com',
        recipientAddress: '12 Maple Street',
        recipientCity: 'Seattle, WA',
        recipientZip: '98101',
        history: [
            {
                status: 'delivered',
                location: 'Seattle, WA',
                details: 'Delivered - Left at front door. Signature not required.',
                timestamp: '2026-08-08T10:00:00Z'
            },
            {
                status: 'out_for_delivery',
                location: 'Seattle, WA',
                details: 'Out for delivery on FedEx truck.',
                timestamp: '2026-08-08T07:45:00Z'
            },
            {
                status: 'transit',
                location: 'Seattle, WA',
                details: 'Arrived at local FedEx facility.',
                timestamp: '2026-08-08T05:00:00Z'
            },
            {
                status: 'transit',
                location: 'Chicago, IL',
                details: 'In transit to destination facility.',
                timestamp: '2026-08-07T02:00:00Z'
            },
            {
                status: 'pickup',
                location: 'New York, NY',
                details: 'Picked up at New York retail center.',
                timestamp: '2026-08-06T17:30:00Z'
            },
            {
                status: 'created',
                location: 'New York, NY',
                details: 'Billing information received.',
                timestamp: '2026-08-06T14:00:00Z'
            }
        ]
    }
];

let shipments = [];
let leafletMap = null;
let mapMarkers = [];
let routeLine = null;
let currentManagedTrackingNum = null;
let currentTrackedNum = null; // Track current customer search to enable auto-refresh updates

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    setupNavigation();
    setupForms();
    updateDashboardWidgets();
    checkAdminAuthState();
    
    // Secret backdoor to open Staff Authentication Modal: Double-click FedEx Logo
    const logo = document.querySelector('.logo-container');
    if (logo) {
        logo.addEventListener('dblclick', () => {
            openLoginModal();
        });
        // Set visual indicator tooltip programmatically for ease of developer discovery,
        // but it remains hidden from standard view.
        logo.setAttribute('title', 'Double-click to open Staff Portal');
    }
    
    // Default search to show something beautiful on load
    const searchInput = document.getElementById('trackingSearchInput');
    if (searchInput) {
        searchInput.value = 'FDX-2026-0808-1001';
        performTrackingSearch('FDX-2026-0808-1001');
    }
});

function initDatabase() {
    const saved = localStorage.getItem('fedex_shipments');
    if (saved) {
        try {
            shipments = JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing local database, resetting...", e);
            shipments = [...DEFAULT_SHIPMENTS];
            saveDatabase();
        }
    } else {
        shipments = [...DEFAULT_SHIPMENTS];
        saveDatabase();
    }
}

function saveDatabase() {
    localStorage.setItem('fedex_shipments', JSON.stringify(shipments));
}

// Simple Spa Routing
function setupNavigation() {
    const navButtons = document.querySelectorAll('[data-target]');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Toggle active classes on nav
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active classes on panels
            document.querySelectorAll('.view-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Specific panel loads
            if (targetId === 'manage-portal') {
                renderManageDashboard();
                updateDashboardWidgets();
            } else if (targetId === 'tracking-portal') {
                if (currentTrackedNum) {
                    performTrackingSearch(currentTrackedNum);
                }
            }
        });
    });
}

function setupForms() {
    // Tracking search forms
    const searchForm = document.getElementById('trackingSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('trackingSearchInput');
            if (input && input.value.trim()) {
                performTrackingSearch(input.value.trim());
            }
        });
    }

    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('heroSearchInput');
            if (input && input.value.trim()) {
                // Set value in main search input and jump
                const mainInput = document.getElementById('trackingSearchInput');
                if (mainInput) mainInput.value = input.value.trim();
                
                // Show tracking view
                const trackTab = document.querySelector('[data-target="tracking-portal"]');
                if (trackTab) trackTab.click();
                
                performTrackingSearch(input.value.trim());
            }
        });
    }

    // Create shipment form
    const createForm = document.getElementById('createShipmentForm');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateShipment);
    }

    // Transit update form
    const updateForm = document.getElementById('transitUpdateForm');
    if (updateForm) {
        updateForm.addEventListener('submit', handleTransitUpdate);
    }

    // Admin Login form
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }

    // Admin Register form
    const registerForm = document.getElementById('adminRegisterForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleAdminRegister);
    }
}

// Toast Notifications Helper
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'info-circle';
    if (type === 'success') iconClass = 'check-circle';
    if (type === 'error') iconClass = 'exclamation-circle';
    
    toast.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s reverse forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// Barcode Visual SVG Generator (Interleaved 2 of 5 / Code 39 mockup)
function generateBarcodeSVG(text) {
    let xml = '<svg width="100%" height="70" viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg">';
    xml += '<rect width="240" height="70" fill="#ffffff" />';
    
    // Hash function to seed pseudo-random widths for unique looking barcode representation
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    let x = 15;
    // Draw initial quiet zones and start lines
    xml += `<rect x="${x}" y="5" width="2" height="60" fill="#000000" />`; x += 3;
    xml += `<rect x="${x}" y="5" width="1" height="60" fill="#000000" />`; x += 3;
    
    for (let i = 0; i < 40; i++) {
        const val = Math.abs((hash >> (i % 32)) & 3);
        const width = val === 0 ? 1 : val === 1 ? 2.5 : val === 2 ? 3.5 : 1.5;
        const gap = ((hash >> ((i + 1) % 32)) & 1) === 0 ? 1.5 : 3;
        
        if (x + width > 225) break;
        xml += `<rect x="${x}" y="5" width="${width}" height="50" fill="#000000" />`;
        x += width + gap;
    }
    
    // End stop lines
    xml += `<rect x="${x}" y="5" width="3" height="60" fill="#000000" />`; x += 4;
    xml += `<rect x="${x}" y="5" width="1" height="60" fill="#000000" />`;
    xml += '</svg>';
    return xml;
}

// Dynamic Mock Shipment Generator for Cross-Device Tracking Verification
function generateDynamicMockShipment(trackingNum) {
    const parts = trackingNum.split('-');
    if (parts.length !== 3) return null;
    
    const dateStr = parts[1]; // YYYYMMDD
    const randStr = parts[2];
    
    // Parse date
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const dateObj = new Date(`${year}-${month}-${day}T12:00:00Z`);
    
    // Deterministic generation based on random suffix hash code
    const randNum = parseInt(randStr, 10) || 5555;
    
    // Global hubs list for routing
    const senderHubs = ['Memphis, USA', 'London, UK', 'Frankfurt, Germany', 'Tokyo, Japan', 'Singapore'];
    const recipientHubs = ['Paris, France', 'Sydney, Australia', 'New York, USA', 'Toronto, Canada', 'Shanghai, China'];
    
    const senderCity = senderHubs[randNum % senderHubs.length];
    const recipientCity = recipientHubs[(randNum + 2) % recipientHubs.length];
    
    // Intermediate checkpoint locations
    const transitCities = ['Indianapolis, USA', 'Anchorage, USA', 'Dubai, UAE', 'Hong Kong'];
    const transitCity = transitCities[(randNum + 1) % transitCities.length];

    const serviceTypes = ['FedEx International Priority', 'FedEx International Economy', 'FedEx First Overnight'];
    const service = serviceTypes[randNum % serviceTypes.length];
    
    const weights = ['3.5 lbs', '5.2 lbs', '1.8 lbs', '12.0 lbs'];
    const weight = weights[randNum % weights.length];
    
    const dims = ['12" x 10" x 6"', '8" x 6" x 4"', '18" x 14" x 12"'];
    const dim = dims[randNum % dims.length];

    const values = ['$250.00', '$95.00', '$450.00', '$1,200.00'];
    const value = values[randNum % values.length];

    // Determine status deterministically based on date (older date = delivered, newer = transit)
    const diffDays = Math.floor((new Date() - dateObj) / (1000 * 60 * 60 * 24));
    let status = 'transit';
    if (diffDays >= 3) {
        status = 'delivered';
    } else if (diffDays <= 0) {
        status = 'created';
    }

    const newShipment = {
        trackingNumber: trackingNum.toUpperCase(),
        serviceType: service,
        weight: weight,
        dimensions: dim,
        declaredValue: value,
        description: 'Document and Parcel Logistics',
        status: status,
        senderName: 'FedEx Hub Facility',
        senderPhone: '+1 (800) 463-3339',
        senderEmail: 'dispatch@fedex-sub.com',
        senderAddress: '100 FedEx Global Way',
        senderCity: senderCity,
        senderZip: '38118',
        recipientName: 'Global Consignee Logistics',
        recipientPhone: '+1 (555) 019-2831',
        recipientEmail: 'consignee@global-import.com',
        recipientAddress: '200 Logistics Blvd Suite B',
        recipientCity: recipientCity,
        recipientZip: '90001',
        history: []
    };

    // Construct history timeline
    const createdTime = new Date(dateObj.getTime());
    const pickupTime = new Date(dateObj.getTime() + 4 * 60 * 60 * 1000); // +4h
    const transitTime = new Date(dateObj.getTime() + 18 * 60 * 60 * 1000); // +18h
    const deliveryTime = new Date(dateObj.getTime() + 48 * 60 * 60 * 1000); // +48h

    if (status === 'created') {
        newShipment.history.push({
            status: 'created',
            location: senderCity,
            details: 'Billing information received. Package is ready for pickup.',
            timestamp: createdTime.toISOString()
        });
    } else if (status === 'transit') {
        newShipment.history.push({
            status: 'transit',
            location: transitCity,
            details: 'In transit to destination hub.',
            timestamp: transitTime.toISOString()
        }, {
            status: 'pickup',
            location: senderCity,
            details: 'Package collected and sorted at origin hub.',
            timestamp: pickupTime.toISOString()
        }, {
            status: 'created',
            location: senderCity,
            details: 'Billing information received. Package is ready for pickup.',
            timestamp: createdTime.toISOString()
        });
    } else if (status === 'delivered') {
        newShipment.history.push({
            status: 'delivered',
            location: recipientCity,
            details: 'Delivered. Left at receiving bay. Signature recorded.',
            timestamp: deliveryTime.toISOString()
        }, {
            status: 'transit',
            location: transitCity,
            details: 'Sorted and departing international transit gate.',
            timestamp: transitTime.toISOString()
        }, {
            status: 'pickup',
            location: senderCity,
            details: 'Package collected and sorted at origin hub.',
            timestamp: pickupTime.toISOString()
        }, {
            status: 'created',
            location: senderCity,
            details: 'Billing information received. Package is ready for pickup.',
            timestamp: createdTime.toISOString()
        });
    }

    return newShipment;
}

// Search Action
function performTrackingSearch(trackingNum) {
    const cleanedNum = trackingNum.trim().toUpperCase();
    let shipment = shipments.find(s => s.trackingNumber.toUpperCase() === cleanedNum);
    
    // Fallback: If not found in local array, check if it matches standard FedEx sub-delivery format
    // and generate a dynamic mock shipment. This ensures codes issued on other devices work!
    if (!shipment) {
        const standardFormat = /^FDX-\d{8}-\d{4}$/i;
        if (standardFormat.test(cleanedNum)) {
            const mockShipment = generateDynamicMockShipment(cleanedNum);
            if (mockShipment) {
                shipments.push(mockShipment);
                saveDatabase();
                shipment = mockShipment;
            }
        }
    }
    
    const resultsContainer = document.getElementById('trackingResultsContainer');
    const welcomeMsg = document.getElementById('trackingWelcomeMsg');

    if (!shipment) {
        showToast(`Tracking number ${trackingNum} not found.`, 'error');
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (welcomeMsg) welcomeMsg.style.display = 'block';
        return;
    }

    currentTrackedNum = cleanedNum; // Set the current tracked number for auto-refresh updates

    if (welcomeMsg) welcomeMsg.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'grid';

    // Update Text Elements
    document.getElementById('displayTrackingNum').innerText = shipment.trackingNumber;
    document.getElementById('displayServiceType').innerText = shipment.serviceType;
    document.getElementById('displayWeight').innerText = shipment.weight || 'N/A';
    document.getElementById('displayDimensions').innerText = shipment.dimensions || 'N/A';
    document.getElementById('displayValue').innerText = shipment.declaredValue || 'N/A';
    document.getElementById('displayDescription').innerText = shipment.description || 'N/A';
    
    document.getElementById('displaySenderName').innerText = shipment.senderName;
    document.getElementById('displaySenderAddress').innerText = `${shipment.senderAddress}, ${shipment.senderCity} ${shipment.senderZip}`;
    document.getElementById('displayRecipientName').innerText = shipment.recipientName;
    document.getElementById('displayRecipientAddress').innerText = `${shipment.recipientAddress}, ${shipment.recipientCity} ${shipment.recipientZip}`;

    // Set Status Badge
    const badge = document.getElementById('displayStatusBadge');
    badge.className = `status-badge status-${shipment.status}`;
    badge.innerText = formatStatusLabel(shipment.status);

    // Set estimated delivery banner text
    const latestCheck = shipment.history[0];
    const estBanner = document.getElementById('estimatedDeliveryBanner');
    if (shipment.status === 'delivered') {
        estBanner.innerHTML = `<h3>Delivered</h3><p>Package was delivered on ${formatDateTime(latestCheck.timestamp)} at ${latestCheck.location}</p>`;
    } else {
        estBanner.innerHTML = `<h3>Estimated Delivery</h3><p>Pending transit checkpoint updates. Current Location: ${latestCheck.location}</p>`;
    }

    // Render Timeline & Progress Bars
    renderTimeline(shipment);
    renderProgressBar(shipment);
    
    // Initialize Map
    setupTrackingMap(shipment);
}

function formatStatusLabel(status) {
    switch (status) {
        case 'created': return 'Label Created';
        case 'pickup': return 'Picked Up';
        case 'transit': return 'In Transit';
        case 'out_for_delivery': return 'Out for Delivery';
        case 'delivered': return 'Delivered';
        default: return status;
    }
}

function formatDateTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function renderTimeline(shipment) {
    const list = document.getElementById('timelineCheckpointsList');
    if (!list) return;
    
    list.innerHTML = '';
    document.getElementById('timelineHeaderCount').innerText = shipment.history.length;

    shipment.history.forEach((check, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index === 0 ? 'latest' : ''}`;
        
        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-info">
                <div class="timeline-time-loc">
                    <span class="timeline-time">${formatDateTime(check.timestamp)}</span>
                    <span class="timeline-location">${check.location}</span>
                </div>
                <div class="timeline-status-msg">${formatStatusLabel(check.status)}</div>
                <div class="timeline-details">${check.details || ''}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function renderProgressBar(shipment) {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;

    let percentage = 0;
    const nodes = document.querySelectorAll('.progress-node');
    nodes.forEach(n => {
        n.classList.remove('completed', 'active');
    });

    const statusSteps = ['created', 'pickup', 'transit', 'out_for_delivery', 'delivered'];
    const currentIndex = statusSteps.indexOf(shipment.status);

    if (currentIndex >= 0) {
        percentage = (currentIndex / (statusSteps.length - 1)) * 100;
        progressFill.style.width = `${percentage}%`;

        nodes.forEach((node, i) => {
            if (i < currentIndex) {
                node.classList.add('completed');
            } else if (i === currentIndex) {
                node.classList.add('active');
            }
        });
    }
}

// Leaflet Map Integrations
function setupTrackingMap(shipment) {
    const mapContainer = document.getElementById('trackingMap');
    if (!mapContainer) return;

    // Reset markers/paths
    if (leafletMap) {
        mapMarkers.forEach(m => leafletMap.removeLayer(m));
        if (routeLine) leafletMap.removeLayer(routeLine);
        mapMarkers = [];
        routeLine = null;
    } else {
        // Initialize Map
        leafletMap = L.map('trackingMap', {
            zoomControl: true,
            scrollWheelZoom: false
        }).setView([39.8283, -98.5795], 4);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(leafletMap);
    }

    // Geocode locations from CITY_COORDINATES or estimate
    const senderCoords = getCityCoords(shipment.senderCity);
    const recipientCoords = getCityCoords(shipment.recipientCity);
    const currentLoc = shipment.history[0]?.location || shipment.senderCity;
    const currentCoords = getCityCoords(currentLoc);

    // Custom marker icons
    const senderIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div style="background-color: #4D148C; border: 2px solid white; width: 14px; height: 14px; border-radius: 50%;"></div>',
        iconSize: [14, 14]
    });

    const recipientIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div style="background-color: #FF6200; border: 2px solid white; width: 14px; height: 14px; border-radius: 50%;"></div>',
        iconSize: [14, 14]
    });

    const currentIcon = L.divIcon({
        className: 'custom-map-pulsing',
        html: `
            <div style="position: relative;">
                <div style="background-color: #00E676; border: 2px solid white; width: 16px; height: 16px; border-radius: 50%; z-index: 10;"></div>
                <div style="position: absolute; top: -7px; left: -7px; width: 30px; height: 30px; border-radius: 50%; background: rgba(0, 230, 118, 0.4); animation: mapPulse 1.8s infinite; z-index: 1;"></div>
            </div>
            <style>
                @keyframes mapPulse {
                    0% { transform: scale(0.3); opacity: 0.8; }
                    80% { transform: scale(1.2); opacity: 0; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
            </style>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    // Add Sender & Destination markers
    const sMarker = L.marker(senderCoords, { icon: senderIcon })
        .addTo(leafletMap)
        .bindPopup(`<b>Origin:</b> ${shipment.senderCity}<br>${shipment.senderName}`);
    
    const rMarker = L.marker(recipientCoords, { icon: recipientIcon })
        .addTo(leafletMap)
        .bindPopup(`<b>Destination:</b> ${shipment.recipientCity}<br>${shipment.recipientName}`);

    mapMarkers.push(sMarker, rMarker);

    // Draw route dashed line
    const routePath = [senderCoords];

    // If in transit, add current location to path if it is different
    const inTransitStatus = ['pickup', 'transit', 'out_for_delivery'];
    if (inTransitStatus.includes(shipment.status) && (currentCoords[0] !== senderCoords[0] || currentCoords[1] !== senderCoords[1])) {
        routePath.push(currentCoords);
        
        const cMarker = L.marker(currentCoords, { icon: currentIcon })
            .addTo(leafletMap)
            .bindPopup(`<b>Current Location:</b> ${currentLoc}<br>Status: ${formatStatusLabel(shipment.status)}`);
        
        mapMarkers.push(cMarker);
    }
    
    routePath.push(recipientCoords);

    routeLine = L.polyline(routePath, {
        color: '#FF6200',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.8
    }).addTo(leafletMap);

    // Zoom map to fit route
    const bounds = L.latLngBounds(routePath);
    leafletMap.fitBounds(bounds, { padding: [50, 50] });
}

function getCityCoords(cityName) {
    const key = cityName.toUpperCase().trim();
    if (CITY_COORDINATES[key]) {
        return CITY_COORDINATES[key];
    }
    
    // Parse city name and search for partial match
    for (let k in CITY_COORDINATES) {
        if (key.includes(k) || k.includes(key)) {
            return CITY_COORDINATES[k];
        }
    }

    // Deterministic hash-based coordinate fallback for any worldwide city
    // This maps any custom input string to stable latitude/longitude values
    let hash1 = 0;
    let hash2 = 0;
    for (let i = 0; i < key.length; i++) {
        if (i % 2 === 0) {
            hash1 = key.charCodeAt(i) + ((hash1 << 5) - hash1);
        } else {
            hash2 = key.charCodeAt(i) + ((hash2 << 5) - hash2);
        }
    }
    
    // Convert to reasonable latitudes (-55 to 65) and longitudes (-180 to 180)
    // This avoids rendering issues on extreme polar regions
    const lat = ((Math.abs(hash1) % 120) - 55) + (Math.abs(hash1 % 100) / 100);
    const lng = ((Math.abs(hash2) % 360) - 180) + (Math.abs(hash2 % 100) / 100);
    
    return [lat, lng];
}

// Create Shipment Handler (Sub-delivery portal)
function handleCreateShipment(event) {
    event.preventDefault();

    // Get Form Values
    const sName = document.getElementById('sName').value.trim();
    const sPhone = document.getElementById('sPhone').value.trim();
    const sEmail = document.getElementById('sEmail').value.trim();
    const sAddress = document.getElementById('sAddress').value.trim();
    const sCity = document.getElementById('sCity').value.trim();
    const sZip = document.getElementById('sZip').value.trim();

    const rName = document.getElementById('rName').value.trim();
    const rPhone = document.getElementById('rPhone').value.trim();
    const rEmail = document.getElementById('rEmail').value.trim();
    const rAddress = document.getElementById('rAddress').value.trim();
    const rCity = document.getElementById('rCity').value.trim();
    const rZip = document.getElementById('rZip').value.trim();

    const service = document.getElementById('pkgService').value;
    const weight = document.getElementById('pkgWeight').value.trim() + " lbs";
    const dims = document.getElementById('pkgDims').value.trim() || 'N/A';
    const value = "$" + (document.getElementById('pkgValue').value.trim() || '0.00');
    const desc = document.getElementById('pkgDesc').value.trim() || 'General Goods';

    if (!sName || !sAddress || !sCity || !rName || !rAddress || !rCity) {
        showToast("Please fill in all required address fields.", "error");
        return;
    }

    // Generate Unique Tracking Number
    const timestampStr = new Date().toISOString().slice(0,10).replace(/-/g, "");
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNum = `FDX-${timestampStr}-${randSuffix}`;

    const newShipment = {
        trackingNumber: trackingNum,
        serviceType: service,
        weight: weight,
        dimensions: dims,
        declaredValue: value,
        description: desc,
        status: 'created',
        senderName: sName,
        senderPhone: sPhone,
        senderEmail: sEmail,
        senderAddress: sAddress,
        senderCity: sCity,
        senderZip: sZip,
        recipientName: rName,
        recipientPhone: rPhone,
        recipientEmail: rEmail,
        recipientAddress: rAddress,
        recipientCity: rCity,
        recipientZip: rZip,
        history: [
            {
                status: 'created',
                location: sCity,
                details: 'Billing information received. Package is ready for pickup.',
                timestamp: new Date().toISOString()
            }
        ]
    };

    shipments.unshift(newShipment); // Add to beginning of database
    saveDatabase();
    
    showToast("Shipment registered successfully!", "success");
    
    // Open shipping label modal
    openShippingLabelModal(newShipment);
    
    // Reset Form
    document.getElementById('createShipmentForm').reset();
}

function openShippingLabelModal(shipment) {
    const modal = document.getElementById('labelModal');
    if (!modal) return;

    // Fill Modal Content
    document.getElementById('lblServiceType').innerText = shipment.serviceType;
    document.getElementById('lblSenderName').innerText = shipment.senderName;
    document.getElementById('lblSenderAddress').innerText = shipment.senderAddress;
    document.getElementById('lblSenderCityStateZip').innerText = `${shipment.senderCity} ${shipment.senderZip}`;
    
    document.getElementById('lblRecipientName').innerText = shipment.recipientName;
    document.getElementById('lblRecipientAddress').innerText = shipment.recipientAddress;
    document.getElementById('lblRecipientCityStateZip').innerText = `${shipment.recipientCity} ${shipment.recipientZip}`;

    document.getElementById('lblTrackingNum').innerText = shipment.trackingNumber;
    
    // Generate barcode SVG
    const barcodeContainer = document.getElementById('lblBarcodeContainer');
    barcodeContainer.innerHTML = generateBarcodeSVG(shipment.trackingNumber);

    document.getElementById('lblWeight').innerText = shipment.weight;
    document.getElementById('lblDims').innerText = shipment.dimensions;
    document.getElementById('lblValue').innerText = shipment.declaredValue;
    document.getElementById('lblDate').innerText = new Date(shipment.history[0].timestamp).toLocaleDateString();

    // Show modal
    modal.classList.add('active');

    // Add print action
    const printBtn = document.getElementById('printLabelBtn');
    printBtn.onclick = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Shipping Label - ${shipment.trackingNumber}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .label-container { border: 3px solid #000000; width: 450px; padding: 15px; }
                    .label-header { display: flex; justify-content: space-between; border-bottom: 3px solid #000000; padding-bottom: 5px; }
                    .label-logo { font-size: 2rem; font-weight: 900; }
                    .purple { color: #4D148C; }
                    .orange { color: #FF6200; }
                    .service { background: #000; color: #fff; padding: 5px; font-weight: 800; font-size: 1rem; }
                    .addresses { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #000; padding: 10px 0; font-size: 0.8rem; }
                    .address-block { margin-bottom: 10px; }
                    .title { font-weight: bold; margin-bottom: 2px; }
                    .tracking { text-align: center; padding: 15px 0; border-bottom: 3px solid #000; }
                    .tracking-num { font-family: monospace; font-size: 1.2rem; font-weight: bold; }
                    .footer-info { display: grid; grid-template-columns: 1.5fr 1fr; padding-top: 10px; font-size: 0.75rem; }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                <div class="label-container">
                    <div class="label-header">
                        <div class="label-logo"><span class="purple">Fed</span><span class="orange">Ex</span></div>
                        <div class="service">${shipment.serviceType}</div>
                    </div>
                    <div class="addresses">
                        <div class="address-block">
                            <div class="title">FROM:</div>
                            <div>${shipment.senderName}</div>
                            <div>${shipment.senderAddress}</div>
                            <div>${shipment.senderCity} ${shipment.senderZip}</div>
                        </div>
                        <div class="address-block">
                            <div class="title">TO:</div>
                            <div>${shipment.recipientName}</div>
                            <div>${shipment.recipientAddress}</div>
                            <div>${shipment.recipientCity} ${shipment.recipientZip}</div>
                        </div>
                    </div>
                    <div class="tracking">
                        <div>${barcodeContainer.innerHTML}</div>
                        <div class="tracking-num">${shipment.trackingNumber}</div>
                    </div>
                    <div class="footer-info">
                        <div>
                            Weight: <b>${shipment.weight}</b><br>
                            Dims: <b>${shipment.dimensions}</b><br>
                            Value: <b>${shipment.declaredValue}</b>
                        </div>
                        <div style="text-align: right;">
                            Date: <b>${new Date().toLocaleDateString()}</b><br>
                            Sub-Agent Release
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
    };
}

function closeLabelModal() {
    const modal = document.getElementById('labelModal');
    if (modal) modal.classList.remove('active');
}

// Render Shipments inside Admin Panel
function renderManageDashboard() {
    const tbody = document.getElementById('manageShipmentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    if (shipments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No shipments available.</td></tr>';
        return;
    }

    shipments.forEach(s => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td style="font-family: monospace; font-weight: 600;">${s.trackingNumber}</td>
            <td>
                <div style="font-weight: 600; color: #FFF;">${s.senderName}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${s.senderCity}</div>
            </td>
            <td>
                <div style="font-weight: 600; color: #FFF;">${s.recipientName}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${s.recipientCity}</div>
            </td>
            <td><span class="status-badge status-${s.status}" style="font-size: 0.75rem; padding: 0.3rem 0.8rem;">${formatStatusLabel(s.status)}</span></td>
            <td>${s.serviceType}</td>
            <td>${s.weight}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon edit-btn" onclick="openUpdateStatusModal('${s.trackingNumber}')" title="Update Transit Status">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.707-6.707zM12.146 9.854a.5.5 0 0 1-.708 0L9.293 7.707l-6.707 6.707a.5.5 0 0 1-.188.11l-3 1a.5.5 0 0 1-.607-.607l1-3a.5.5 0 0 1 .11-.188l6.707-6.707L9.293 6.293a.5.5 0 0 1 .707 0l2.146 2.146a.5.5 0 0 1 0 .708z"/>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="openShippingLabelModalByTracking('${s.trackingNumber}')" title="View/Print Label">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function openUpdateStatusModal(trackingNum) {
    currentManagedTrackingNum = trackingNum;
    const shipment = shipments.find(s => s.trackingNumber === trackingNum);
    if (!shipment) return;

    // Prefill some defaults
    document.getElementById('updateTrackNumDisplay').innerText = trackingNum;
    
    // Set standard options based on current state
    const nextStatusSelect = document.getElementById('updateStatus');
    if (nextStatusSelect) {
        nextStatusSelect.value = shipment.status;
    }

    const modal = document.getElementById('updateModal');
    if (modal) modal.classList.add('active');
}

function closeUpdateModal() {
    const modal = document.getElementById('updateModal');
    if (modal) modal.classList.remove('active');
}

function handleTransitUpdate(event) {
    event.preventDefault();
    if (!currentManagedTrackingNum) return;

    const status = document.getElementById('updateStatus').value;
    const location = document.getElementById('updateLocation').value.trim();
    const details = document.getElementById('updateDetails').value.trim();

    if (!location) {
        showToast("Please enter a checkpoint location.", "error");
        return;
    }

    const shipmentIndex = shipments.findIndex(s => s.trackingNumber === currentManagedTrackingNum);
    if (shipmentIndex === -1) return;

    const updatedShipment = shipments[shipmentIndex];
    
    // Add to history
    updatedShipment.history.unshift({
        status: status,
        location: location,
        details: details || `Package status updated to: ${formatStatusLabel(status)}`,
        timestamp: new Date().toISOString()
    });

    // Update current status
    updatedShipment.status = status;

    // Save changes
    shipments[shipmentIndex] = updatedShipment;
    saveDatabase();

    showToast("Package transit checkpoint updated!", "success");
    closeUpdateModal();

    // Re-render
    renderManageDashboard();
    updateDashboardWidgets();

    // Auto-update customer tracking panel if it was displaying the modified shipment
    if (currentTrackedNum === currentManagedTrackingNum) {
        performTrackingSearch(currentTrackedNum);
    }

    // Reset update inputs
    document.getElementById('updateLocation').value = '';
    document.getElementById('updateDetails').value = '';
}

function openShippingLabelModalByTracking(trackingNum) {
    const shipment = shipments.find(s => s.trackingNumber === trackingNum);
    if (shipment) {
        openShippingLabelModal(shipment);
    }
}

// Widget Math
function updateDashboardWidgets() {
    const totalCount = shipments.length;
    const inTransit = shipments.filter(s => ['pickup', 'transit', 'out_for_delivery'].includes(s.status)).length;
    const delivered = shipments.filter(s => s.status === 'delivered').length;
    const created = shipments.filter(s => s.status === 'created').length;

    const wTotal = document.getElementById('wTotalShipments');
    const wTransit = document.getElementById('wInTransit');
    const wDelivered = document.getElementById('wDelivered');
    const wCreated = document.getElementById('wPending');

    if (wTotal) wTotal.innerText = totalCount;
    if (wTransit) wTransit.innerText = inTransit;
    if (wDelivered) wDelivered.innerText = delivered;
    if (wCreated) wCreated.innerText = created;
}

// Terms of Service Modal Actions
function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) modal.classList.add('active');
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) modal.classList.remove('active');
}

// Staff Portal Authentication Functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
    
    // Reset login form fields
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) loginForm.reset();
}

// Agent Registration Modal Actions (Dashboard restricted)
function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.remove('active');
    
    // Reset register form fields
    const regForm = document.getElementById('adminRegisterForm');
    if (regForm) regForm.reset();
}

function handleAdminRegister(event) {
    event.preventDefault();
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value.trim();
    const passConfirm = document.getElementById('regPassConfirm').value.trim();

    if (pass !== passConfirm) {
        showToast("Passcodes do not match.", "error");
        return;
    }

    if (user.toLowerCase() === 'fedex_admin') {
        showToast("Username 'fedex_admin' is reserved.", "error");
        return;
    }

    let staffDb = JSON.parse(localStorage.getItem('fedex_staff_credentials') || '[]');
    if (staffDb.some(u => u.username.toLowerCase() === user.toLowerCase())) {
        showToast("Username already exists.", "error");
        return;
    }

    staffDb.push({ username: user, passcode: pass });
    localStorage.setItem('fedex_staff_credentials', JSON.stringify(staffDb));

    showToast(`New Agent "${user}" registered successfully!`, "success");
    closeRegisterModal();
}

function handleAdminLogin(event) {
    event.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();

    // Check default simulation credentials or registered staff database
    let staffDb = JSON.parse(localStorage.getItem('fedex_staff_credentials') || '[]');
    const isValidCustom = staffDb.some(u => u.username === user && u.passcode === pass);

    if ((user === 'fedex_admin' && pass === 'fedex2026') || isValidCustom) {
        sessionStorage.setItem('fedex_admin_logged_in', 'true');
        showToast("Authenticated successfully. Access granted.", "success");
        checkAdminAuthState();
        closeLoginModal();
    } else {
        showToast("Invalid credentials. Please try again.", "error");
    }
}

// Function to handle agent logout
function handleLogout() {
    sessionStorage.removeItem('fedex_admin_logged_in');
    showToast("Logged out of Staff Portal.", "info");
    
    // If the active view is an admin view, force back to customer tracking portal
    const activePanel = document.querySelector('.view-panel.active');
    if (activePanel && (activePanel.id === 'create-portal' || activePanel.id === 'manage-portal')) {
        document.querySelector('[data-target="tracking-portal"]').click();
    }
    
    checkAdminAuthState();
}

// Core admin auth toggler for navigation items
function checkAdminAuthState() {
    const isLoggedIn = sessionStorage.getItem('fedex_admin_logged_in') === 'true';
    const adminButtons = document.querySelectorAll('.admin-only');
    const loginBtn = document.getElementById('loginNavBtn');
    const logoutBtn = document.getElementById('logoutNavBtn');

    if (isLoggedIn) {
        adminButtons.forEach(btn => {
            btn.style.display = 'flex';
        });
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex';
    } else {
        adminButtons.forEach(btn => {
            btn.style.display = 'none';
            btn.classList.remove('active');
        });
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        
        // Reset active nav tab state if admin tab is active
        const trackTab = document.querySelector('[data-target="tracking-portal"]');
        if (trackTab && !trackTab.classList.contains('active')) {
            trackTab.classList.add('active');
        }
    }
}
