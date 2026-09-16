/**
 * Project Detail Modal Handler
 * Controls opening and closing the project detail overlay layer
 */
document.addEventListener('DOMContentLoaded', () => {
    // Project Data Store
    const projectData = {
        '1': {
            title: 'Aplikasi Kasir Apotek Samara',
            category: 'Desktop Development / Academic Final Project',
            image: '../assets/images/project-apotek.jpg',
            imageAlt: 'Aplikasi Kasir Apotek Samara',
            tags: [
                { name: 'Java', color: 'bg-primary/20 text-primary' },
                { name: 'OOP', color: 'bg-primary/20 text-primary' },
                { name: 'Desktop GUI', color: 'bg-indigo-500/20 text-indigo-300' }
            ],
            description: 'Aplikasi Kasir Apotek Samara adalah sistem desktop yang dikembangkan secara komprehensif sebagai tugas akhir mata kuliah Object-Oriented Programming (OOP) menggunakan bahasa Java dan NetBeans IDE. Sistem ini dirancang untuk mempermudah dan mempercepat seluruh alur transaksi di apotek, mulai dari katalog obat, manajemen stok, pencatatan resep dokter, hingga proses kalkulasi transaksi kasir dan pencetakan bukti pembayaran secara terstruktur.',
            features: [
                'Katalog & Manajemen Stok Obat: Pencatatan inventaris obat terperinci, kategori sediaan (tablet, sirup, salep), serta pemantauan stok menipis dan tanggal kedaluwarsa.',
                'Kalkulasi Transaksi Kasir Cepat: Perhitungan otomatis harga total, pajak/diskon, dan nominal kembalian pelanggan tanpa risiko kesalahan hitung.',
                'Pencatatan Resep Dokter: Formulir khusus untuk mendokumentasikan data pasien, dokter perujuk, serta instruksi dosis obat racikan.',
                'Rekapitulasi Riwayat Transaksi: Pencatatan riwayat transaksi penjualan harian yang terstruktur untuk mempermudah pembukuan dan laporan keuangan.'
            ],
            techStack: ['Java SE', 'Java Swing / GUI', 'NetBeans IDE', 'OOP Architecture', 'MySQL / Local DB']
        },
        '2': {
            title: 'Loadbalancer Network',
            category: 'Networking Utility / System Engineering',
            image: '../assets/images/project-loadbalancer.jpg',
            imageAlt: 'Loadbalancer Network Application',
            tags: [
                { name: 'Go', color: 'bg-secondary/20 text-secondary' },
                { name: 'JavaScript', color: 'bg-secondary/20 text-secondary' },
                { name: 'Network Sockets', color: 'bg-purple-500/20 text-purple-300' }
            ],
            description: 'Aplikasi utilitas jaringan desktop berbasis Go (Golang) dan antarmuka web modern yang mampu menggabungkan (network bonding/load balancing) dua buah koneksi internet aktif secara simultan pada sistem operasi Windows dan Ubuntu Linux. Solusi ini menghadirkan throughput bandwidth yang lebih optimal serta keandalan konektivitas tinggi berkat mekanisme failover otomatis.',
            features: [
                'Dual-WAN Multi-Interface Balancing: Menggabungkan lalu lintas data dari dua interface jaringan aktif (misal: Wi-Fi + LAN) untuk memaksimalkan kecepatan transfer.',
                'Sistem Automatic Failover: Deteksi status link secara real-time yang langsung mengalihkan traffic saat salah satu koneksi terputus tanpa memutus sesi pengguna.',
                'Algoritma Distribusi Beban Dinamis: Penggunaan algoritma Round Robin dan Least Connection untuk membagi koneksi browsing dan unduhan secara efisien.',
                'Monitoring Real-Time: Visualisasi status traffic jaringan, latensi ping server, dan statistik packet transfer per-interface secara akurat.'
            ],
            techStack: ['Go (Golang)', 'Socket Programming', 'Network Routing', 'Ubuntu Linux', 'Windows OS', 'JavaScript', 'Tailwind CSS']
        },
        '3': {
            title: 'Dokumen & Data',
            category: 'Data Management & Document Processing',
            image: '../assets/images/project-data.jpg',
            imageAlt: 'Dokumen & Data Processing',
            tags: [
                { name: 'Microsoft Office', color: 'bg-primary/20 text-primary' },
                { name: 'Data Processing', color: 'bg-indigo-500/20 text-indigo-300' },
                { name: 'Analytics', color: 'bg-secondary/20 text-secondary' }
            ],
            description: 'Proyek pengolahan data terstruktur, analisis spreadsheet tingkat lanjut, serta standardisasi format dokumen dan presentasi eksekutif untuk kebutuhan akademik, riset, maupun operasional bisnis. Menitikberatkan pada akurasi komputasi data matematis, otomatisasi formula kompleks, dan tata letak naskah laporan yang rapi serta mudah dipahami.',
            features: [
                'Otomatisasi Rumus & Spreadsheet: Pemanfaatan formula lanjutan seperti VLOOKUP, INDEX/MATCH, Pivot Table, dan Dynamic Charts untuk pengolahan dataset besar.',
                'Standardisasi Naskah Dokumen: Penyusunan laporan format baku akademik dan instansi bisnis di Microsoft Word dengan hierarki dokumen yang sistematis.',
                'Desain Presentasi Interaktif: Pembuatan slide presentasi profesional di Microsoft PowerPoint dengan infografis visual komunikatif.',
                'Validasi & Rekapitulasi Data: Pembersihan data duplikat, verifikasi konsistensi entri, serta kompilasi laporan operasional siap pakai.'
            ],
            techStack: ['Microsoft Excel (Advanced Formulas)', 'Microsoft Word (Technical Formatting)', 'Microsoft PowerPoint', 'Data Visualization', 'Pivot & Summary Analytics']
        }
    };

    // Modal DOM Elements
    const modal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const modalCard = document.getElementById('project-modal-card');
    const closeModalBtn = document.getElementById('close-project-modal-btn');
    const closeModalBottomBtn = document.getElementById('close-modal-bottom-btn');

    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTags = document.getElementById('modal-tags');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalFeatures = document.getElementById('modal-features');
    const modalTech = document.getElementById('modal-tech');

    if (!modal) return;

    // Open Modal Function
    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        // Populate content
        modalImg.src = data.image;
        modalImg.alt = data.imageAlt;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        // Populate tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = `px-2.5 py-1 text-xs font-medium rounded-md ${tag.color}`;
            span.textContent = tag.name;
            modalTags.appendChild(span);
        });

        // Populate features
        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed';
            li.innerHTML = `
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>${feat}</span>
            `;
            modalFeatures.appendChild(li);
        });

        // Populate tech stack
        modalTech.innerHTML = '';
        data.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        // Show modal with animation
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalCard.classList.remove('scale-95');
            modalCard.classList.add('scale-100');
        });
    };

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalCard.classList.remove('scale-100');
        modalCard.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    // Attach Event Listeners to Detail Buttons
    const detailButtons = document.querySelectorAll('.open-detail-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close on Button Click
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeModal);

    // Close on Backdrop Click
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
