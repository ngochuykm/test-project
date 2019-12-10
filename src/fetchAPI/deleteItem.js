export default function callApi(payload) {
    console.log("payload o fetch", payload.deleteID)
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/items/'+ payload;
        fetch(url, {
            method: 'DELETE'
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