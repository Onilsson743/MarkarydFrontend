const api : string = process.env.NEXT_PUBLIC_WEB_API_CONNECTION_STRING!


export const ValidateKey = async (key: string) => {
    return await fetch(`${api}/Auth/ValidateKey?key=${key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}

export const GenerateNewKey = async () => {
    return await fetch(`${api}/Auth/GenerateNewKey`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}