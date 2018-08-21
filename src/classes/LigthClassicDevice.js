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
    }

    openForm() {

        if (!temperatureClassicTemplateFunc) {
            let template = document.getElementById("light_classic_template");
            temperatureClassicTemplateFunc = _.template(template.innerHTML);
        }

        let poppForm = document.querySelector(".popup_form");
        poppForm.innerHTML = temperatureClassicTemplateFunc({
            data: {
                title: this.title,
                text: this.text,
                temperature: this.temperature,
                image: this.image
            }
        });

        poppForm.parentNode.style.display = "flex";

        poppForm.addEventListener("click", function (evt) {
            let target = evt.target;

            if (target.closest(".button_cancel")) {
                poppForm.parentNode.style.display = "none";
                return;
            }

            if (target.closest(".button_ok")) {
                poppForm.parentNode.style.display = "none";
                return;
            }

        });


    }

}

export default LigthClassicDevice;