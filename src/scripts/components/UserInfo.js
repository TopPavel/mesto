export default class UserInfo{
    constructor(nameSelector, descSelector) {
        this._nameSelector = nameSelector;
        this._descSelector = descSelector;
    }

    get name() {
        return document.querySelector(this._nameSelector).textContent;
    }

    get desc() {
        return document.querySelector(this._descSelector).textContent;
    }

    setProfileInfo(name, desc) {
        document.querySelector(this._nameSelector).textContent = name;
        document.querySelector(this._descSelector).textContent = desc;
    }
}