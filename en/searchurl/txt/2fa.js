/**
 * edit keys as key-values
 */
let keys = {
  "h":"JBSWY3DPEHPK3PXP",
};

function base32Decode(base32) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    const clean = base32
        .toUpperCase()
        .replace(/[=\s-]/g, '')
        .replace(/0/g, 'O')
        .replace(/1/g, 'L');

    let bits = 0;
    let value = 0;
    const bytes = [];

    for (const char of clean) {
        const idx = alphabet.indexOf(char);
        if (idx === -1) {
            throw new Error(`Invalid base32 character: "${char}"`);
        }

        value = (value << 5) | idx;
        bits += 5;

        if (bits >= 8) {
            bytes.push((value >>> (bits - 8)) & 0xFF);
            bits -= 8;
        }
    }

    return new Uint8Array(bytes);
}

/**
 * Generate a TOTP code (RFC 6238) — SHA-1, 6 digits, 30s step.
 * Returns a Promise resolving to { code, remaining }.
 */
async function generateTotp(base32Secret) {
    const TIME_STEP = 30;

    const keyBytes = base32Decode(base32Secret);

    // Import key for HMAC-SHA1
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'HMAC', hash: 'SHA-1' },
        false,
        ['sign']
    );

    // Current time step as an 8-byte big-endian counter
    const counter = Math.floor(Date.now() / 1000 / TIME_STEP);
    const counterBuf = new Uint8Array(8);
    const counterBig = BigInt(counter);
    for (let i = 7; i >= 0; i--) {
        counterBuf[i] = Number((counterBig >> BigInt(8 * (7 - i))) & 0xFFn);
    }

    // HMAC-SHA1
    const hmac = new Uint8Array(
        await crypto.subtle.sign('HMAC', cryptoKey, counterBuf)
    );

    // Dynamic truncation (RFC 4226, section 5.4)
    const offset = hmac[hmac.length - 1] & 0x0F;
    const code = (
        ((hmac[offset] & 0x7F) << 24) |
        (hmac[offset + 1] << 16) |
        (hmac[offset + 2] << 8) |
        hmac[offset + 3]
    ) % 1000000;

    // Seconds remaining before the code expires
    const remaining = TIME_STEP - Math.floor(Date.now() / 1000) % TIME_STEP;

    return {
        code: String(code).padStart(6, '0'),
        remaining
    };
}

let args=arguments[1];
let iS1 = args.search(/ [^ ]/);
let name = args.substring(iS1+1);
let base32 = keys[name] || Object.values(keys)[0];

generateTotp(base32).then(({ code, remaining }) => {
    alert(`${code} valid for ${remaining}s`);
});
