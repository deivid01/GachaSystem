// Test script para validar backend IGDB
async function test() {
    console.log('[TEST] Enviando requisição para /api/igdb/games...');
    try {
        const response = await fetch('http://localhost:3001/api/igdb/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: 'Zelda' }),
        });

        console.log(`[TEST] Status: ${response.status}`);
        const data = await response.json();

        if (response.ok) {
            console.log(`[TEST] ✓ Sucesso! ${data.length} jogos encontrados.`);
            console.log('[TEST] Primeiros resultados:');
            data.slice(0, 2).forEach((g, i) => {
                console.log(`  ${i + 1}. ${g.name} (${g.year || 'N/A'}) - Rating: ${g.rating ? Math.round(g.rating) : 'N/A'}`);
            });
        } else {
            console.error(`[TEST] ✗ Erro: ${data.error}`);
            console.error(`[TEST] Detalhe: ${data.detail}`);
        }
    } catch (e) {
        console.error(`[TEST] ✗ Erro de conexão: ${e.message}`);
    }
}

test();
