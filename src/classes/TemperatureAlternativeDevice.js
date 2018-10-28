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

    openForm(targetElm) {
        let poppForm = document.querySelector(".popup_form");
        super.openForm(poppForm, targetElm);

        if (!temperatureAlternativeTemplateFunc) {
            let template = document.getElementById("temperature_alternative_template");
            temperatureAlternativeTemplateFunc = _.template(template.innerHTML);
        }

        poppForm.innerHTML = temperatureAlternativeTemplateFunc({
            data: {
                title: this.title,
                text: this.text,
                temperature: this.temperature,
                image: this.image
            }
        });
    }

}

export default TemperatureAlternativeDevice;