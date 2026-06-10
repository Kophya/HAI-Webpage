/* 
   Hmong Association, Inc (Arkansas) Merchandise/Vendors Layout
   Core Javascript Logic - Interactive Booking & PayPal Sandbox Integration
   Human-Readable, Well-Commented, and Easy to Maintain
*/

// --- CONFIGURATION & DATABASE ---
const CONFIG = {
  // SVG Canvas configuration
  svgWidth: 1000,
  svgHeight: 1050,

  // Booth pricing and sizing categories
  categories: {
    General: {
      name: "General/Marchise",
      depositPrice: 350,
      fullPrice: 350,
      size: "20' x 30'",
      isReservable: true,
      colorClass: "color-general"
    },
    Food: {
      name: "Food Vendor",
      depositPrice: 1000,
      fullPrice: 1500,
      size: "20' x 30'",
      isReservable: true,
      colorClass: "color-food"
    },
    Boba: {
      name: "Boba/Specialty Drink",
      depositPrice: 500,
      fullPrice: 750,
      size: "20' x 30'",
      isReservable: true,
      colorClass: "color-boba"
    },
    Fruits: {
      name: "Fruits Vendor",
      depositPrice: 350,
      fullPrice: 350,
      size: "20' x 30'",
      isReservable: true,
      colorClass: "color-fruits"
    },
    Info: {
      name: "Information / Non-profit",
      depositPrice: 0,
      fullPrice: 0,
      size: "10' x 10'",
      isReservable: false,
      colorClass: "color-info"
    },
    Reserved: {
      name: "Reserved by Organizer",
      depositPrice: 0,
      fullPrice: 0,
      size: "20' x 30'",
      isReservable: false,
      colorClass: "color-reserved"
    }
  },

  // Database of all 59 booths on the floor layout
  // X, Y coordinates and Width/Height dimensions (for the SVG canvas)
  booths: [
    // --- NORTH ROW (Top, horizontal, left to right, numbered 39 down to 22) ---
    { id: "39", category: "General", x: 50,  y: 60, w: 26, h: 42 },
    { id: "38", category: "General", x: 78,  y: 60, w: 26, h: 42 },
    { id: "37", category: "General", x: 106, y: 60, w: 26, h: 42 },
    { id: "36", category: "General", x: 134, y: 60, w: 26, h: 42 },
    { id: "35", category: "General", x: 162, y: 60, w: 26, h: 42 },
    { id: "34", category: "General", x: 190, y: 60, w: 26, h: 42 },
    { id: "33", category: "General", x: 218, y: 60, w: 26, h: 42 },
    { id: "32", category: "General", x: 246, y: 60, w: 26, h: 42 },
    { id: "31", category: "General", x: 274, y: 60, w: 26, h: 42 },
    { id: "30", category: "Fruits",  x: 302, y: 60, w: 26, h: 42 },
    { id: "29", category: "Fruits",  x: 330, y: 60, w: 26, h: 42 },
    // Walkway Gap represented here visually (X range ~358 to ~428)
    { id: "28", category: "Fruits",  x: 430, y: 60, w: 26, h: 42 },
    { id: "27", category: "General", x: 458, y: 60, w: 26, h: 42 },
    { id: "26", category: "General", x: 486, y: 60, w: 26, h: 42 },
    { id: "25", category: "Fruits",  x: 514, y: 60, w: 26, h: 42 },
    { id: "24", category: "General", x: 542, y: 60, w: 26, h: 42 },
    { id: "23", category: "General", x: 570, y: 60, w: 26, h: 42 },
    { id: "22", category: "Fruits",  x: 598, y: 60, w: 26, h: 42 },

    // --- WEST ROW (Left horizontal row, left to right, numbered 40 to 47) ---
    { id: "40", category: "General", x: 50,  y: 160, w: 26, h: 42 },
    { id: "41", category: "General", x: 78,  y: 160, w: 26, h: 42 },
    { id: "42", category: "General", x: 106, y: 160, w: 26, h: 42 },
    { id: "43", category: "General", x: 134, y: 160, w: 26, h: 42 },
    { id: "44", category: "General", x: 162, y: 160, w: 26, h: 42 },
    { id: "45", category: "General", x: 190, y: 160, w: 26, h: 42 },
    { id: "46", category: "General", x: 218, y: 160, w: 26, h: 42 },
    { id: "47", category: "General", x: 246, y: 160, w: 26, h: 42 },

    // --- MIDDLE COLUMN (Vertical column, top to bottom, numbered 48 to 57A) ---
    { id: "48",  category: "General", x: 310, y: 220, w: 42, h: 26 },
    { id: "49",  category: "General", x: 310, y: 248, w: 42, h: 26 },
    { id: "50",  category: "General", x: 310, y: 276, w: 42, h: 26 },
    { id: "51",  category: "General", x: 310, y: 304, w: 42, h: 26 },
    { id: "52",  category: "General", x: 310, y: 332, w: 42, h: 26 },
    { id: "53",  category: "General", x: 310, y: 360, w: 42, h: 26 },
    { id: "54",  category: "General", x: 310, y: 388, w: 42, h: 26 },
    { id: "55",  category: "General", x: 310, y: 416, w: 42, h: 26 },
    { id: "56",  category: "General", x: 310, y: 444, w: 42, h: 26 },
    { id: "57",  category: "Info",    x: 310, y: 472, w: 42, h: 18 }, // Smaller Height (10x10 ft)
    { id: "57A", category: "Info",    x: 310, y: 492, w: 42, h: 18 }, // Smaller Height (10x10 ft)

    // --- EAST ROW (Right vertical column, top to bottom, numbered 21 down to 7) ---
    { id: "21", category: "Boba",     x: 660, y: 120, w: 42, h: 26 },
    { id: "20", category: "Food",     x: 660, y: 148, w: 42, h: 26 },
    { id: "19", category: "Food",     x: 660, y: 176, w: 42, h: 26 },
    { id: "18", category: "Boba",     x: 660, y: 204, w: 42, h: 26 },
    { id: "17", category: "Food",     x: 660, y: 232, w: 42, h: 26 },
    { id: "16", category: "Food",     x: 660, y: 260, w: 42, h: 26 },
    { id: "15", category: "Food",     x: 660, y: 288, w: 42, h: 26 },
    { id: "14", category: "Food",     x: 660, y: 316, w: 42, h: 26 },
    { id: "13", category: "Boba",     x: 660, y: 344, w: 42, h: 26 },
    { id: "12", category: "Food",     x: 660, y: 372, w: 42, h: 26 }, // Org pre-reserved (Food booth)
    { id: "11", category: "Food",     x: 660, y: 400, w: 42, h: 26 },
    { id: "10", category: "Food",     x: 660, y: 428, w: 42, h: 26 },
    { id: "9",  category: "Food",     x: 660, y: 456, w: 42, h: 26 },
    { id: "8",  category: "Food",     x: 660, y: 484, w: 42, h: 26 },
    { id: "7",  category: "Boba",     x: 660, y: 512, w: 42, h: 26 },

    // --- SOUTH ROW (Bottom horizontal, left to right, Info 1 (x2) & General 2 to 6) ---
    { id: "1-L", category: "Info",    x: 450, y: 580, w: 26, h: 26 }, // Info 1 Left (10x10)
    { id: "1-R", category: "Info",    x: 478, y: 580, w: 26, h: 26 }, // Info 1 Right (10x10)
    { id: "2",   category: "General", x: 506, y: 580, w: 26, h: 42 },
    { id: "3",   category: "General", x: 534, y: 580, w: 26, h: 42 },
    { id: "4",   category: "General", x: 562, y: 580, w: 26, h: 42 },
    { id: "5",   category: "General", x: 590, y: 580, w: 26, h: 42 },
    { id: "6",   category: "General", x: 618, y: 580, w: 26, h: 42 }
  ]
};

