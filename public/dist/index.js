var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
(_a = document.querySelector('#logout-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const response = yield fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                window.location.href = '/login';
            }
            else {
                throw new Error('Failed to log out');
            }
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
    });
});
(_b = document.querySelector('#menu-link')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const response = yield fetch('/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                window.location.href = '/';
            }
            else {
                throw new Error('Failed to fetch menu');
            }
        }
        catch (error) {
            console.error('Error during menu navigation:', error);
        }
    });
});
