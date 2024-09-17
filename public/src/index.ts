(document.querySelector('#logout-link') as HTMLLIElement).addEventListener('click', async function(event:Event): Promise<void> {
    event.preventDefault();
    try{
        const response = await fetch('/logout'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if(response.ok){
            window.location.href = '/login';
        }
        else{
            throw new Error('Failed to log out');
        }
    }
    catch(error){
        console.error(error);
    }
})
