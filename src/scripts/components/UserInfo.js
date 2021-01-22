export default class UserInfo{
    constructor(nameSelector, descSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._desc = document.querySelector(descSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            desc: this._desc.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._desc.textContent = data.desc;
        this._avatar.src = data.avatar;
    }
}