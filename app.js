/* 
   Hmong Association, Inc (Arkansas) Merchandise/Vendors Layout
   Core Javascript Logic - Interactive Booking & PayPal Sandbox Integration
   Human-Readable, Well-Commented, and Easy to Maintain
*/

// --- CONFIGURATION & DATABASE ---
const CONFIG = {
  // Supabase Centralized Database Configuration
  supabaseUrl: "https://hwiodtzxukzjeijopayt.supabase.co",
  supabaseKey: "sb_publishable_1sYheUJ-wC9CAj-22_BDYw_z0O76zyo",
  adminPasscode: "hai-bookkeeper-2026", // Query param value: ?view=hai-bookkeeper-2026

  // SVG Canvas configuration
  svgWidth: 1000,
  svgHeight: 1050,

  // Booth pricing and sizing categories
  categories: {
    General: {
      name: "General Merchandise",
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
      depositPrice: 500,
      fullPrice: 500,
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
    { id: "39", category: "General", x: 66,  y: 60, w: 26, h: 42 },
    { id: "38", category: "General", x: 96,  y: 60, w: 26, h: 42 },
    { id: "37", category: "General", x: 126, y: 60, w: 26, h: 42 },
    { id: "36", category: "General", x: 156, y: 60, w: 26, h: 42 },
    { id: "35", category: "General", x: 186, y: 60, w: 26, h: 42 },
    { id: "34", category: "General", x: 216, y: 60, w: 26, h: 42 },
    { id: "33", category: "General", x: 246, y: 60, w: 26, h: 42 },
    { id: "32", category: "General", x: 276, y: 60, w: 26, h: 42 },
    { id: "31", category: "General", x: 306, y: 60, w: 26, h: 42 },
    { id: "30", category: "Fruits",  x: 336, y: 60, w: 26, h: 42 },
    { id: "29", category: "Fruits",  x: 366, y: 60, w: 26, h: 42 },
    // Walkway Gap (60ft / 80 units wide, aligned with x: 392 to x: 472)
    { id: "28", category: "Fruits",  x: 472, y: 60, w: 26, h: 42 },
    { id: "27", category: "General", x: 502, y: 60, w: 26, h: 42 },
    { id: "26", category: "General", x: 532, y: 60, w: 26, h: 42 },
    { id: "25", category: "Fruits",  x: 562, y: 60, w: 26, h: 42 },
    { id: "24", category: "General", x: 592, y: 60, w: 26, h: 42 },
    { id: "23", category: "General", x: 622, y: 60, w: 26, h: 42 },
    { id: "22", category: "Fruits",  x: 652, y: 60, w: 26, h: 42 },

    // --- WEST ROW (Left horizontal row, left to right, numbered 40 to 47) ---
    { id: "40", category: "General", x: 66,  y: 160, w: 26, h: 42 },
    { id: "41", category: "General", x: 96,  y: 160, w: 26, h: 42 },
    { id: "42", category: "General", x: 126, y: 160, w: 26, h: 42 },
    { id: "43", category: "General", x: 156, y: 160, w: 26, h: 42 },
    { id: "44", category: "General", x: 186, y: 160, w: 26, h: 42 },
    { id: "45", category: "General", x: 216, y: 160, w: 26, h: 42 },
    { id: "46", category: "General", x: 246, y: 160, w: 26, h: 42 },
    { id: "47", category: "General", x: 276, y: 160, w: 26, h: 42 },

    // --- MIDDLE COLUMN (Vertical column, top to bottom, numbered 48 to 57A) ---
    { id: "48",  category: "General", x: 350, y: 220, w: 42, h: 26 },
    { id: "49",  category: "General", x: 350, y: 250, w: 42, h: 26 },
    { id: "50",  category: "General", x: 350, y: 280, w: 42, h: 26 },
    { id: "51",  category: "General", x: 350, y: 310, w: 42, h: 26 },
    { id: "52",  category: "General", x: 350, y: 340, w: 42, h: 26 },
    { id: "53",  category: "General", x: 350, y: 370, w: 42, h: 26 },
    { id: "54",  category: "General", x: 350, y: 400, w: 42, h: 26 },
    { id: "55",  category: "General", x: 350, y: 430, w: 42, h: 26 },
    { id: "56",  category: "General", x: 350, y: 460, w: 42, h: 26 },
    { id: "57",  category: "Info",    x: 350, y: 490, w: 42, h: 14 }, // Proportional 10x10 ft
    { id: "57A", category: "Info",    x: 350, y: 508, w: 42, h: 14 }, // Proportional 10x10 ft

    // --- EAST ROW (Right vertical column, top to bottom, numbered 21 down to 7) ---
    { id: "21", category: "Boba",     x: 770, y: 120, w: 42, h: 26 },
    { id: "20", category: "Food",     x: 770, y: 150, w: 42, h: 26 },
    { id: "19", category: "Food",     x: 770, y: 180, w: 42, h: 26 },
    { id: "18", category: "Food",     x: 770, y: 210, w: 42, h: 26 },
    { id: "17", category: "Boba",     x: 770, y: 240, w: 42, h: 26 },
    { id: "16", category: "Food",     x: 770, y: 270, w: 42, h: 26 },
    { id: "15", category: "Food",     x: 770, y: 300, w: 42, h: 26 },
    { id: "14", category: "Food",     x: 770, y: 330, w: 42, h: 26 },
    { id: "13", category: "Boba",     x: 770, y: 360, w: 42, h: 26 },
    { id: "12", category: "Food",     x: 770, y: 390, w: 42, h: 26 }, // Org pre-reserved (Food booth)
    { id: "11", category: "Food",     x: 770, y: 420, w: 42, h: 26 },
    { id: "10", category: "Boba",     x: 770, y: 450, w: 42, h: 26 },
    { id: "9",  category: "General",  x: 770, y: 480, w: 42, h: 26 },
    { id: "8",  category: "General",  x: 770, y: 510, w: 42, h: 26 },
    { id: "7",  category: "General",  x: 770, y: 540, w: 42, h: 26 },

    // --- SOUTH ROW (Bottom horizontal, left to right, Info 1 (x2) & General 2 to 6) ---
    { id: "1-L", category: "Info",    x: 476, y: 580, w: 13, h: 42 }, // Split 10x30 ft Info
    { id: "1-R", category: "Info",    x: 489, y: 580, w: 13, h: 42 }, // Split 10x30 ft Info
    { id: "2",   category: "General", x: 506, y: 580, w: 26, h: 42 },
    { id: "3",   category: "General", x: 536, y: 580, w: 26, h: 42 },
    { id: "4",   category: "General", x: 566, y: 580, w: 26, h: 42 },
    { id: "5",   category: "General", x: 596, y: 580, w: 26, h: 42 },
    { id: "6",   category: "General", x: 626, y: 580, w: 26, h: 42 }
  ]
};

// --- APPLICATION STATE ---
let selectedBooth = null;       // Currently selected booth object
let selectedPaymentMode = 'deposit'; // 'deposit' or 'full'
let localReservations = {};     // Map of booked booths from localStorage
const PRERESERVED_IDS = ["2", "3", "12", "28", "33", "47", "48", "49", "50", "53", "55", "57", "57A"]; // Booths pre-reserved by the organizer
let currentZoom = 1.0;          // Floor plan zoom level (1.0 = 100%)

let currentLang = 'en';         // Active language: 'en' or 'hm'
let activeLookupTab = 'txid';   // Active lookup modal tab: 'txid' or 'details'

const TRANSLATIONS = {
  en: {
    brand_title: "Hmong Association, Inc",
    brand_subtitle: "Arkansas Merchandise/Vendors Layout & Reservations",
    scale_note: "(Note: Dimensions and layout are not to scale)",
    btn_admin_dashboard: "🔑 Admin Dashboard",
    btn_reset_cache: "Reset Map",
    
    // Legend
    legend_general: "General ($350)",
    legend_food: "Food ($1,000 / $1,500)",
    legend_boba: "Boba ($500 / $750)",
    legend_fruits: "Fruits ($500)",
    legend_info: "Info (Org Use)",
    legend_reserved: "Reserved/Sold",
    legend_selected: "Selected",
    
    // Sidebar/Checkout
    sidebar_title: "Reserve Spot",
    sidebar_subtitle: "Select an available booth on the layout to begin",
    checkout_empty_hint: "Click on any light-colored booth (white, peach, green, blue) on the floor map to configure your registration.",
    label_selected_booth: "Selected Booth",
    label_category: "Category",
    label_dimensions: "Dimensions",
    label_payment_amount: "Select Payment Amount",
    payment_option_deposit: "Pay Deposit",
    payment_option_full: "Full Registration",
    payment_fixed_title: "Registration Fee",
    payment_fixed_full: "Full Registration Fee",
    
    // Form Labels & Placeholders
    label_contact_name: "Contact Full Name *",
    placeholder_name: "John Doe",
    label_email: "Email Address *",
    placeholder_email: "johndoe@example.com",
    label_phone: "Phone Number *",
    placeholder_phone: "(555) 000-0000",
    label_business: "Business / Vendor Name *",
    placeholder_business: "ABC Merchandise Co.",
    label_payment_method: "Payment Method",
    btn_bypass_test: "⚡ Skip Payment (Test Booking)",
    link_lookup_prefix: "Already reserved?",
    link_lookup_action: "Look Up / Pay Balance",
    
    // Location
    location_directions_title: "Event Location & Venue Directions",
    location_directions_subtitle: "View the venue location on Google Maps / Satellite view",
    location_address: "Address:",
    btn_directions: "🚗 Get Directions",
    btn_open_gmaps: "🌐 Open in Google Maps",
    
    // Receipt Modal
    receipt_title: "Payment Successful!",
    receipt_subtitle: "Your booth reservation has been confirmed",
    receipt_sec_registrant: "Registrant Info",
    receipt_label_vendor: "Vendor Name",
    receipt_label_contact: "Contact Person",
    receipt_label_email: "Email",
    receipt_label_phone: "Phone",
    receipt_sec_booth: "Booth Details",
    receipt_label_booth: "Reserved Booth",
    receipt_label_category: "Category",
    receipt_label_dimensions: "Dimensions",
    receipt_sec_transaction: "Transaction Details",
    receipt_label_pay_mode: "Payment Mode",
    receipt_label_txid: "Transaction ID",
    receipt_label_date: "Date & Time",
    receipt_label_amount_paid: "Amount Paid",
    btn_print_receipt: "🖨 Print / Save PDF",
    btn_close: "Close",
    
    // Bookkeeping/Admin Logbook
    admin_title: "Bookkeeping Reservation Logbook",
    admin_subtitle: "View, print, and export all active booth reservations logged in Supabase",
    admin_label_total: "Total Reservations",
    admin_label_revenue: "Total Revenue Collected",
    admin_label_db: "Database Status",
    admin_db_connected: "Connected",
    admin_placeholder_search: "Search by Business, Contact Name, Booth ID, or Transaction ID...",
    admin_th_booth: "Booth #",
    admin_th_business: "Business / Vendor",
    admin_th_contact: "Contact Name",
    admin_th_email: "Email Address",
    admin_th_phone: "Phone Number",
    admin_th_price: "Price Paid",
    admin_th_mode: "Payment Mode",
    admin_th_date: "Date & Time",
    admin_th_txid: "Transaction ID",
    admin_empty: "No bookings matching your search query were found.",
    btn_admin_export: "📥 Export to Excel (CSV)",
    btn_admin_print: "🖨 Print Logbook",
    btn_admin_close: "Close",
    
    // Lookup Modal
    lookup_title: "Look Up Reservation",
    lookup_subtitle: "Search by transaction ID or contact details with registered email to pay remaining balance",
    lookup_tab_txid: "Search by Transaction ID",
    lookup_tab_details: "Search by Contact Info",
    lookup_label_email: "Registered Email Address *",
    lookup_label_txid: "Original Transaction ID *",
    lookup_placeholder_txid: "MOCK-PAY-XXXXXX or PAYID-XXXXXX",
    btn_lookup_search: "Search Reservation",
    lookup_searching: "Searching database...",
    lookup_error: "❌ No reservation matching those details was found. Please check your spelling and try again.",
    lookup_sec_title: "Reservation Details",
    lookup_res_business: "Business / Vendor",
    lookup_res_contact: "Contact Person",
    lookup_res_booth: "Reserved Booth",
    lookup_res_category: "Booth Category",
    lookup_res_paid: "Amount Paid Already",
    lookup_res_status: "Status",
    lookup_status_deposit: "Deposit Paid",
    lookup_status_paid: "Fully Paid",
    lookup_balance_due_label: "Balance Due:",
    lookup_balance_note: "You previously paid the deposit. The remaining registration balance must be paid to secure your reserved booth.",
    lookup_label_payment_method: "Select Payment Method",
    btn_bypass_balance: "⚡ Skip Payment (Test Balance Payment)",
    lookup_success_title: "Payment Successful!",
    lookup_success_msg: "Your remaining balance has been paid in full and your reservation has been updated to **Fully Paid**. Thank you!",
    btn_lookup_close: "Close",
    
    // Dynamic Categories & Map labels
    cat_general: "General Merchandise",
    cat_food: "Food Vendor",
    cat_boba: "Boba/Specialty Drink",
    cat_fruits: "Fruits Vendor",
    cat_info: "Information / Non-profit",
    cat_reserved: "Reserved by Organizer",
    
    landmark_central_tent: "Central Tent (50' x 100')",
    landmark_building: "Building (50' x 120')",
    landmark_office: "Office",
    landmark_storage: "Storage",
    landmark_pavilion: "Pavilion",
    landmark_dumpster: "Dumpster",
    landmark_fence: "FENCE",
    landmark_main_gate: "From Main Gate",
    landmark_sports_field_arrow: "To the Sports Field",
    compass_north: "NORTH",
    compass_east: "EAST",
    compass_south: "SOUTH",
    compass_west: "WEST",
    compass_sport_fields: "(sport fields)",
    
    // Alert & Dynamic status texts
    alert_correct_fields: "Please correct the following fields before proceeding:",
    alert_paypal_error: "PayPal failed to process. Ensure you are using Sandbox details, or use Skip Payment (Test Mode) to test.",
    alert_paypal_error_balance: "PayPal failed to process. Try again or use Skip Payment (Test Mode).",
    error_email_format: "Email Address (must be a valid email format, e.g. name@example.com)",
    status_deposit: "Deposit Paid ($",
    status_fully_paid: "Fully Paid"
  },
  hm: {
    brand_title: "Koom Txoos Hmoob, Inc",
    brand_subtitle: "Arkansas Kev Sau Npe & Ceev Cov Chaw Muag Khoom",
    scale_note: "(Faj seeb: Cov chaw ntsuas tsis yog raws nraim li qhov tseeb)",
    btn_admin_dashboard: "🔑 Tswj Xyuas Chaw",
    btn_reset_cache: "Rov Pib Map Tshiab",
    
    // Legend
    legend_general: "Khoom Muag ($350)",
    legend_food: "Zaub Mov ($1,000 / $1,500)",
    legend_boba: "Dej Qab Zib Boba ($500 / $750)",
    legend_fruits: "Txiv Hnyev / Txiv Ntoo ($500)",
    legend_info: "Chaw Qhia Ntawv",
    legend_reserved: "Ceev Lawm / Muag Lawm",
    legend_selected: "Xaiv Tseg",
    
    // Sidebar/Checkout
    sidebar_title: "Ceev Ib Qho Chaw",
    sidebar_subtitle: "Xaiv ib lub chaw dawb hauv daim duab mus pib",
    checkout_empty_hint: "Nyem rau ntawm lub chaw dawb (xim dawb, xim duav, xim ntsuab, xim xiav) hauv daim duab mus sau npe ceev chaw.",
    label_selected_booth: "Lub Chaw Xaiv Tseg",
    label_category: "Hom Chaw",
    label_dimensions: "Qhov Loj (Ntsuas)",
    label_payment_amount: "Xaiv Tus Nqi Them Nyiaj",
    payment_option_deposit: "Them Nyiaj Ceev (Deposit)",
    payment_option_full: "Them Tag Nrho (Full)",
    payment_fixed_title: "Tus Nqi Sau Npe",
    payment_fixed_full: "Tus Nqi Them Tag Nrho",
    
    // Form Labels & Placeholders
    label_contact_name: "Hais Npe Tag Nrho *",
    placeholder_name: "John Doe (Npe)",
    label_email: "Chaw Nyob Email *",
    placeholder_email: "johndoe@example.com (Email)",
    label_phone: "Tus Xov Tooj *",
    placeholder_phone: "(555) 000-0000 (Xov tooj)",
    label_business: "Lub Npe Lag Luam / Tus Muag Khoom *",
    placeholder_business: "Lag luam / Lub koom haum",
    label_payment_method: "Thev Naus Them Nyiaj",
    btn_bypass_test: "⚡ Skip Payment (Kuaj Ceev Chaw)",
    link_lookup_prefix: "Puas tau ceev lawm?",
    link_lookup_action: "Nrhiav Chaw / Them Nqe Tshuav",
    
    // Location
    location_directions_title: "Chaw Nyob Ntawm Koom Txoos & Kev Mus",
    location_directions_subtitle: "Saib qhov chaw ntawm Google Maps / Duab Satellite",
    location_address: "Chaw Nyob:",
    btn_directions: "🚗 Nrhiav Kev Mus",
    btn_open_gmaps: "🌐 Qhib rau Google Maps",
    
    // Receipt Modal
    receipt_title: "Them Nyiaj Tau Lawm!",
    receipt_subtitle: "Koj lub chaw ceev tau tso cai thiab paub tseeb lawm",
    receipt_sec_registrant: "Tus Neeg Sau Npe",
    receipt_label_vendor: "Vendor/Lag Luam",
    receipt_label_contact: "Tus Neeg Hais",
    receipt_label_email: "Email",
    receipt_label_phone: "Xov Tooj",
    receipt_sec_booth: "Booth Paub Ntsiab",
    receipt_label_booth: "Chaw Ceev Tau",
    receipt_label_category: "Hom Chaw",
    receipt_label_dimensions: "Ntsuas Kev Loj",
    receipt_sec_transaction: "Txoj Kev Them Nyiaj",
    receipt_label_pay_mode: "Thev Naus Them",
    receipt_label_txid: "Tus ID Them Nyiaj",
    receipt_label_date: "Hnub & Sij Hawm",
    receipt_label_amount_paid: "Tus Nyiaj Them Lawm",
    btn_print_receipt: "🖨 Luam Ntawv / Khaws PDF",
    btn_close: "Kaw",
    
    // Bookkeeping/Admin Logbook
    admin_title: "Daim Ntawv Tswj Xyuas Cov Chaw Ceev",
    admin_subtitle: "Saib, luam ntawv, thiab rub tawm cov chaw ceev hauv Supabase",
    admin_label_total: "Tag Nrho Chaw Ceev",
    admin_label_revenue: "Tag Nrho Nyiaj Sau Tau",
    admin_label_db: "Chaw Khaws Nyiaj Txuas",
    admin_db_connected: "Txuas Lawm",
    admin_placeholder_search: "Nrhiav raws li Lub Npe, Tus Hais, Tus Booth, lossis Tus ID...",
    admin_th_booth: "Booth #",
    admin_th_business: "Lag Luam / Tus Muag",
    admin_th_contact: "Neeg Hais",
    admin_th_email: "Email",
    admin_th_phone: "Xov Tooj",
    admin_th_price: "Nqi Them",
    admin_th_mode: "Thev Naus Them",
    admin_th_date: "Hnub & Sij Hawm",
    admin_th_txid: "Tus ID Them Nyiaj",
    admin_empty: "Tsis pom kev ceev chaw twg raws li koj nrhiav.",
    btn_admin_export: "📥 Rub tawm Excel (CSV)",
    btn_admin_print: "🖨 Luam Ntawv Tswj Xyuas",
    btn_admin_close: "Kaw",
    
    // Lookup Modal
    lookup_title: "Nrhiav Kev Ceev Chaw",
    lookup_subtitle: "Nrhiav raws li tus ID them nyiaj lossis neeg cov ntaub ntawv nrog email sau npe txhawm rau them nqe tshuav",
    lookup_tab_txid: "Nrhiav raws li Tus ID Them Nyiaj",
    lookup_tab_details: "Nrhiav raws li Kev Hais Npe",
    lookup_label_email: "Email Sau Npe *",
    lookup_label_txid: "Tus ID Them Nyiaj Ua Ntej *",
    lookup_placeholder_txid: "MOCK-PAY-XXXXXX lossis PAYID-XXXXXX",
    btn_lookup_search: "Nrhiav Qhov Ceev Chaw",
    lookup_searching: "Tab tom nrhiav hauv database...",
    lookup_error: "❌ Tsis pom muaj chaw ceev raws li cov ntsiab lus saum toj no. Thov xyuas kom zoo thiab sim dua.",
    lookup_sec_title: "Ntsiab Lus Ceev Chaw",
    lookup_res_business: "Lag Luam / Tus Muag",
    lookup_res_contact: "Tus Neeg Hais",
    lookup_res_booth: "Chaw Ceev Tau",
    lookup_res_category: "Hom Chaw",
    lookup_res_paid: "Tus Nyiaj Them Lawm",
    lookup_res_status: "Qhov Txheej Txheem",
    lookup_status_deposit: "Them Ceev Lawm",
    lookup_status_paid: "Them Tag Nrho Lawm",
    lookup_balance_due_label: "Nqe Tshuav:",
    lookup_balance_note: "Koj tau them qhov ceev (deposit) ua ntej lawm. Koj yuav tsum them tus nqi tshuav kom tiav thiaj ceev tau koj lub booth.",
    lookup_label_payment_method: "Xaiv Cov Kev Them Nyiaj",
    btn_bypass_balance: "⚡ Hla Kev Them Nyiaj (Kuaj Them Nqe Tshuav)",
    lookup_success_title: "Them Nyiaj Tau Lawm!",
    lookup_success_msg: "Koj cov nyiaj tshuav tau them tiav lawm thiab koj qhov chaw ceev tau hloov mus rau **Them Tag Nrho Lawm**. Ua tsaug ntau!",
    btn_lookup_close: "Kaw",
    
    // Dynamic Categories & Map labels
    cat_general: "Khoom Muag Feem Ntau",
    cat_food: "Muag Zaub Mov",
    cat_boba: "Dej Qab Zib Boba",
    cat_fruits: "Txiv Hnyev / Txiv Ntoo",
    cat_info: "Chaw Qhia Ntawv",
    cat_reserved: "Ceev los ntawm Koom Txoos",
    
    landmark_central_tent: "Tsev Pheeb Suab Nruab Nrab (50' x 100')",
    landmark_building: "Lub Tsev Loj (50' x 120')",
    landmark_office: "Chaw Ua Haujlwm",
    landmark_storage: "Chaw Khaws Khoom",
    landmark_pavilion: "Tsev Pavilion",
    landmark_dumpster: "Thawv Khib Nyiab",
    landmark_fence: "LAJ KAB",
    landmark_main_gate: "Ntawm Qhov Rooj Loj",
    landmark_sports_field_arrow: "Mus rau Chaw Ncaws Pob",
    compass_north: "QAUM TEB",
    compass_east: "HNUB TUAJ",
    compass_south: "QAB TEB",
    compass_west: "HNUB POOB",
    compass_sport_fields: "(chaw ncaws pob)",
    
    // Alert & Dynamic status texts
    alert_correct_fields: "Thov kho cov chaw hauv qab no ua ntej yuav mus ntxiv:",
    alert_paypal_error: "PayPal failed to process. Ensure you are using Sandbox details, or use Skip Payment (Test Mode) to test.",
    alert_paypal_error_balance: "PayPal failed to process. Try again or use Skip Payment (Test Mode).",
    error_email_format: "Email Address (yuav tsum yog hom email tseeb, piv txwv name@example.com)",
    status_deposit: "Them Ceev Lawm ($",
    status_fully_paid: "Them Tag Nrho Lawm"
  }
};

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('hai_language_pref', lang);
  
  const btnToggle = document.getElementById('btn-language-toggle');
  if (btnToggle) {
    btnToggle.textContent = lang === 'en' ? '🌐 English' : '🌐 Hmoob';
  }
  
  document.documentElement.lang = lang;

  const elementsToTranslate = document.querySelectorAll('[data-i18n]');
  elementsToTranslate.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = TRANSLATIONS[lang][key];
    if (translation) {
      el.textContent = translation;
    }
  });

  const elementsWithPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
  elementsWithPlaceholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = TRANSLATIONS[lang][key];
    if (translation) {
      el.placeholder = translation;
    }
  });

  if (selectedBooth) {
    updateCheckoutPanel();
  }

  updateLookupModalTranslation();
  renderMap();
}

