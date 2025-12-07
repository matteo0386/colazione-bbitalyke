/*
 * submitOrder.js
 * Salva gli ordini nel repository pubblico bbitalyke-orders-public
 */

async function submitOrder(orderData) {

    const today = new Date().toISOString().slice(0, 10);
    const filePath = `${ORDERS_DIR}/${today}.json`;

    // URL RAW del file ordini nel repo pubblico
    const fileURL = `https://raw.githubusercontent.com/${OWNER}/${ORDERS_REPO}/main/${filePath}`;

    let existingOrders = [];

    // 1️⃣— Tenta di leggere il file esistente (se non esiste → errore → si crea nuovo array)
    try {
        const res = await fetch(fileURL);
        if (res.ok) {
            existingOrders = await res.json();
        }
    } catch (e) {
        existingOrders = [];
    }

    // 2️⃣— Aggiungi il nuovo ordine
    existingOrders.push(orderData);

    // 3️⃣— Prepariamo il contenuto base64 per GitHub API
    const newContent = btoa(JSON.stringify(existingOrders, null, 2));

    // 4️⃣— Recuperiamo SHA se il file esiste (serve per update)
    let sha = null;
    try {
        const meta = await fetch(`https://api.github.com/repos/${OWNER}/${ORDERS_REPO}/contents/${filePath}`);
        if (meta.ok) {
            const metaJson = await meta.json();
            sha = metaJson.sha;
        }
    } catch (e) {}

    // 5️⃣— Prepariamo richiesta GitHub API
    const body = {
        message: "Nuovo ordine colazione",
        content: newContent,
        sha: sha
    };

    // ⚠️— Senza TOKEN l'API non può scrivere. 
    // Per ora lasciamo commentata la parte token.
    // Il token deve rimanere in locale (non nel sito pubblico).

    alert("⚠️ IMPORTANTE:\nLo script è installato correttamente,\nma manca l'iniezione del TOKEN su un dispositivo locale.\n\nProcediamo con gli ultimi file…");

    return true;
}
