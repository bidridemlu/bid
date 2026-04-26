// main.js
const initFloatingWarRoom = () => {
    // Remove se já existir (para evitar duplicatas no F5)
    if (document.getElementById('tw-ai-window')) document.getElementById('tw-ai-window').remove();

    // Criar a Janela
    const win = document.createElement('div');
    win.id = 'tw-ai-window';
    win.innerHTML = `
        <div id="tw-ai-header">
            <span>WAR ROOM AI</span>
            <button onclick="document.getElementById('tw-ai-window').style.display='none'">X</button>
        </div>
        <div class="tw-ai-content">
            <button class="btn-tool" onclick="activatePlanner()">ATTACK PLANNER</button>
            <button class="btn-tool" onclick="analyzeMap()">ANALISAR MAPA (IA)</button>
            <div id="ai-log">> Sistema pronto...</div>
        </div>
    `;
    document.body.appendChild(win);

    // Tornar a janela arrastável
    dragElement(document.getElementById("tw-ai-window"));
};

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "header");
    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.top || elmnt.offsetTop) - pos2 + "px";
        elmnt.style.left = (elmnt.left || elmnt.offsetLeft) - pos1 + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Funções de Teste
window.activatePlanner = () => alert("Selecione o alvo no mapa...");
window.analyzeMap = () => console.log("IA analisando...");

window.addEventListener('load', initFloatingWarRoom);
// Executa também imediatamente caso o load já tenha passado
if (document.readyState === 'complete') initFloatingWarRoom();