function switchLookupTab(tab) {
  activeLookupTab = tab;
  
  const btnTabTxid = document.getElementById('btn-tab-txid');
  const btnTabDetails = document.getElementById('btn-tab-details');
  const groupLookupTxid = document.getElementById('group-lookup-txid');
  const groupLookupDetails = document.getElementById('group-lookup-details');
  const inputLookupTxid = document.getElementById('input-lookup-txid');
  const inputLookupName = document.getElementById('input-lookup-name');
  const inputLookupPhone = document.getElementById('input-lookup-phone');
  
  if (tab === 'txid') {
    if (btnTabTxid) btnTabTxid.classList.add('active');
    if (btnTabDetails) btnTabDetails.classList.remove('active');
    if (groupLookupTxid) groupLookupTxid.style.display = 'block';
    if (groupLookupDetails) groupLookupDetails.style.display = 'none';
    
    if (inputLookupTxid) inputLookupTxid.required = true;
    if (inputLookupName) inputLookupName.required = false;
    if (inputLookupPhone) inputLookupPhone.required = false;
  } else {
    if (btnTabTxid) btnTabTxid.classList.remove('active');
    if (btnTabDetails) btnTabDetails.classList.add('active');
    if (groupLookupTxid) groupLookupTxid.style.display = 'none';
    if (groupLookupDetails) groupLookupDetails.style.display = 'flex';
    
    if (inputLookupTxid) inputLookupTxid.required = false;
    if (inputLookupName) inputLookupName.required = true;
    if (inputLookupPhone) inputLookupPhone.required = true;
  }
}

