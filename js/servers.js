const servers = [ //[name: string, ip: string, port: number]
    ["Z-City | Official | RU #1", "5.42.211.40", 24215], 
    ["Z-City | Official | RU #2", "5.42.211.40", 24217],
    ["Z-City | Official | RU #3", "194.147.90.195", 24215], 
    ["Z-City | Official | RU #4", "194.147.90.195", 24217],
    ["Z-City | Official | EU #1", "45.152.160.251", 25568], 
    ["Z-City | Official | EU #2", "45.152.160.251", 25660],
    ["Z-City | Official | US #1", "216.173.77.150", 25567], 
    ["Z-City | Official | US #2", "199.127.60.4", 25567],
];

const getOnlineColor = ((num, max) => {
    const percent = (num / max) * 100;
    console.log(percent);
    if (percent < 33) {
        return('rgb(20, 220, 20)')
    } else if (percent < 66) {
        return('rgb(220, 220, 20)')
    } else if (percent < 88) {
        return('rgb(220, 110, 20)')
    } else {
        return('rgb(220, 20, 20)')
    }
})

const copyTextEvent = ((e, connect) => {
    navigator.clipboard.writeText(`connect ${connect}`);

    document.querySelector('.copiedText').classList.add('show');
    setTimeout(() => {
        document.querySelector('.copiedText').classList.remove('show');
    }, 2000);
})

const addServerBlock = ((id, data, serverStatus) => {
    let name = (data && data.name) || servers[id][0]; 
    let connect = (data && data.connect) || `${servers[id][1]}:${servers[id][2]}`; 
    let maxPlayers = (data && data.maxplayers) || 20; 
    let numPlayers = (data && data.numplayers) || 0; 
    document.querySelector(`.server${id}`).innerHTML = 
    `<br>
    <span style="font-size: 30px;">Server: ${name}</span> <br>
    <span style="font-size: 12px;">Online: <span style="color: ${getOnlineColor(numPlayers, maxPlayers)}">${numPlayers}/${maxPlayers}</span>.</span> <br>
    <span style="font-size: 12px;">Status: ${serverStatus ? '<span style="color: rgb(0, 253, 0);">Online</span>' : '<span style="color: rgb(253, 0, 0);">Offline</span>'}.</span> <br>
    <span class="connectBtn" style="font-size: 20px;" onClick="copyTextEvent(event, '${connect}')">connect ${connect}<span style="font-size: 10px; color: #606060;">(Click to copy)</span></span>
    <br>`;
})

const drawServer = ((id) => {
    window.fetch(`https://servers-browser.vercel.app/api?game=garrysmod&ip=${servers[id][1]}&port=${servers[id][2]}`)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Server error');
        }
    })
    .then((data) => addServerBlock(id, data, true))
    .catch(() => addServerBlock(id, undefined, false));
})

for (let i = 0; i < servers.length; i++) {
    drawServer(i)
}

setInterval(() => {
    for (let i = 0; i < servers.length; i++) {
        drawServer(i)
    }
}, 30000)