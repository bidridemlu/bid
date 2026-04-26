// main.js - VERSÃO FINAL GENERAL DE GUERRA
(function() {
    const API_KEY = "AIzaSyBYugdEf0BKgEzD9thwskNK5-0XPZyuuNs"; // <--- COLOQUE SUA CHAVE AQUI

    if (document.getElementById('tw-ai-window')) return;

    const win = document.createElement('div');
    win.id = 'tw-ai-window';
    win.style.top = "100px";
    win.style.left = "100px";
    
    win.innerHTML = `
        <div id="tw-ai-header">
            <span>GENERAL WAR ROOM AI</span>
            <button onclick="document.getElementById('tw-ai-window').style.display='none'">X</button>
        </div>
        <div class="tw-ai-content">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                <button class="btn-tool" onclick="startPlanner()">📍 SELECIONAR</button>
                <button class="btn-tool" onclick="clearCoords()">🧹 LIMPAR</button>
                <button class="btn-tool" onclick="askIA('op')">⚔️ PLANO DE OP</button>
                <button class="btn-tool" onclick="askIA('fakes')">🎭 FAKE MGR</button>
            </div>
            <div id="ai-log">> Pronto para o combate, Fabio.</div>
            <div id="coords-list" style="font-size:9px; color:#d4af37; margin-top:8px; border-top:1px solid #333; padding-top:5px; max-height:60px; overflow-y:auto;">
                Alvos: nenhum
            </div>
        </div>
    `;
    document.body.appendChild(win);

    let selectedCoords = [];

    // Captura coordenadas ao clicar no mapa do TWReplay
    window.startPlanner = () => {
        log("Modo Seleção: Clique nas aldeias.");
        document.body.onclick = (e) => {
            const el = e.target;
            // No TWReplay, as coordenadas geralmente estão no title ou texto do elemento
            const coordMatch = (el.innerText || el.title || "").match(/\d{3}\|\d{3}/);
            if (coordMatch) {
                if (!selectedCoords.includes(coordMatch[0])) {
                    selectedCoords.push(coordMatch[0]);
                    updateDisplay();
                    log("Alvo fixado: " + coordMatch[0]);
                }
            }
        };
    };

    window.clearCoords = () => {
        selectedCoords = [];
        updateDisplay();
        log("Lista de alvos limpa.");
    };

    window.askIA = async (tipo) => {
        if (selectedCoords.length === 0) return log("Selecione alvos primeiro!");
        log("IA gerando estratégia...");

        const prompts = {
            op: `Crie um plano de ataque (OP) coordenado para estes alvos: ${selectedCoords.join(", ")}. Sugira tempos de saída para Nobres.`,
            fakes: `Gere uma lista de 10 fakes variados para estes alvos: ${selectedCoords.join(", ")}, mascarando um ataque real.`
        };

        try {
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompts[tipo] }] }] })
            });
            const data = await resp.json();
            const texto = data.candidates[0].content.parts[0].text;
            
            // Abre a resposta em uma janela bonita
            alert("ESTRATÉGIA DO GENERAL AI:\n\n" + texto);
            log("Análise concluída.");
        } catch (e) { log("Erro na API."); }
    };

    function updateDisplay() {
        document.getElementById('coords-list').innerText = "Alvos: " + (selectedCoords.join(", ") || "nenhum");
    }

    function log(m) { document.getElementById('ai-log').innerText = "> " + m; }

    // Lógica de arrastar
    const header = document.getElementById("tw-ai-header");
    header.onmousedown = (e) => {
        let p1 = 0, p2 = 0, p3 = e.clientX, p4 = e.clientY;
        document.onmousemove = (ev) => {
            p1 = p3 - ev.clientX; p2 = p4 - ev.clientY;
            p3 = ev.clientX; p4 = ev.clientY;
            win.style.top = (win.offsetTop - p2) + "px";
            win.style.left = (win.offsetLeft - p1) + "px";
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
})();
