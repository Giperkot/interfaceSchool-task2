/**
 * Created by Odohar on 18.08.2018.
 */

import Device from "./Device";
// import {temperatureClassicTemplateFunc} from "../const";

let temperatureAlternativeTemplateFunc = null;

class TemperatureAlternativeDevice extends Device {



    constructor (config) {
        super(config);

        // Инициализация.
        this.temperature = config.temperature;
    }

    openForm() {

        if (!temperatureAlternativeTemplateFunc) {
            let template = document.getElementById("temperature_alternative_template");
            temperatureAlternativeTemplateFunc = _.template(template.innerHTML);
        }

        let poppForm = document.querySelector(".popup_form");
        poppForm.innerHTML = temperatureAlternativeTemplateFunc({
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

export default TemperatureAlternativeDevice;