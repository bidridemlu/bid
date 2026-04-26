// main.js - Versão General de Guerra com IA
(function() {
    const API_KEY = "AIzaSyBYugdEf0BKgEzD9thwskNK5-0XPZyuuNs";
    let existing = document.getElementById('tw-ai-window');
    if (existing) {
        existing.style.display = (existing.style.display === 'none') ? 'block' : 'none';
        return;
    }

    // Criar a Janela
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
            <div class="menu-grid">
                <button class="btn-tool" onclick="startPlanner()">📍 ATTACK PLANNER</button>
                <button class="btn-tool" onclick="startDefense()">🛡️ AUTO-SNIPE</button>
                <button class="btn-tool" onclick="askIA()">🤖 ANALISAR COM GEMINI</button>
            </div>
            <div id="ai-log">> Aguardando ordens, General...</div>
            <div id="coords-list" style="font-size:10px; color:#aaa; margin-top:5px;"></div>
        </div>
    `;
    document.body.appendChild(win);

    // Variáveis de Estado
    let selectedCoords = [];

    // Função para Capturar Coordenadas do TWReplay
    window.startPlanner = () => {
        log("Modo Planner: Clique nas aldeias do mapa.");
        document.onclick = function(e) {
            // Tenta pegar a coordenada se o TWReplay mostrar no título ou elemento
            const target = e.target;
            log("Alvo selecionado: " + (target.title || "Aldeia Desconhecida"));
            if(target.title) {
                selectedCoords.push(target.title);
                updateCoordsDisplay();
            }
        };
    };

    function updateCoordsDisplay() {
        document.getElementById('coords-list').innerText = "Alvos: " + selectedCoords.join(" | ");
    }

    function log(msg) {
        document.getElementById('ai-log').innerText = "> " + msg;
    }

    // INTEGRAÇÃO COM A IA (GEMINI 1.5 PRO)
    window.askIA = async () => {
        if (selectedCoords.length === 0) {
            log("Erro: Selecione alvos no mapa primeiro.");
            return;
        }

        log("IA pensando na melhor estratégia...");

        const prompt = `Como general de Tribal Wars, analise estas coordenadas de alvos: ${selectedCoords.join(", ")}. 
        Crie um plano de ataque coordenado simulando tempos de viagem de Nobres e Arietes. 
        Seja tático e breve.`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const aiText = data.candidates[0].content.parts[0].text;
            alert("ESTRATÉGIA DA IA:\n\n" + aiText);
            log("Análise concluída.");
        } catch (error) {
            log("Erro na conexão com Gemini.");
            console.error(error);
        }
    };

    // Função de Arrastar Janela
    const header = document.getElementById("tw-ai-header");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";
        };
    };
})();
