// Test backend IGDB direto
import fetch from 'node-fetch';

async function test() {
    console.log('[TEST] Testando POST /api/igdb/games');
    try {
        const res = await fetch('http://localhost:3001/api/igdb/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: 'Zelda' }),
        });

        console.log(`Status: ${res.status}`);
        const data = await res.json();

        if (res.ok) {
            console.log(`✓ Sucesso! ${data.length || data.count} jogos`);
            if (Array.isArray(data) && data.length > 0) {
                console.log(`Primeiro: ${data[0].name}`);
            }
        } else {
            console.error(`✗ Erro: ${JSON.stringify(data)}`);
        }
    } catch (e) {
        console.error(`✗ Erro: ${e.message}`);
    }
    process.exit(0);
}

test();