function updateLookupModalTranslation() {
  const statusBadge = document.getElementById('lookup-res-status');
  if (statusBadge && statusBadge.textContent) {
    const txt = statusBadge.textContent.trim();
    if (txt === "Fully Paid" || txt === "Them Tag Nrho Lawm") {
      statusBadge.textContent = t('lookup_status_paid');
    } else if (txt === "Deposit Paid" || txt === "Them Ceev Lawm") {
      statusBadge.textContent = t('lookup_status_deposit');
    }
  }

  const resCat = document.getElementById('lookup-res-category');
  if (resCat && resCat.textContent) {
    const currentText = resCat.textContent.trim();
    const catKeys = ['General', 'Food', 'Boba', 'Fruits', 'Info', 'Reserved'];
    let foundKey = null;
    for (const key of catKeys) {
      if (currentText === CONFIG.categories[key].name || currentText === TRANSLATIONS.hm[`cat_${key.toLowerCase()}`] || currentText === TRANSLATIONS.en[`cat_${key.toLowerCase()}`]) {
        foundKey = key;
        break;
      }
    }
    if (foundKey) {
      resCat.textContent = t(`cat_${foundKey.toLowerCase()}`);
    }
  }

  const recCat = document.getElementById('rec-booth-category');
  if (recCat && recCat.textContent) {
    const currentText = recCat.textContent.trim();
    const catKeys = ['General', 'Food', 'Boba', 'Fruits', 'Info', 'Reserved'];
    let foundKey = null;
    for (const key of catKeys) {
      if (currentText === CONFIG.categories[key].name || currentText === TRANSLATIONS.hm[`cat_${key.toLowerCase()}`] || currentText === TRANSLATIONS.en[`cat_${key.toLowerCase()}`]) {
        foundKey = key;
        break;
      }
    }
    if (foundKey) {
      recCat.textContent = t(`cat_${foundKey.toLowerCase()}`);
    }
  }

  const recPayMode = document.getElementById('rec-pay-mode');
  if (recPayMode && recPayMode.textContent) {
    const currentText = recPayMode.textContent.trim();
    if (currentText.startsWith("Deposit Paid") || currentText.startsWith("Them Ceev Lawm") || currentText.startsWith("Deposit Payment Only")) {
      const match = currentText.match(/\d+/);
      const priceStr = match ? match[0] : "";
      recPayMode.textContent = t('status_deposit') + priceStr + ")";
    } else if (currentText === "Fully Paid" || currentText === "Them Tag Nrho Lawm" || currentText === "Full Registration Fee") {
      recPayMode.textContent = t('status_fully_paid');
    }
  }
}

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
  setupEventListeners();

  // Detect language-specific landing pages (e.g. hmong.html) to set default on load
  const pagePath = window.location.pathname;
  const isHmongPage = pagePath.endsWith('hmong.html') || pagePath.endsWith('hmong') || window.location.href.includes('hmong');

  if (isHmongPage) {
    currentLang = 'hm';
  } else {
    const savedLang = localStorage.getItem('hai_language_pref');
    if (savedLang === 'en' || savedLang === 'hm') {
      currentLang = savedLang;
    } else {
      currentLang = 'en';
    }
  }
  setLanguage(currentLang);

  // Check URL query parameters to reveal Admin Dashboard button (Option A)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === CONFIG.adminPasscode) {
    const btnAdmin = document.getElementById('btn-admin-dashboard');
    if (btnAdmin) {
      btnAdmin.style.display = 'block';
    }
  }
});