// --- APPLICATION STATE ---
let selectedBooth = null;       // Currently selected booth object
let selectedPaymentMode = 'deposit'; // 'deposit' or 'full'
let localReservations = {};     // Map of booked booths from localStorage
const PRERESERVED_IDS = ["12"]; // Booths pre-reserved by the organizer
let currentZoom = 1.0;          // Floor plan zoom level (1.0 = 100%)

// --- DOM ELEMENTS ---
const elements = {
  canvasContainer: document.getElementById('canvas-container'),
  checkoutEmpty: document.getElementById('checkout-empty'),
  checkoutActive: document.getElementById('checkout-active'),
  dispBoothId: document.getElementById('disp-booth-id'),
  dispBoothCategory: document.getElementById('disp-booth-category'),
  dispBoothDimensions: document.getElementById('disp-booth-dimensions'),
  paymentOptionsBlock: document.getElementById('payment-options-block'),
  priceDeposit: document.getElementById('price-deposit'),
  priceFull: document.getElementById('price-full'),
  btnPayDeposit: document.getElementById('btn-pay-deposit'),
  btnPayFull: document.getElementById('btn-pay-full'),
  btnTestBypass: document.getElementById('btn-test-bypass'),
  btnResetCache: document.getElementById('btn-reset-cache'),
  formBooking: document.getElementById('form-booking'),
  
  // Form Inputs
  inputName: document.getElementById('input-name'),
  inputEmail: document.getElementById('input-email'),
  inputPhone: document.getElementById('input-phone'),
  inputBusiness: document.getElementById('input-business'),
  
  // Tooltip
  tooltip: document.getElementById('map-tooltip'),
  tipTitle: document.getElementById('tip-title'),
  tipDesc: document.getElementById('tip-desc'),
  tipPrice: document.getElementById('tip-price'),

  // Modal / Receipt
  modalReceipt: document.getElementById('modal-receipt'),
  recBusiness: document.getElementById('rec-business'),
  recName: document.getElementById('rec-name'),
  recEmail: document.getElementById('rec-email'),
  recPhone: document.getElementById('rec-phone'),
  recBoothId: document.getElementById('rec-booth-id'),
  recBoothCategory: document.getElementById('rec-booth-category'),
  recBoothDimensions: document.getElementById('rec-booth-dimensions'),
  recPayMode: document.getElementById('rec-pay-mode'),
  recTransactionId: document.getElementById('rec-transaction-id'),
  recDate: document.getElementById('rec-date'),
  recTotalPaid: document.getElementById('rec-total-paid'),
  btnPrintReceipt: document.getElementById('btn-print-receipt'),
  btnCloseReceipt: document.getElementById('btn-close-receipt')
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadReservations();
  renderMap();
  setupEventListeners();
});

