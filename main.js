// main.js
function initFloatingWarRoom() {
    let existing = document.getElementById('tw-ai-window');
    if (existing) {
        existing.style.display = (existing.style.display === 'none') ? 'block' : 'none';
        return;
    }

    const win = document.createElement('div');
    win.id = 'tw-ai-window';
    win.innerHTML = `
        <div id="tw-ai-header">
            <span>WAR ROOM AI</span>
            <button onclick="this.closest('#tw-ai-window').style.display='none'">X</button>
        </div>
        <div class="tw-ai-content">
            <button class="btn-tool" onclick="activatePlanner()">ATTACK PLANNER</button>
            <button class="btn-tool" onclick="analyzeMap()">ANALISAR MAPA (IA)</button>
            <div id="ai-log">> Sistema bid iniciado...</div>
        </div>
    `;
    document.body.appendChild(win);
    dragElement(win);
}

// Mantenha a função dragElement e as outras abaixo...
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById("tw-ai-header");
    header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
    };
}

window.activatePlanner = () => { document.getElementById('ai-log').innerHTML = "> Planner: Clique no mapa"; };
window.analyzeMap = () => { document.getElementById('ai-log').innerHTML = "> IA: Lendo dados do TWReplay"; };

initFloatingWarRoom();