// Load saved bookings from localStorage
async function loadReservations() {
  // Load cached reservations instantly first for offline availability
  const cached = localStorage.getItem('hai_booth_bookings');
  if (cached) {
    localReservations = JSON.parse(cached);
  } else {
    localReservations = {};
  }

  // Fetch updated bookings from Supabase
  try {
    const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/bookings`, {
      method: 'GET',
      headers: {
        'apikey': CONFIG.supabaseKey,
        'Authorization': `Bearer ${CONFIG.supabaseKey}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      const dbReservations = {};
      data.forEach(row => {
        dbReservations[row.booth_id] = {
          boothId: row.booth_id,
          boothCategory: row.booth_category,
          boothDimensions: row.booth_dimensions,
          name: row.contact_name,
          email: row.email,
          phone: row.phone,
          business: row.business_name,
          pricePaid: row.price_paid,
          payMode: row.payment_mode,
          transactionId: row.transaction_id,
          date: row.created_at ? new Date(row.created_at).toLocaleString() : ''
        };
      });
      
      // Merge Supabase entries with local cache (favoring database entries as source of truth)
      localReservations = { ...localReservations, ...dbReservations };
      localStorage.setItem('hai_booth_bookings', JSON.stringify(localReservations));
      
      // If admin panel modal is active, update the dashboard table too
      const adminModal = document.getElementById('modal-admin-logbook');
      if (adminModal && adminModal.classList.contains('active')) {
        renderAdminTable();
      }
      
      renderMap();
    } else {
      console.warn("Supabase fetch failed: ", response.statusText);
    }
  } catch (err) {
    console.warn("Supabase connection offline or blocked. Operating in local/localStorage mode.", err);
  }
}

