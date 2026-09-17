document.addEventListener('DOMContentLoaded', () => {
    // Project Data Store
    const projectData = {
        '1': {
            title: 'Aplikasi Kasir Apotek Samara',
            image: '../assets/images/project-apotek.jpg',
            imageAlt: 'Aplikasi Kasir Apotek Samara',
            tags: [
                { name: 'Desktop', color: 'bg-primary/20 text-primary' },
                { name: 'Java OOP', color: 'bg-indigo-500/20 text-indigo-300' }
            ],
            description: 'Aplikasi Kasir Apotek Samara adalah sistem desktop yang dikembangkan sebagai tugas akhir mata kuliah Object-Oriented Programming (OOP) menggunakan bahasa Java dan NetBeans IDE. Sistem ini dirancang untuk mempermudah dan mempercepat seluruh alur transaksi di apotek, mulai dari katalog obat, manajemen stok, hingga proses kalkulasi transaksi kasir dan pencetakan bukti pembayaran secara terstruktur.',
            features: [
                'Katalog & Manajemen Stok Obat: Pencatatan inventaris obat terperinci, kategori sediaan (tablet, sirup, salep), serta pemantauan stok menipis dan tanggal kedaluwarsa.',
                'Kalkulasi Transaksi Kasir Cepat: Perhitungan otomatis harga total, pajak/diskon, dan nominal kembalian pelanggan tanpa risiko kesalahan hitung.',
                'Manajemen Role Admin, Petugas dan Apoteker guna memastikan keamanan data dan akses yang terstruktur.',
                'Rekapitulasi Riwayat Transaksi: Pencatatan riwayat transaksi penjualan harian yang terstruktur untuk mempermudah pembukuan dan laporan keuangan.'
            ],
            techStack: ['Java SE', 'Java Swing / GUI', 'NetBeans IDE', 'OOP Architecture', 'MySQL / Local DB']
        },
        '2': {
            title: 'Loadbalancer Network',
            image: '../assets/images/project-loadbalancer.jpg',
            imageAlt: 'Loadbalancer Network Application',
            tags: [
                { name: 'Network', color: 'bg-secondary/20 text-secondary' },
                { name: 'Desktop', color: 'bg-purple-500/20 text-purple-300' }
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
            title: 'Personal Homeserver',
            image: '../assets/images/homeserver.jpg',
            imageAlt: 'Personal Homeserver',
            tags: [
                { name: 'Network', color: 'bg-primary/20 text-primary' },
                { name: 'Ubuntu', color: 'bg-primary/20 text-primary' }
            ],
            description: 'Personal Homeserver adalah server yang dibangun menggunakan laptop bekas dengan Ubuntu Server OS dan dijalankan di rumah untuk kebutuhan pribadi, seperti penyimpanan data dan manajemen jaringan lokal rumah. Server ini dikonfigurasi untuk dapat diakses dari mana saja melalui jaringan internet dengan keamanan yang terjamin.',
            features: [
                'Manajemen Jaringan: Menggunakan Tailscale untuk remote access yang aman ke jaringan lokal dari mana saja (Zero Trust Network).',
                'Pemblokiran Iklan (Ad-blocker): Implementasi Pi-hole sebagai DNS sinkhole untuk memblokir iklan dan tracker pada seluruh perangkat di rumah.',
                'Media Server: Konfigurasi Immich sebagai alternatif Google Photos yang berjalan secara lokal untuk backup foto dan video otomatis dari smartphone.',
                'Kinerja Optimal: Manajemen resource server yang efisien berjalan pada lingkungan Linux (Ubuntu).'
            ],
            techStack: ['Ubuntu Server', 'Tailscale', 'Pi-hole', 'Immich', 'Linux', 'Network Security', 'Docker']
        },
        '4': {
            title: 'Dokumen & Data',
            image: '../assets/images/project-data.jpg',
            imageAlt: 'Dokumen & Data Processing',
            tags: [
                { name: 'Office', color: 'bg-primary/20 text-primary' },
            ],
            description: 'Proyek pengolahan data terstruktur, analisis spreadsheet tingkat lanjut, serta standardisasi format dokumen dan presentasi eksekutif untuk kebutuhan akademik, riset, maupun operasional bisnis. Menitikberatkan pada akurasi komputasi data matematis, otomatisasi formula kompleks, dan tata letak naskah laporan yang rapi serta mudah dipahami.',
            features: [
                'Formatting Word Terstruktur: Penataan layout dokumen akademik (skripsi/makalah) maupun bisnis dengan standar baku — mencakup penyesuaian margin, watermark, e-sign/tanda tangan digital, hingga page numbering kompleks (romawi).',
                'Daftar Otomatis (TOC/Lists): Pembuatan Daftar Isi, Daftar Tabel, Daftar Gambar, dan Daftar Lampiran otomatis menggunakan Heading Styles & Caption yang rapi dan terorganisir.',
                'Konversi Dokumen Presisi: Layanan konversi format (PDF to Word / PDF to Excel) dengan mempertahankan tata letak asli (layout), tabel, font, dan margin tanpa berantakan.',
                'Olah Data Excel & Spreadsheet: Perapihan tabel dataset, rekapitulasi data, serta pemanfaatan rumus/formula untuk kalkulasi cepat dan akurat.',
                'Desain Slide PowerPoint: Perapihan dan visualisasi materi presentasi agar tampak modern, proporsional, dan nyaman dibaca untuk kebutuhan sidang atau meeting bisnis.'
            ],
            techStack: ['Microsoft Excel (Advanced Formulas)', 'Microsoft Word (Technical Formatting)', 'Microsoft PowerPoint', 'Data Visualization', 'Pivot & Summary Analytics']
        }
    };

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


    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        modalImg.src = data.image;
        modalImg.alt = data.imageAlt;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = `px-2.5 py-1 text-xs font-medium rounded-md ${tag.color}`;
            span.textContent = tag.name;
            modalTags.appendChild(span);
        });
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

        modalTech.innerHTML = '';
        data.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        // animasi
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalCard.classList.remove('scale-95');
            modalCard.classList.add('scale-100');
        });
    };

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

    const detailButtons = document.querySelectorAll('.open-detail-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeModal);

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
