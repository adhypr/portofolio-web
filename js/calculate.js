// Subnetting Calculator Logic

/**
 * Validates if the given string is a valid IPv4 address
 */
function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

/**
 * Converts IP string to 32-bit integer
 */
function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

/**
 * Converts 32-bit integer to IP string
 */
function intToIp(int) {
    return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255
    ].join('.');
}

/**
 * Calculates Subnet details
 */
function calculateSubnet(ipStr, prefix) {
    prefix = parseInt(prefix, 10);
    
    // Create the subnet mask as 32-bit int
    // Example: prefix 24 => 11111111 11111111 11111111 00000000
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const ipInt = ipToInt(ipStr);
    
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt)) >>> 0;
    
    let firstHostInt = networkInt + 1;
    let lastHostInt = broadcastInt - 1;
    let totalUsable = broadcastInt - networkInt - 1;

    // Handle edge cases like /32 and /31
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

// UI Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
    const calcForm = document.getElementById('subnet-form');
    if (!calcForm) return;

    const ipInput = document.getElementById('ip-address');
    const prefixInput = document.getElementById('prefix');
    const resultBox = document.getElementById('calc-result');
    
    // Result elements
    const resIp = document.getElementById('res-ip');
    const resMask = document.getElementById('res-mask');
    const resNet = document.getElementById('res-network');
    const resBc = document.getElementById('res-broadcast');
    const resRange = document.getElementById('res-range');
    const resHosts = document.getElementById('res-hosts');
    
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
        
        // Process calculation
        const result = calculateSubnet(ip, prefix);
        
        // Show Results
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
        
        // Animate appearance
        resultBox.classList.remove('hidden');
        resultBox.classList.add('fade-in-up');
    });
});
