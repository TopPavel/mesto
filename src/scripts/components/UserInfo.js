export default class UserInfo{
    constructor(nameSelector, descSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._descSelector = descSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._nameSelector).textContent,
            desc: document.querySelector(this._descSelector).textContent,
            avatar: document.querySelector(this._avatarSelector).src
        }
    }

    setUserInfo(data) {
        document.querySelector(this._nameSelector).textContent = data.name;
        document.querySelector(this._descSelector).textContent = data.desc;
        document.querySelector(this._avatarSelector).src = data.avatar;
    }
}