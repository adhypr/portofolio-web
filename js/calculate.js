function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function intToIp(int) {
    return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255
    ].join('.');
}

function calculateSubnet(ipStr, prefix) {
    prefix = parseInt(prefix, 10);

    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const ipInt = ipToInt(ipStr);

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt)) >>> 0;

    let firstHostInt = networkInt + 1;
    let lastHostInt = broadcastInt - 1;
    let totalUsable = broadcastInt - networkInt - 1;

    if (prefix === 32) {
        firstHostInt = networkInt;
        lastHostInt = networkInt;
        totalUsable = 1;
    } else if (prefix === 31) {
        firstHostInt = networkInt;
        lastHostInt = broadcastInt;
        totalUsable = 2;
    }

    return {
        ip: ipStr,
        prefix: prefix,
        mask: intToIp(maskInt),
        network: intToIp(networkInt),
        broadcast: intToIp(broadcastInt),
        firstHost: intToIp(firstHostInt),
        lastHost: intToIp(lastHostInt),
        totalHosts: totalUsable < 0 ? 0 : totalUsable
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const calcModal = document.getElementById('calc-modal');
    const calcModalBackdrop = document.getElementById('calc-modal-backdrop');
    const calcModalCard = document.getElementById('calc-modal-card');
    const closeCalcBtn = document.getElementById('close-calc-modal-btn');
    const openCalcBtn = document.getElementById('open-calc-btn');

    const calcForm = document.getElementById('subnet-form');
    const ipInput = document.getElementById('ip-address');
    const prefixInput = document.getElementById('prefix');
    const resultBox = document.getElementById('calc-result');

    const resIp = document.getElementById('res-ip');
    const resMask = document.getElementById('res-mask');
    const resNet = document.getElementById('res-network');
    const resBc = document.getElementById('res-broadcast');
    const resRange = document.getElementById('res-range');
    const resHosts = document.getElementById('res-hosts');

    if (openCalcBtn && calcModal) {
        openCalcBtn.addEventListener('click', (e) => {
            e.preventDefault();
            calcModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                calcModal.classList.remove('opacity-0');
                calcModal.classList.add('opacity-100');
                calcModalCard.classList.remove('scale-95');
                calcModalCard.classList.add('scale-100');
            });
        });
    }

    const closeCalcModal = () => {
        if (!calcModal) return;
        calcModal.classList.remove('opacity-100');
        calcModal.classList.add('opacity-0');
        calcModalCard.classList.remove('scale-100');
        calcModalCard.classList.add('scale-95');

        setTimeout(() => {
            calcModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    if (closeCalcBtn) closeCalcBtn.addEventListener('click', closeCalcModal);
    if (calcModalBackdrop) calcModalBackdrop.addEventListener('click', closeCalcModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && calcModal && !calcModal.classList.contains('hidden')) {
            closeCalcModal();
        }
    });

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const ip = ipInput.value.trim();
            const prefix = prefixInput.value;

            if (!isValidIP(ip)) {
                alert('Format IP Address tidak valid! (Contoh: 192.168.1.1)');
                return;
            }

            if (prefix < 0 || prefix > 32) {
                alert('Prefix harus antara 0 sampai 32!');
                return;
            }

            const result = calculateSubnet(ip, prefix);

            resIp.textContent = `${result.ip} /${result.prefix}`;
            resMask.textContent = result.mask;
            resNet.textContent = result.network;
            resBc.textContent = result.broadcast;

            if (result.prefix >= 31) {
                resRange.textContent = `${result.firstHost} - ${result.lastHost} (PTP/Host)`;
            } else {
                resRange.textContent = `${result.firstHost} - ${result.lastHost}`;
            }

            resHosts.textContent = result.totalHosts.toLocaleString('id-ID');
            resultBox.classList.remove('hidden');
            resultBox.classList.add('fade-in-up');
        });
    }
});
