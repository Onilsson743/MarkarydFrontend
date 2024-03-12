const api : string = process.env.NEXT_PUBLIC_WEB_API_CONNECTION_STRING!


export const AddNewIdea = async (idea: string) => {
    return await fetch(`${api}/Idea/AddNewIdea?idea=${idea}`, {
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

export const GetAllIdeas = async () => {
    return await fetch(`${api}/Idea/GetAllIdeas`, {
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

export const DeleteOneIdea = async (id: string) => {
    return await fetch(`${api}/Idea/DeleteOneIdea?id=${id}`, {
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