// Load saved bookings from localStorage
function loadReservations() {
  const cached = localStorage.getItem('hai_booth_bookings');
  if (cached) {
    localReservations = JSON.parse(cached);
  } else {
    localReservations = {};
  }
}

// Reset cache helper
elements.btnResetCache.addEventListener('click', () => {
  if (confirm("Are you sure you want to reset all booking testing mock status? This clears all simulated bookings.")) {
    localStorage.removeItem('hai_booth_bookings');
    loadReservations();
    selectedBooth = null;
    updateCheckoutPanel();
    renderMap();
  }
});

// --- RENDER LAYOUT ENGINE ---
function renderMap() {
  const svgNS = "http://www.w3.org/2000/svg";
  
  // Create the main SVG element
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${CONFIG.svgWidth} ${CONFIG.svgHeight}`);
  svg.classList.add("layout-svg");
  
  // SVG width and height will occupy 100% of the canvas wrapper
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Define patterns (e.g. hatched pattern overlay for Reserved/Sold booths)
  const defs = document.createElementNS(svgNS, "defs");
  const pattern = document.createElementNS(svgNS, "pattern");
  pattern.setAttribute("id", "hatched-pattern");
  pattern.setAttribute("width", "10");
  pattern.setAttribute("patternTransform", "rotate(45)");
  pattern.setAttribute("height", "10");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  
  const patternLine = document.createElementNS(svgNS, "line");
  patternLine.setAttribute("x1", "0");
  patternLine.setAttribute("y1", "0");
  patternLine.setAttribute("x2", "0");
  patternLine.setAttribute("y2", "10");
  patternLine.setAttribute("stroke", "rgba(71, 85, 105, 0.45)"); // Distinct dark slate diagonal lines
  patternLine.setAttribute("stroke-width", "2.5");
  
  pattern.appendChild(patternLine);
  defs.appendChild(pattern);
  svg.appendChild(defs);

  // Draw Landmarks (Walkways, Buildings, Tents, Gates)
  drawLandmarks(svg, svgNS);

  // Draw Booths
  CONFIG.booths.forEach(booth => {
    const catMeta = CONFIG.categories[booth.category];
    const isBooked = localReservations[booth.id] ? true : false;
    const isReserved = PRERESERVED_IDS.includes(booth.id);
    const isInfo = booth.category === 'Info';
    
    // Group element for each booth
    const g = document.createElementNS(svgNS, "g");
    
    // Rectangle
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", booth.x);
    rect.setAttribute("y", booth.y);
    rect.setAttribute("width", booth.w);
    rect.setAttribute("height", booth.h);
    rect.setAttribute("rx", "3");
    rect.classList.add("svg-booth");

    // Styling assignments based on status
    if (isBooked || isReserved) {
      // Keep original category color but disable it and apply diagonal striped overlay on top
      rect.style.fill = `var(--color-booth-${booth.category.toLowerCase()})`;
      rect.style.stroke = "#64748b";
      rect.classList.add("disabled");
      g.appendChild(rect);
      
      // overlay hatched pattern
      const hatchOverlay = document.createElementNS(svgNS, "rect");
      hatchOverlay.setAttribute("x", booth.x);
      hatchOverlay.setAttribute("y", booth.y);
      hatchOverlay.setAttribute("width", booth.w);
      hatchOverlay.setAttribute("height", booth.h);
      hatchOverlay.setAttribute("rx", "3");
      hatchOverlay.style.fill = "url(#hatched-pattern)";
      hatchOverlay.style.pointerEvents = "none";
      g.appendChild(hatchOverlay);
    } else if (isInfo) {
      rect.style.fill = "var(--color-booth-info)";
      rect.style.fillOpacity = "0.75";
      rect.style.stroke = "#7c3aed";
      rect.classList.add("disabled");
      g.appendChild(rect);
    } else {
      // Available / interactive
      rect.style.fill = `var(--color-booth-${booth.category.toLowerCase()})`;
      rect.style.stroke = booth.category === 'General' ? "#64748b" : "rgba(0, 0, 0, 0.35)";
      
      if (selectedBooth && selectedBooth.id === booth.id) {
        rect.style.stroke = "#d97706"; // Amber border for selection
        rect.style.strokeWidth = "3px";
        rect.style.filter = "drop-shadow(0 0 6px rgba(250, 204, 21, 0.4))";
      }

      // Click event
      rect.addEventListener('click', () => handleBoothSelect(booth));
      
      // Hover events (Tooltip)
      rect.addEventListener('mouseenter', (e) => showTooltip(e, booth));
      rect.addEventListener('mousemove', (e) => moveTooltip(e));
      rect.addEventListener('mouseleave', () => hideTooltip());

      g.appendChild(rect);
    }

    // Number text overlay
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", booth.x + booth.w / 2);
    text.setAttribute("y", booth.y + booth.h / 2 + 4);
    text.setAttribute("text-anchor", "middle");
    text.classList.add("svg-text");
    
    // Formatting ID text for South row 1 duplicates
    let displayId = booth.id;
    if (booth.id === "1-L" || booth.id === "1-R") displayId = "1";
    text.textContent = displayId;
    
    // Style text color depending on category
    if (isBooked || isReserved) {
      text.style.fill = "#475569"; // slate-gray text for reserved
      text.style.textDecoration = "line-through";
    } else if (booth.category === "General") {
      text.style.fill = "#0f172a"; // Dark slate text for white boxes
    } else {
      text.style.fill = "#0f172a"; // High contrast text
    }

    g.appendChild(text);
    svg.appendChild(g);
  });

  // Clear container and inject SVG
  elements.canvasContainer.innerHTML = '';
  elements.canvasContainer.appendChild(svg);
  applyZoom();
}

// Draw static landmarks for visual placement mapping
function drawLandmarks(svg, svgNS) {
  // Helpers to draw rects with text labels
  function drawBox(x, y, w, h, text, isDotted = false, labelRotation = 0) {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("rx", "6");
    rect.classList.add("svg-landmark");
    if (isDotted) {
      rect.style.strokeDasharray = "5,5";
      rect.style.fill = "rgba(255,255,255,0.01)";
    }
    svg.appendChild(rect);

    const textEl = document.createElementNS(svgNS, "text");
    textEl.setAttribute("x", x + w / 2);
    textEl.setAttribute("y", y + h / 2 + 5);
    textEl.setAttribute("text-anchor", "middle");
    textEl.classList.add("svg-landmark-text");
    textEl.textContent = text;
    if (labelRotation !== 0) {
      textEl.setAttribute("transform", `rotate(${labelRotation}, ${x + w / 2}, ${y + h / 2})`);
    }
    svg.appendChild(textEl);
  }

  // Helper to draw orange dumpsters from the PNG sheet
  function drawDumpster(x, y, w, h) {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("rx", "4");
    rect.style.fill = "#ea580c"; // Vibrant Orange
    rect.style.stroke = "#9a3412";
    rect.style.strokeWidth = "2px";
    svg.appendChild(rect);

    const textEl = document.createElementNS(svgNS, "text");
    textEl.setAttribute("x", x + w / 2);
    textEl.setAttribute("y", y + h / 2 + 4);
    textEl.setAttribute("text-anchor", "middle");
    textEl.style.fill = "#ffffff";
    textEl.style.fontSize = "10px";
    textEl.style.fontWeight = "800";
    textEl.style.fontFamily = "var(--font-sans)";
    textEl.textContent = "Dumpster";
    svg.appendChild(textEl);
  }

  // Draw Central Tent
  drawBox(430, 220, 180, 260, "Tent Location TBD (50' x 100')", true);

  // Draw Building
  drawBox(180, 680, 160, 240, "Building (50' x 120')");

  // Draw Office & Storage
  drawBox(370, 780, 70, 50, "Office");
  drawBox(370, 840, 70, 50, "Storage");

  // Draw Pavilion
  drawBox(470, 890, 100, 50, "Pavilion");

  // Draw Dumpsters (Orange boxes)
  drawDumpster(780, 40, 65, 45);
  drawDumpster(780, 640, 65, 45);

  // Draw Fence (Right boundary line)
  const fence = document.createElementNS(svgNS, "line");
  fence.setAttribute("x1", "880");
  fence.setAttribute("y1", "20");
  fence.setAttribute("x2", "880");
  fence.setAttribute("y2", "1000");
  fence.setAttribute("stroke", "var(--text-muted)");
  fence.setAttribute("stroke-width", "3");
  fence.setAttribute("stroke-dasharray", "4,4");
  svg.appendChild(fence);

  const fenceText = document.createElementNS(svgNS, "text");
  fenceText.setAttribute("x", "895");
  fenceText.setAttribute("y", "460");
  fenceText.classList.add("svg-landmark-text");
  fenceText.style.fontSize = "14px";
  fenceText.textContent = "FENCE";
  fenceText.setAttribute("transform", "rotate(90, 895, 460)");
  svg.appendChild(fenceText);

  // Draw Gate/Direction arrows (Vibrant blue matching PNG)
  function drawArrow(x, y, text, isLeft = false) {
    const arrowG = document.createElementNS(svgNS, "g");
    
    // Text label
    const textEl = document.createElementNS(svgNS, "text");
    textEl.setAttribute("x", x);
    textEl.setAttribute("y", y - 10);
    textEl.setAttribute("text-anchor", "middle");
    textEl.classList.add("svg-landmark-text");
    textEl.style.fill = "#2563eb"; // Vibrant Blue
    textEl.textContent = text;
    arrowG.appendChild(textEl);
    
    // Arrow line
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x - 50);
    line.setAttribute("y1", y + 10);
    line.setAttribute("x2", x + 50);
    line.setAttribute("y2", y + 10);
    line.setAttribute("stroke", "#2563eb");
    line.setAttribute("stroke-width", "3");
    arrowG.appendChild(line);
    
    // Arrow tip
    const poly = document.createElementNS(svgNS, "polygon");
    if (isLeft) {
      poly.setAttribute("points", `${x-55},${y+10} ${x-40},${y+3} ${x-40},${y+17}`);
    } else {
      poly.setAttribute("points", `${x+55},${y+10} ${x+40},${y+3} ${x+40},${y+17}`);
    }
    poly.setAttribute("fill", "#2563eb");
    arrowG.appendChild(poly);
    
    svg.appendChild(arrowG);
  }

  drawArrow(130, 240, "From Main Gate", false);
  drawArrow(130, 580, "To the Sports Field", true);

  // Directional Compass labels (Orange matching PNG)
  function drawCompass(x, y, label) {
    const t = document.createElementNS(svgNS, "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("text-anchor", "middle");
    t.classList.add("svg-landmark-text");
    t.style.fontSize = "24px";
    t.style.fontWeight = "900";
    t.style.fill = "#ea580c"; // Solid Orange compass headings
    t.textContent = label;
    svg.appendChild(t);
  }
  
  drawCompass(470, 25, "NORTH");
  drawCompass(775, 320, "EAST"); // Moved EAST further right into the walkway center to avoid booth 9 overlap
  drawCompass(640, 990, "SOUTH");
  drawCompass(80, 380, "WEST"); // Moved WEST further left next to the entrance gate space
}

// --- TOOLTIP INTERACTION ---
function showTooltip(e, booth) {
  const catMeta = CONFIG.categories[booth.category];
  
  let dispId = booth.id;
  if (booth.id === "1-L" || booth.id === "1-R") dispId = "1";
  elements.tipTitle.textContent = `Booth #${dispId}`;
  
  elements.tipDesc.textContent = `${catMeta.name} (${catMeta.size})`;
  
  // Show pricing options
  if (catMeta.depositPrice === catMeta.fullPrice) {
    elements.tipPrice.textContent = `$${catMeta.fullPrice}`;
  } else {
    elements.tipPrice.textContent = `$${catMeta.depositPrice} Dep / $${catMeta.fullPrice} Full`;
  }
  
  elements.tooltip.style.opacity = "1";
  moveTooltip(e);
}