// Background sync helper to save new bookings to Supabase
async function saveBookingToSupabase(booking) {
  try {
    const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'apikey': CONFIG.supabaseKey,
        'Authorization': `Bearer ${CONFIG.supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        booth_id: booking.boothId,
        booth_category: booking.boothCategory,
        booth_dimensions: booking.boothDimensions,
        contact_name: booking.name,
        business_name: booking.business,
        email: booking.email,
        phone: booking.phone,
        price_paid: booking.pricePaid,
        payment_mode: booking.payMode,
        transaction_id: booking.transactionId
      })
    });
    if (!response.ok) {
      console.warn("Supabase insert responded with error status:", response.status);
    } else {
      console.log("Successfully logged booking to Supabase.");
    }
  } catch (err) {
    console.error("Failed to save booking to Supabase:", err);
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
    textEl.textContent = t('landmark_dumpster');
    svg.appendChild(textEl);
  }

  // Draw Central Tent
  drawBox(546, 280, 70, 140, t('landmark_central_tent'));

  // Draw Building
  drawBox(225, 720, 70, 160, t('landmark_building'));

  // Draw Office & Storage
  drawBox(370, 780, 70, 50, t('landmark_office'));
  drawBox(370, 840, 70, 50, t('landmark_storage'));

  // Draw Pavilion
  drawBox(470, 890, 100, 50, t('landmark_pavilion'));

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
  fenceText.textContent = t('landmark_fence');
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

  drawArrow(130, 240, t('landmark_main_gate'), false);
  drawArrow(130, 580, t('landmark_sports_field_arrow'), true);

  // Directional Compass labels (Orange matching PNG)
  function drawCompass(x, y, label) {
    const tEl = document.createElementNS(svgNS, "text");
    tEl.setAttribute("x", x);
    tEl.setAttribute("y", y);
    tEl.setAttribute("text-anchor", "middle");
    tEl.classList.add("svg-landmark-text");
    tEl.style.fontSize = "24px";
    tEl.style.fontWeight = "900";
    tEl.style.fill = "#ea580c"; // Solid Orange compass headings
    tEl.textContent = label;
    svg.appendChild(tEl);
  }
  
  drawCompass(430, 25, t('compass_north'));
  drawCompass(930, 320, t('compass_east')); // Right of fence
  drawCompass(640, 990, t('compass_south'));
  drawCompass(80, 380, t('compass_west')); // Moved WEST further left next to the entrance gate space

  // Add (sport fields) underneath WEST compass heading
  const westSub = document.createElementNS(svgNS, "text");
  westSub.setAttribute("x", "80");
  westSub.setAttribute("y", "405");
  westSub.setAttribute("text-anchor", "middle");
  westSub.classList.add("svg-landmark-text");
  westSub.style.fontSize = "12px";
  westSub.style.fontWeight = "700";
  westSub.style.fill = "#ea580c";
  westSub.textContent = t('compass_sport_fields');
  svg.appendChild(westSub);
}

// --- TOOLTIP INTERACTION ---
function showTooltip(e, booth) {
  const catMeta = CONFIG.categories[booth.category];
  
  let dispId = booth.id;
  if (booth.id === "1-L" || booth.id === "1-R") dispId = "1";
  elements.tipTitle.textContent = `Booth #${dispId}`;
  
  elements.tipDesc.textContent = `${t(`cat_${booth.category.toLowerCase()}`)} (${catMeta.size})`;
  
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
  
  elements.dispBoothCategory.textContent = t(`cat_${selectedBooth.category.toLowerCase()}`);
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
  // Language Switcher Toggle Click Event
  const btnLang = document.getElementById('btn-language-toggle');
  if (btnLang) {
    btnLang.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'hm' : 'en';
      setLanguage(nextLang);
    });
  }

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
      alert(t('alert_correct_fields') + "\n\n- " + validation.errors.join("\n- "));
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

  // --- ADMIN LOGBOOK EVENTS ---
  const btnAdminOpen = document.getElementById('btn-admin-dashboard');
  const btnAdminClose = document.getElementById('btn-admin-close');
  const btnAdminCloseX = document.getElementById('btn-admin-close-x');
  const modalAdmin = document.getElementById('modal-admin-logbook');
  const adminSearch = document.getElementById('admin-search-input');
  const btnAdminExport = document.getElementById('btn-admin-export');
  const btnAdminPrint = document.getElementById('btn-admin-print');

  if (btnAdminOpen) {
    btnAdminOpen.addEventListener('click', () => {
      // Re-load reservations to get fresh database changes from Supabase
      loadReservations();
      renderAdminTable();
      if (modalAdmin) modalAdmin.classList.add('active');
    });
  }

  const closeAdmin = () => {
    if (modalAdmin) modalAdmin.classList.remove('active');
    if (adminSearch) adminSearch.value = '';
  };

  if (btnAdminClose) btnAdminClose.addEventListener('click', closeAdmin);
  if (btnAdminCloseX) btnAdminCloseX.addEventListener('click', closeAdmin);

  if (adminSearch) {
    adminSearch.addEventListener('input', (e) => {
      renderAdminTable(e.target.value);
    });
  }

  if (btnAdminExport) {
    btnAdminExport.addEventListener('click', () => {
      exportCSV();
    });
  }

  if (btnAdminPrint) {
    btnAdminPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // --- RESERVATION LOOKUP EVENTS ---
  const linkLookup = document.getElementById('link-lookup-booking');
  const modalLookup = document.getElementById('modal-lookup');
  const btnLookupClose = document.getElementById('btn-lookup-close');
  const btnLookupCloseX = document.getElementById('btn-lookup-close-x');
  const formLookup = document.getElementById('form-lookup');
  const inputLookupEmail = document.getElementById('input-lookup-email');
  const inputLookupTxid = document.getElementById('input-lookup-txid');
  const btnTabTxid = document.getElementById('btn-tab-txid');
  const btnTabDetails = document.getElementById('btn-tab-details');

  if (btnTabTxid) {
    btnTabTxid.addEventListener('click', () => {
      switchLookupTab('txid');
    });
  }

  if (btnTabDetails) {
    btnTabDetails.addEventListener('click', () => {
      switchLookupTab('details');
    });
  }

  if (linkLookup) {
    linkLookup.addEventListener('click', (e) => {
      e.preventDefault();
      // Reset lookup search fields and results states
      if (inputLookupEmail) inputLookupEmail.value = '';
      if (inputLookupTxid) inputLookupTxid.value = '';
      const inputLookupName = document.getElementById('input-lookup-name');
      const inputLookupPhone = document.getElementById('input-lookup-phone');
      if (inputLookupName) inputLookupName.value = '';
      if (inputLookupPhone) inputLookupPhone.value = '';
      
      switchLookupTab('txid');
      
      document.getElementById('lookup-loading').style.display = 'none';
      document.getElementById('lookup-error').style.display = 'none';
      document.getElementById('lookup-results').style.display = 'none';
      document.getElementById('lookup-success').style.display = 'none';
      document.getElementById('form-lookup').style.display = 'flex';
      
      if (modalLookup) modalLookup.classList.add('active');
    });
  }

  const closeLookup = () => {
    if (modalLookup) modalLookup.classList.remove('active');
  };

  if (btnLookupClose) btnLookupClose.addEventListener('click', closeLookup);
  if (btnLookupCloseX) btnLookupCloseX.addEventListener('click', closeLookup);

  if (formLookup) {
    formLookup.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = inputLookupEmail.value.trim();
      if (activeLookupTab === 'txid') {
        const txid = inputLookupTxid.value.trim();
        performLookup(email, txid);
      } else {
        const name = document.getElementById('input-lookup-name').value.trim();
        const phone = document.getElementById('input-lookup-phone').value.trim();
        performLookup(email, null, name, phone);
      }
    });
  }
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
    errors.push(t('label_contact_name').replace(' *', ''));
  }
  
  if (emailVal === "") {
    errors.push(t('label_email').replace(' *', ''));
  } else if (!elements.inputEmail.checkValidity()) {
    errors.push(t('error_email_format'));
  }
  
  if (phoneVal === "") {
    errors.push(t('label_phone').replace(' *', ''));
  }
  
  if (businessVal === "") {
    errors.push(t('label_business').replace(' *', ''));
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
        alert(t('alert_correct_fields') + "\n\n- " + validation.errors.join("\n- "));
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
      alert(t('alert_paypal_error'));
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

  // Sync with Supabase centralized database in background
  saveBookingToSupabase(booking);

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

// --- ADMIN LOGBOOK RENDERER & BOOKKEEPING HELPERS (Option A) ---
// TODO/Reminder: Migrate this to Supabase Auth (Option B) for production and remove query param key!
function renderAdminTable(searchQuery = '') {
  const tbody = document.getElementById('admin-table-body');
  const emptyState = document.getElementById('admin-table-empty-state');
  const countEl = document.getElementById('admin-stat-count');
  const revenueEl = document.getElementById('admin-stat-revenue');
  
  if (!tbody) return;

  const query = searchQuery.toLowerCase().trim();
  
  // Filter active reservations matching search term
  const bookings = Object.values(localReservations).filter(b => {
    if (!query) return true;
    return (
      (b.boothId && b.boothId.toLowerCase().includes(query)) ||
      (b.business && b.business.toLowerCase().includes(query)) ||
      (b.name && b.name.toLowerCase().includes(query)) ||
      (b.email && b.email.toLowerCase().includes(query)) ||
      (b.transactionId && b.transactionId.toLowerCase().includes(query))
    );
  });

  // Sort reservations by booth ID (numerical priority)
  bookings.sort((a, b) => {
    const aNum = parseInt(a.boothId.replace(/[^0-9]/g, '')) || 999;
    const bNum = parseInt(b.boothId.replace(/[^0-9]/g, '')) || 999;
    return aNum - bNum;
  });

  // Calculate statistics
  let totalRevenue = 0;
  bookings.forEach(b => {
    const priceStr = b.pricePaid ? b.pricePaid.replace(/[^0-9.]/g, '') : '0';
    totalRevenue += parseFloat(priceStr) || 0;
  });

  // Update Stats UI elements
  if (countEl) countEl.textContent = bookings.length;
  if (revenueEl) {
    revenueEl.textContent = `$${totalRevenue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  // Populate Table Body Rows
  tbody.innerHTML = '';
  if (bookings.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    bookings.forEach(b => {
      const tr = document.createElement('tr');
      let dispId = b.boothId;
      if (b.boothId === "1-L" || b.boothId === "1-R") dispId = "1";
      
      let payModeTranslated = b.payMode || '';
      if (b.payMode === "Deposit Payment Only") {
        payModeTranslated = t('payment_option_deposit');
      } else if (b.payMode === "Full Registration Fee") {
        payModeTranslated = t('payment_fixed_full');
      }

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--color-booth-selected);">#${dispId}</td>
        <td style="font-weight: 600; color: #ffffff;">${escapeHtml(b.business)}</td>
        <td>${escapeHtml(b.name)}</td>
        <td><a href="mailto:${escapeHtml(b.email)}" style="color: #60a5fa; text-decoration: none;">${escapeHtml(b.email)}</a></td>
        <td><a href="tel:${escapeHtml(b.phone)}" style="color: var(--text-secondary); text-decoration: none;">${escapeHtml(b.phone)}</a></td>
        <td style="font-weight: 700; color: #10b981;">${escapeHtml(b.pricePaid)}</td>
        <td style="font-size: 0.8rem; color: var(--text-secondary);">${escapeHtml(payModeTranslated)}</td>
        <td style="font-size: 0.8rem;">${escapeHtml(b.date)}</td>
        <td style="font-family: monospace; font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(b.transactionId)}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// Generate CSV string and trigger browser file download (Excel spreadsheet format)
function exportCSV() {
  const headers = ["Booth #", "Business / Vendor", "Contact Name", "Email", "Phone", "Price Paid", "Payment Mode", "Date", "Transaction ID"];
  const csvRows = [headers.join(",")];
  
  // Sort by booth ID numerically before exporting
  const sortedBookings = Object.values(localReservations).sort((a, b) => {
    const aNum = parseInt(a.boothId.replace(/[^0-9]/g, '')) || 999;
    const bNum = parseInt(b.boothId.replace(/[^0-9]/g, '')) || 999;
    return aNum - bNum;
  });

  sortedBookings.forEach(b => {
    let dispId = b.boothId;
    if (b.boothId === "1-L" || b.boothId === "1-R") dispId = "1";
    
    const row = [
      `"${dispId}"`,
      `"${(b.business || '').replace(/"/g, '""')}"`,
      `"${(b.name || '').replace(/"/g, '""')}"`,
      `"${(b.email || '').replace(/"/g, '""')}"`,
      `"${(b.phone || '').replace(/"/g, '""')}"`,
      `"${(b.pricePaid || '').replace(/"/g, '""')}"`,
      `"${(b.payMode || '').replace(/"/g, '""')}"`,
      `"${(b.date || '').replace(/"/g, '""')}"`,
      `"${(b.transactionId || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(","));
  });
  
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `hai_vendor_reservations_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- RESERVATION LOOKUP & BALANCE PAYMENT FLOW ---
async function performLookup(email, transactionId, name, phone) {
  const loading = document.getElementById('lookup-loading');
  const errorAlert = document.getElementById('lookup-error');
  const resultsDiv = document.getElementById('lookup-results');
  const successAlert = document.getElementById('lookup-success');
  const form = document.getElementById('form-lookup');

  // Reset display states
  if (loading) loading.style.display = 'block';
  if (errorAlert) errorAlert.style.display = 'none';
  if (resultsDiv) resultsDiv.style.display = 'none';
  if (successAlert) successAlert.style.display = 'none';
  if (form) form.style.display = 'none';

  try {
    let queryUrl = `${CONFIG.supabaseUrl}/rest/v1/bookings?email=ilike.${encodeURIComponent(email)}`;
    if (transactionId) {
      queryUrl += `&transaction_id=ilike.*${encodeURIComponent(transactionId)}*`;
    } else {
      queryUrl += `&contact_name=ilike.*${encodeURIComponent(name)}*&phone=ilike.*${encodeURIComponent(phone)}*`;
    }

    const response = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'apikey': CONFIG.supabaseKey,
        'Authorization': `Bearer ${CONFIG.supabaseKey}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (loading) loading.style.display = 'none';

      if (data.length === 0) {
        if (errorAlert) {
          errorAlert.textContent = t('lookup_error');
          errorAlert.style.display = 'block';
        }
        if (form) form.style.display = 'flex';
        return;
      }

      // Found active reservation entry
      const row = data[0];
      if (resultsDiv) resultsDiv.style.display = 'flex';
      displayLookupResults(row);
    } else {
      if (loading) loading.style.display = 'none';
      if (errorAlert) {
        errorAlert.textContent = `❌ Database query failed: ${response.statusText}`;
        errorAlert.style.display = 'block';
      }
      if (form) form.style.display = 'flex';
    }
  } catch (err) {
    if (loading) loading.style.display = 'none';
    
    // Offline lookup fallback from local cache
    let foundRow = null;
    const bookingsList = Object.values(localReservations);
    if (transactionId) {
      foundRow = bookingsList.find(b => 
        b.email.toLowerCase() === email.toLowerCase() && 
        b.transactionId.toLowerCase().includes(transactionId.toLowerCase())
      );
    } else {
      foundRow = bookingsList.find(b => 
        b.email.toLowerCase() === email.toLowerCase() && 
        b.name.toLowerCase().includes(name.toLowerCase()) && 
        b.phone.toLowerCase().includes(phone.toLowerCase())
      );
    }

    if (foundRow) {
      const mockRow = {
        booth_id: foundRow.boothId,
        booth_category: foundRow.boothCategory,
        booth_dimensions: foundRow.boothDimensions,
        contact_name: foundRow.name,
        business_name: foundRow.business,
        email: foundRow.email,
        phone: foundRow.phone,
        price_paid: foundRow.pricePaid,
        payment_mode: foundRow.payMode,
        transaction_id: foundRow.transactionId
      };
      
      if (resultsDiv) resultsDiv.style.display = 'flex';
      displayLookupResults(mockRow);
    } else {
      if (errorAlert) {
        errorAlert.textContent = t('lookup_error');
        errorAlert.style.display = 'block';
      }
      if (form) form.style.display = 'flex';
    }
    console.error("Supabase lookup failed: ", err);
  }
}

function displayLookupResults(row) {
  const balanceSection = document.getElementById('lookup-balance-due-section');
  const statusBadge = document.getElementById('lookup-res-status');

  // Map row parameters to lookup results UI
  document.getElementById('lookup-res-business').textContent = row.business_name || '--';
  document.getElementById('lookup-res-name').textContent = row.contact_name || '--';
  
  let dispId = row.booth_id;
  if (row.booth_id === "1-L" || row.booth_id === "1-R") dispId = "1";
  document.getElementById('lookup-res-booth').textContent = `#${dispId}`;
  
  let catTextTranslated = row.booth_category || '--';
  const catKeys = ['General', 'Food', 'Boba', 'Fruits', 'Info', 'Reserved'];
  for (const key of catKeys) {
    if (catTextTranslated === CONFIG.categories[key].name) {
      catTextTranslated = t(`cat_${key.toLowerCase()}`);
      break;
    }
  }
  document.getElementById('lookup-res-category').textContent = catTextTranslated;
  document.getElementById('lookup-res-paid').textContent = row.price_paid || '--';

  // Check reservation payment status
  if (row.payment_mode === "Full Registration Fee") {
    statusBadge.textContent = t('lookup_status_paid');
    statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
    statusBadge.style.color = "#10b981";
    if (balanceSection) balanceSection.style.display = 'none';
  } else {
    // Balance due details lookup & calculation
    const booth = CONFIG.booths.find(b => b.id === row.booth_id);
    const catMeta = booth ? CONFIG.categories[booth.category] : null;
    const fullPrice = catMeta ? catMeta.fullPrice : 0;
    const paidAmount = parseFloat(row.price_paid.replace('$', '')) || 0;
    const balanceDue = Math.max(0, fullPrice - paidAmount);

    statusBadge.textContent = t('lookup_status_deposit');
    statusBadge.style.background = "rgba(245, 158, 11, 0.15)";
    statusBadge.style.color = "#f59e0b";

    if (balanceDue > 0) {
      document.getElementById('lookup-balance-amount').textContent = `$${balanceDue}`;
      if (balanceSection) balanceSection.style.display = 'flex';

      // Render PayPal button for remaining balance amount
      renderPayPalBalanceButton(row, balanceDue);

      // TEMP: Test bypass button (Remove before production release)
      const btnBypass = document.getElementById('btn-bypass-balance');
      if (btnBypass) {
        // Recreate node to remove prior event listeners cleanly
        const newBtnBypass = btnBypass.cloneNode(true);
        btnBypass.parentNode.replaceChild(newBtnBypass, btnBypass);
        newBtnBypass.addEventListener('click', () => {
          const mockTxId = `MOCK-BAL-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
          completeBalancePayment(row, balanceDue, mockTxId);
        });
      }
    } else {
      if (balanceSection) balanceSection.style.display = 'none';
    }
  }
}

// Render official PayPal SDK buttons for balance checkout inside lookup modal
function renderPayPalBalanceButton(row, balanceDue) {
  const container = document.getElementById('paypal-balance-button-container');
  if (!container) return;
  container.innerHTML = ''; // Reset container

  if (typeof paypal === 'undefined') {
    container.innerHTML = "<p style='color: var(--color-warning); font-size: 0.85rem;'>PayPal SDK failed to load. Please use Skip Payment (Test Mode).</p>";
    return;
  }

  paypal.Buttons({
    style: {
      layout: 'vertical',
      color:  'gold',
      shape:  'rect',
      label:  'paypal'
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: balanceDue.toString(),
            currency_code: 'USD'
          },
          description: `Remaining Balance for Booth #${row.booth_id} (${row.booth_category})`
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        completeBalancePayment(row, balanceDue, details.id);
      });
    },
    onError: function(err) {
      console.error("PayPal balance capture error: ", err);
      alert(t('alert_paypal_error_balance'));
    }
  }).render('#paypal-balance-button-container');
}

// Complete balance updates and patch Supabase database record
async function completeBalancePayment(row, balanceDue, balanceTxId) {
  const resultsDiv = document.getElementById('lookup-results');
  const successAlert = document.getElementById('lookup-success');
  const loading = document.getElementById('lookup-loading');

  if (resultsDiv) resultsDiv.style.display = 'none';
  if (loading) {
    loading.style.display = 'block';
    const textEl = loading.querySelector('p');
    if (textEl) textEl.textContent = "Processing balance payment & syncing database...";
  }

  // Calculate new total price paid values
  const booth = CONFIG.booths.find(b => b.id === row.booth_id);
  const catMeta = booth ? CONFIG.categories[booth.category] : null;
  const fullPrice = catMeta ? catMeta.fullPrice : 0;
  
  const updatedPricePaid = `$${fullPrice}`;
  const updatedPayMode = "Full Registration Fee";
  const updatedTxId = `${row.transaction_id} / ${balanceTxId}`;

  // Patch database via REST api
  try {
    const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/bookings?booth_id=eq.${encodeURIComponent(row.booth_id)}`, {
      method: 'PATCH',
      headers: {
        'apikey': CONFIG.supabaseKey,
        'Authorization': `Bearer ${CONFIG.supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        price_paid: updatedPricePaid,
        payment_mode: updatedPayMode,
        transaction_id: updatedTxId
      })
    });

    if (!response.ok) {
      console.warn("Supabase PATCH failed: ", response.statusText);
    } else {
      console.log("Supabase booking updated to Fully Paid.");
    }
  } catch (err) {
    console.error("Failed to patch Supabase database: ", err);
  }

  // Sync with client state and localStorage
  localReservations[row.booth_id] = {
    boothId: row.booth_id,
    boothCategory: row.booth_category,
    boothDimensions: row.booth_dimensions,
    name: row.contact_name,
    email: row.email,
    phone: row.phone,
    business: row.business_name,
    pricePaid: updatedPricePaid,
    payMode: updatedPayMode,
    transactionId: updatedTxId,
    date: new Date().toLocaleString()
  };
  localStorage.setItem('hai_booth_bookings', JSON.stringify(localReservations));

  // Redraw map with updated status
  renderMap();

  if (loading) loading.style.display = 'none';
  if (successAlert) successAlert.style.display = 'block';

  // Async load fresh database sync
  loadReservations();
}

// Standard security helper to escape HTML inputs and protect against XSS injection
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

Object.defineProperty(window, 'currentLang', {
  get: () => currentLang,
  set: (val) => { setLanguage(val); },
  configurable: true,
  enumerable: true
});

window.switchLookupTab = switchLookupTab;

Object.defineProperty(window, 'activeLookupTab', {
  get: () => activeLookupTab,
  set: (val) => { switchLookupTab(val); },
  configurable: true,
  enumerable: true
});


