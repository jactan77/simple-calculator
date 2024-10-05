interface User{
    id: number;
    username: string;
    email: string;
    password: string;
}


async function fetchRequest<T>(url:string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' , body?:any, href?: any):Promise<T>{
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
            return await response.json();
        }
    } catch(error){
        console.error(`Error with ${method} request to ${url}:`, error);
        throw error;
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    try{
    const getUsers = async () => {
        const users = await fetchRequest<User[]>('/admin-dashboard/get-users', 'GET')
        const user = await fetchRequest<User>('/admin-dashboard/get-user', 'GET')
        const userCountElement: HTMLElement = document.querySelector('#userCount');
        const userProfile: HTMLElement = document.querySelector('.user-profile"')

        if(userCountElement && userProfile){
            userCountElement.textContent =  users.length.toString() 
            const wrapper: HTMLSpanElement =  document.createElement('span')
            wrapper.textContent = `${user.username}`
            userProfile.appendChild(wrapper)
        }

    }
    
    getUsers()
}catch(error){
    console.error('Error fetching users:', error);
}
})