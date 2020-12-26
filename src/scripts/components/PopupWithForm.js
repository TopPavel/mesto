import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupId, FormValidator, submit, formId) {
        super(popupId);
        this._formValidator = FormValidator;
        this._submit = submit;
        this.formId = formId;
        this._element = this._createPopup();
    }

    _createPopup() {
        const popup = super.element;
        super.setClosePopup(popup);
        this._setProfileSettingForm(popup);
        return popup;
    }

    _setProfileSettingForm(popup) {
        const popupEditForm = popup.querySelector(`#${this.formId}`);
        this._formValidator.enableValidation();
        popupEditForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
            super.closePopup(evt, popup);
        });
    }
}
