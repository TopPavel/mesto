export default class UserInfo{
    constructor(nameSelector, descSelector) {
        this._nameSelector = nameSelector;
        this._descSelector = descSelector;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._nameSelector).textContent,
            desc: document.querySelector(this._descSelector).textContent
        }
    }

    setUserInfo(data) {
        document.querySelector(this._nameSelector).textContent = data.name;
        document.querySelector(this._descSelector).textContent = data.desc;
    }
}