function moveTooltip(e) {
  const rect = elements.canvasContainer.getBoundingClientRect();
  const tooltipWidth = elements.tooltip.offsetWidth;
  const tooltipHeight = elements.tooltip.offsetHeight;
  
  // Align tooltip coordinates relative to viewport canvas
  let x = e.clientX - rect.left + 15;
  let y = e.clientY - rect.top - tooltipHeight - 15;
  
  // Boundary collisions check
  if (x + tooltipWidth > rect.width) {
    x = e.clientX - rect.left - tooltipWidth - 15;
  }
  if (y < 0) {
    y = e.clientY - rect.top + 15;
  }
  
  elements.tooltip.style.left = `${x}px`;
  elements.tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  elements.tooltip.style.opacity = "0";
}

// --- SELECTION CONTROL ---
function handleBoothSelect(booth) {
  selectedBooth = booth;
  // Reset payment option to deposit
  selectedPaymentMode = 'deposit';
  
  updateCheckoutPanel();
  renderMap(); // Redraw map to draw selection border
}

function updateCheckoutPanel() {
  if (!selectedBooth) {
    elements.checkoutEmpty.style.display = "flex";
    elements.checkoutActive.style.display = "none";
    return;
  }

  // Show checkout panel
  elements.checkoutEmpty.style.display = "none";
  elements.checkoutActive.style.display = "flex";

  const catMeta = CONFIG.categories[selectedBooth.category];
  
  let dispId = selectedBooth.id;
  if (selectedBooth.id === "1-L" || selectedBooth.id === "1-R") dispId = "1";
  elements.dispBoothId.textContent = `#${dispId}`;
  
  elements.dispBoothCategory.textContent = catMeta.name;
  elements.dispBoothCategory.className = `badge color-${selectedBooth.category.toLowerCase()}`;
  elements.dispBoothDimensions.textContent = catMeta.size;

  // Render prices in selector
  elements.priceDeposit.textContent = `$${catMeta.depositPrice}`;
  elements.priceFull.textContent = `$${catMeta.fullPrice}`;

  // If Deposit is equal to Full registration (e.g. General, Fruits)
  // we hide the dual selection options block and show a fixed amount info card
  const fixedPriceBlock = document.getElementById("fixed-price-block");
  if (catMeta.depositPrice === catMeta.fullPrice) {
    elements.paymentOptionsBlock.style.display = "none";
    if (fixedPriceBlock) {
      fixedPriceBlock.style.display = "flex";
      document.getElementById("disp-fixed-price").textContent = `$${catMeta.fullPrice}`;
    }
    selectedPaymentMode = 'full'; // enforce full payment type
  } else {
    elements.paymentOptionsBlock.style.display = "flex";
    if (fixedPriceBlock) {
      fixedPriceBlock.style.display = "none";
    }
    // restore selected class
    updatePaymentOptionsUI();
  }

  // Load active price
  const currentPrice = selectedPaymentMode === 'deposit' ? catMeta.depositPrice : catMeta.fullPrice;
  const description = `Registration for Booth #${dispId} (${catMeta.name})`;

  // Render PayPal SDK Checkout buttons
  renderPayPalButtons(currentPrice, description);
}

