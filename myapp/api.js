const API = 'http://localhost:3000/registers';

export const getRegisters = async () => {
    const res = await fetch(API);
    return await res.json();
};

export const getRegister = async (id) => {
    const res = await fetch(`${API}/${id}`);
    return await res.json();
}

export const saveRegister = async (newRegister) => {
    const res = await fetch(API, { 
        method: 'POST', 
        headers: {Accept: 'application/json', "Content-Type": 'application/json'},
        body: JSON.stringify(newRegister)
    });
    return await res.json();
};

export const deleteRegister = async id => {
    await fetch(`${API}/${id}`, {
        method: "DELETE",
    });
};

export const updateRegister = async (id, newRegister) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', "Content-Type": 'application/json'},
        body: JSON.stringify(newRegister)
    })
    return res;
};