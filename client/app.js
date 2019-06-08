const wsWrite = new WebSocket('ws://localhost:8080/post', ['json'])
const wsEvents = new WebSocket('ws://localhost:8080/events', ['json'])
const wsList = new WebSocket('ws://localhost:8080/list', ['json'])

wsList.onopen = () => {
    wsList.onmessage = (mes) => {
        const records = JSON.parse(mes.data);

        records.forEach(record => {
            document.querySelector(".feed").innerHTML = document.querySelector(".feed").innerHTML + (`
            <div>
                <p><strong>${record.date}</strong></p>
                <p>${record.body} - <i>${record.author}</i></p>
            </div>
            `);
        });
    };

    wsList.send(JSON.stringify({query: "list"}));
};

setTimeout(() => {
    wsWrite.onmessage = (mes) => {
        console.log(mes.data)
    }

    wsEvents.onmessage = (mes) => {
        const record = JSON.parse(mes.data);
        document.querySelector(".feed").innerHTML = document.querySelector(".feed").innerHTML + (`
        <div>
            <p><strong>${record.date}</strong></p>
            <p>${record.body} - <i>${record.author}</i></p>
        </div>
        `);
    }

    document.querySelector("#send").addEventListener('click', () => {
        const body = document.querySelector("#body").value;
        const author = document.querySelector("#author").value;
    
        wsWrite.send(JSON.stringify({message: {body, author}}));
    });

}, 1000);