function updatePaymentOptionsUI() {
  if (selectedPaymentMode === 'deposit') {
    elements.btnPayDeposit.classList.add('selected');
    elements.btnPayFull.classList.remove('selected');
  } else {
    elements.btnPayDeposit.classList.remove('selected');
    elements.btnPayFull.classList.add('selected');
  }
}

// --- EVENT HANDLERS ---
function setupEventListeners() {
  // Payment Type button toggling
  elements.btnPayDeposit.addEventListener('click', () => {
    if (selectedPaymentMode !== 'deposit') {
      selectedPaymentMode = 'deposit';
      updatePaymentOptionsUI();
      updateCheckoutPanel();
    }
  });

  elements.btnPayFull.addEventListener('click', () => {
    if (selectedPaymentMode !== 'full') {
      selectedPaymentMode = 'full';
      updatePaymentOptionsUI();
      updateCheckoutPanel();
    }
  });

  // Test Mode bypass registration
  elements.btnTestBypass.addEventListener('click', () => {
    const validation = validateForm();
    if (validation.valid) {
      const mockTxId = `MOCK-PAY-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      completeBooking(mockTxId);
    } else {
      alert("Please correct the following fields before proceeding:\n\n- " + validation.errors.join("\n- "));
    }
  });

  // Receipt printing
  elements.btnPrintReceipt.addEventListener('click', () => {
    window.print();
  });

  // Close Receipt Modal
  elements.btnCloseReceipt.addEventListener('click', () => {
    elements.modalReceipt.classList.remove('active');
    
    // Clear selection
    selectedBooth = null;
    updateCheckoutPanel();
    renderMap();
  });

  // Zoom Control Button Handlers
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    currentZoom = Math.min(currentZoom + 0.15, 2.5); // Max zoom 250%
    applyZoom();
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    currentZoom = Math.max(currentZoom - 0.15, 0.5); // Min zoom 50%
    applyZoom();
  });

  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    currentZoom = 1.0; // Reset to 100%
    applyZoom();
  });

  // Mobile Pinch-To-Zoom Touch Gesture Listeners
  let touchStartDist = 0;
  let touchStartZoom = 1.0;

  elements.canvasContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Prevent default page pinch zooming to handle map zoom manually
      e.preventDefault();
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartZoom = currentZoom;
    }
  }, { passive: false });

  elements.canvasContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && touchStartDist > 0) {
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = currentDist / touchStartDist;
      
      // Calculate and clamp pinch zoom between 50% and 250%
      currentZoom = Math.min(Math.max(touchStartZoom * scaleFactor, 0.5), 2.5);
      applyZoom();
    }
  }, { passive: false });

  elements.canvasContainer.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      touchStartDist = 0;
    }
  });
}

// Apply the current zoom level to the SVG layout
function applyZoom() {
  const canvasWrapper = document.getElementById('canvas-container-wrapper');
  const svgElement = elements.canvasContainer.querySelector('svg');
  if (canvasWrapper && svgElement) {
    if (currentZoom === 1.0) {
      canvasWrapper.style.width = "100%";
      canvasWrapper.style.height = "100%";
      canvasWrapper.style.maxWidth = "100%";
      canvasWrapper.style.maxHeight = "100%";
      
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";
    } else {
      canvasWrapper.style.width = `${CONFIG.svgWidth * currentZoom}px`;
      canvasWrapper.style.height = `${CONFIG.svgHeight * currentZoom}px`;
      canvasWrapper.style.maxWidth = "none";
      canvasWrapper.style.maxHeight = "none";
      
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";
    }
    document.getElementById('zoom-level-text').textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

// Form fields validation
function validateForm() {
  const nameVal = elements.inputName.value.trim();
  const emailVal = elements.inputEmail.value.trim();
  const phoneVal = elements.inputPhone.value.trim();
  const businessVal = elements.inputBusiness.value.trim();
  
  const errors = [];
  
  if (nameVal === "") {
    errors.push("Contact Full Name");
  }
  
  if (emailVal === "") {
    errors.push("Email Address");
  } else if (!elements.inputEmail.checkValidity()) {
    errors.push("Email Address (must be a valid email format, e.g. name@example.com)");
  }
  
  if (phoneVal === "") {
    errors.push("Phone Number");
  }
  
  if (businessVal === "") {
    errors.push("Business / Vendor Name");
  }
  
  if (errors.length > 0) {
    return { valid: false, errors: errors };
  }
  return { valid: true };
}

// Render dynamic PayPal button
function renderPayPalButtons(price, description) {
  const container = document.getElementById("paypal-button-container");
  container.innerHTML = ""; // Clear existing script output

  // Check if SDK has loaded
  if (typeof paypal === 'undefined') {
    container.innerHTML = "<p style='color: var(--color-warning); font-size: 0.85rem;'>PayPal SDK failed to load. Please check your internet connection or use Test Mode.</p>";
    return;
  }

  paypal.Buttons({
    style: {
      layout: 'vertical',
      color:  'gold',
      shape:  'rect',
      label:  'paypal'
    },
    // Form verification before payment popup opens
    onClick: function(data, actions) {
      const validation = validateForm();
      if (!validation.valid) {
        alert("Please correct the following fields before proceeding:\n\n- " + validation.errors.join("\n- "));
        return actions.reject();
      } else {
        return actions.resolve();
      }
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: price.toString(),
            currency_code: 'USD'
          },
          description: description
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Successful payment captures
        completeBooking(details.id);
      });
    },
    onCancel: function(data) {
      console.log("User cancelled PayPal checkout flow.");
    },
    onError: function(err) {
      console.error("PayPal integration error: ", err);
      alert("PayPal failed to process. Ensure you are using Sandbox details, or use Skip Payment (Test Mode) to test.");
    }
  }).render('#paypal-button-container');
}

// --- BOOKING COMPLETION & RECEIPT GENERATOR ---
function completeBooking(transactionId) {
  const catMeta = CONFIG.categories[selectedBooth.category];
  const pricePaid = selectedPaymentMode === 'deposit' ? catMeta.depositPrice : catMeta.fullPrice;
  const payModeLabel = selectedPaymentMode === 'deposit' ? "Deposit Payment Only" : "Full Registration Fee";

  // Create booking object
  const booking = {
    boothId: selectedBooth.id,
    boothCategory: catMeta.name,
    boothDimensions: catMeta.size,
    name: elements.inputName.value.trim(),
    email: elements.inputEmail.value.trim(),
    phone: elements.inputPhone.value.trim(),
    business: elements.inputBusiness.value.trim(),
    pricePaid: `$${pricePaid}`,
    payMode: payModeLabel,
    transactionId: transactionId,
    date: new Date().toLocaleString()
  };

  // Save in local storage
  localReservations[selectedBooth.id] = booking;
  localStorage.setItem('hai_booth_bookings', JSON.stringify(localReservations));

  // Populate Receipt fields
  elements.recBusiness.textContent = booking.business;
  elements.recName.textContent = booking.name;
  elements.recEmail.textContent = booking.email;
  elements.recPhone.textContent = booking.phone;
  
  let dispId = selectedBooth.id;
  if (selectedBooth.id === "1-L" || selectedBooth.id === "1-R") dispId = "1";
  elements.recBoothId.textContent = `#${dispId}`;
  
  elements.recBoothCategory.textContent = booking.boothCategory;
  elements.recBoothDimensions.textContent = booking.boothDimensions;
  elements.recPayMode.textContent = booking.payMode;
  elements.recTransactionId.textContent = booking.transactionId;
  elements.recDate.textContent = booking.date;
  elements.recTotalPaid.textContent = booking.pricePaid;

  // Clear form fields
  elements.formBooking.reset();
  
  // Show Modal receipt
  elements.modalReceipt.classList.add('active');
}

// --- EXPOSE GLOBALS FOR AUTOMATED TESTING ---
window.CONFIG = CONFIG;
window.elements = elements;
window.validateForm = validateForm;
window.loadReservations = loadReservations;
window.renderMap = renderMap;

Object.defineProperty(window, 'selectedBooth', {
  get: () => selectedBooth,
  set: (val) => { selectedBooth = val; },
  configurable: true,
  enumerable: true
});

Object.defineProperty(window, 'selectedPaymentMode', {
  get: () => selectedPaymentMode,
  set: (val) => { selectedPaymentMode = val; },
  configurable: true,
  enumerable: true
});

Object.defineProperty(window, 'currentZoom', {
  get: () => currentZoom,
  set: (val) => { currentZoom = val; },
  configurable: true,
  enumerable: true
});

