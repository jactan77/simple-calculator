var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchRequest(url, method, body, href) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            });
            if (response.ok) {
                if (href) {
                    window.location.href = href;
                }
                return yield response.json();
            }
        }
        catch (error) {
            console.error(`Error with ${method} request to ${url}:`, error);
            throw error;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    try {
        const getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield fetchRequest('/admin-dashboard/get-users', 'GET');
            const userCountElement = document.querySelector('#userCount');
            if (userCountElement) {
                userCountElement.textContent = users.length.toString();
            }
        });
        getUsers();
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }
});
