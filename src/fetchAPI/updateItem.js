export default function callApi(payload) {
    console.log("payload o fetch", payload.updateId)
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/items/'+ payload.updateId;
        fetch(url, {
            method: 'PUT',
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({ name: payload.updateName})
        })

            .then((response) => response.json())
            .then((res) => {
                resolve(res);
                console.log(res);
            })
            .catch((error) => {
                reject(error);
            });
    })
}