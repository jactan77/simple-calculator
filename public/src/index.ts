async function fetchRequest(url:string, method:string, body?:any, href?: any):Promise<Response>{
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
            
        })
        if(response.ok) {
            if(href){
                window.location.href = href;
            
            }
            return response;
        }
    } catch(error){
        console.error(`Error with ${method} request to ${url}:`, error);
        throw error;
    }
}
(document.querySelector('#menu-link') as HTMLLIElement)?.addEventListener('click', async (event: Event)=>{
    event.preventDefault();
    await fetchRequest('/',"GET",null, '/')
    
});

(document.querySelector('#logout-link') as HTMLLIElement)?.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    await fetchRequest('/logout', "POST", null, '/')
});