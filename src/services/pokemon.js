import request from './request';

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function fetch(limit, offset) {

    // TODO: Melhorar forma de receber os parâmetros
    return request({
        url: `${baseUrl}/?limit=${limit}&offset=${offset}`,
        method: 'GET'
    });
}

export {
    fetch
}