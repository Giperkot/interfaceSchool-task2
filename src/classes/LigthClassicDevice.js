/**
 * Created by Odohar on 18.08.2018.
 */

import Device from "./Device";
// import {temperatureClassicTemplateFunc} from "../const";

let temperatureClassicTemplateFunc = null;

class LigthClassicDevice extends Device {



    constructor (config) {
        super(config);

        // Инициализация.
        this.light = config.light;

        this.droppable = false;
        this.circlePicker = null;
        this.circlePickerParent = null;
    }

    onMouseDown (evt) {
        this.droppable = true;
    }

    onMouseMove (evt) {
        if (!this.droppable) {
            return;
        }

        let parentGeometry = this.circlePickerParent.getBoundingClientRect();
        let leftOffset = evt.pageX - parentGeometry.left - 30;

        leftOffset = Math.max(0, leftOffset);
        leftOffset = Math.min(parentGeometry.width - 60, leftOffset);

        this.circlePicker.style.marginLeft = leftOffset + "px";
    }

    onMouseUp (evt) {
        this.droppable = false;
    }

    handleDragAndDrop () {
        let self = this;

        this.circlePicker.addEventListener("mousedown", function (evt) {
            self.onMouseDown.call(self, evt);
        });
        document.addEventListener("mousemove", function (evt) {
            self.onMouseMove.call(self, evt);
        });
        document.addEventListener("mouseup", function (evt) {
            self.onMouseUp.call(self, evt);
        });
    }

    openForm(targetElm) {
        let poppForm = document.querySelector(".popup_form");
        super.openForm(poppForm, targetElm, {
            element: this.circlePicker,
            onMouseDown: this.onMouseDown,
            onMouseMove: this.onMouseMove,
            onMouseUp: this.onMouseUp
        });

        if (!temperatureClassicTemplateFunc) {
            let template = document.getElementById("light_classic_template");
            temperatureClassicTemplateFunc = _.template(template.innerHTML);
        }

        poppForm.innerHTML = temperatureClassicTemplateFunc({
            data: {
                title: this.title,
                text: this.text,
                temperature: this.temperature,
                image: this.image
            }
        });

        this.circlePicker = poppForm.querySelector(".circle_picker");
        this.circlePickerParent = this.circlePicker.parentNode;

        this.handleDragAndDrop();


    }

}

export default LigthClassicDevice;