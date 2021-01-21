export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render(items) {
        items.forEach(item => {
            this._renderer(item)
        });
    }

    addItem(item, isPrepend) {
        isPrepend ? this._container.prepend(item) : this._container.append(item)
    }
}