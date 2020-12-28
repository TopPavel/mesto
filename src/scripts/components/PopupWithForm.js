import Popup from "./Popup.js";
import {FormValidator} from "./FormValidator";

export default class PopupWithForm extends Popup {
    constructor({validationConfig, submit}, popupSelector, formSelector) {
        super(popupSelector);
        this._validationConfig = validationConfig;
        this._submit = submit;
        this.formSelector = formSelector;
        this._form = this._getForm();
        this.setEventListeners = this.setEventListeners()
    }

    setEventListeners() {
        super.setEventListeners();
        this._setProfileSettingForm()
    }

    _setProfileSettingForm() {
        new FormValidator(this._validationConfig, this._form).enableValidation()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            super.close();
        });
    }

    _getForm() {
        return this._element.querySelector(this.formSelector)
    }

    _getInputValues() {
        const inputValues = {}
        Array.from(this._form.elements).forEach(e => {
            if (e.localName === 'input' && e.name) {
                inputValues[e.name] = e.value
            }
        })
        return inputValues
    }
}

/*
4.Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться. --
-------- тут у меня вопрос:
                в 4й практической работе в ТЗ написано: При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
                - соответственно данные поля должны всегда отображаться корректно при открытии попапа.

                Вы же мне говорите их сбрасывать. Почему?

                Я делаю сброс формы при сабмите. Т.к. попап закрывается при клике по оверлею (что можно сделать случайно), то пользователь может утерять возможно долго вводимую информацию.
                Именно поэтому я и не сбрасываю форму при закрытии, чтобы пользователь смог продолжить заполнение и у него остался положительный опыт при взаимодействии.

Также: Почему я передаю конфиг валидации в попап с формой? Каждый попап с формой может иметь уникальный набор селекторов и на мой взгляд
каждая форма (попап с формой) должны настраивать валидацию отдельно, а не собирать все формы и инпуты в проекте по одному конфигу.
*/
