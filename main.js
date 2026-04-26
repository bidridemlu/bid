// main.js
const initWarRoom = () => {
    // Cria a barra lateral com estética Premium
    const sidebar = document.createElement('div');
    sidebar.id = 'tw-ai-sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <h2>WAR ROOM AI</h2>
            <span class="status-online">SISTEMA ATIVO</span>
        </div>
        
        <div class="tool-section">
            <button class="btn-tool" onclick="activatePlanner()">ATTACK PLANNER</button>
            <button class="btn-tool" onclick="analyzeMap()">ANALISAR COM IA</button>
        </div>

        <div id="ai-log">
            <p>> Aguardando coordenadas...</p>
        </div>
    `;
    document.body.appendChild(sidebar);

    // Ajusta o layout do TWReplay para caber a barra
    document.body.style.marginLeft = "300px";
    document.body.style.transition = "0.5s";
};

// Funções de exemplo
window.activatePlanner = () => {
    alert("Attack Planner Ativado. Clique nas aldeias no mapa.");
};

window.analyzeMap = () => {
    console.log("Capturando dados do canvas para IA...");
    // Aqui entrará a conexão com o Google AI Studio
};

initWarRoom();