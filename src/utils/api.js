 const getData = (url) => {
     return fetch(url)
     .then(resp => {
         if (!resp.ok) {
             throw Error("there was a problem")
         }
         return resp.json()
     })

}


export default getData