const BaseURL = 'https://jsonplaceholder.typicode.com';

export async function getTodos() {
    const response = await fetch(`${BaseURL}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data;
    
}