/*
 * submitOrder.js
 * Versione neutra: il salvataggio viene gestito dal modulo locale order-uploader.html
 */

async function submitOrder(orderData) {
    console.warn("submitOrder() sta usando la versione neutra.");
    console.warn("Se order-uploader.html è attivo, questa funzione verrà sovrascritta.");

    // Torna comunque true per non interrompere il flusso
    return true;
}

