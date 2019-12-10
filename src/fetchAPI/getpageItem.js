export default function callApi(payload) {
    return new Promise((resolve,reject) => {
        const url = 'http://localhost:3001/items/' + '?_page='+payload.pageIndex+'&_limit='+payload.limit+(payload.isSearching && "&q="+payload.searchData);
        fetch(url,{
            method: 'GET'
        })
    
    .then((response) => response.json())
    .then((res) => {
        resolve(res);     
    })
    .catch((error) => {
        reject(error);
    });
})
}