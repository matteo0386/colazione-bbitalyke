/*
 * submitOrder-public.js
 * Invia l'ordine alla GitHub Action che lo salverà nel repo privato.
 */

async function submitOrder(orderData){

    // Carica config pubblica
    const { OWNER, REPO, ORDER_ENDPOINT } = window;

    // Preparo il payload
    const body = {
        event_type: "new_order",
        client_payload: orderData
    };

    // Invio la richiesta alla GitHub Action
    const response = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    return response.ok;
}
