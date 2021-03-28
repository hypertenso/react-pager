const request = (options) => {

    if (!options.headers) {
        options['headers'] = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
    }

    return new Promise((resolve, reject) => {
        fetch(options.url, options)
            .then(response => {
                resolve(response.json());
            })
            .catch(error => {
                reject(error);
            })
    });

}

export default request;