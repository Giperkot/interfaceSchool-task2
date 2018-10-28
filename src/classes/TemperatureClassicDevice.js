/**
 * Created by Odohar on 18.08.2018.
 */

import Device from "./Device";
// import {temperatureClassicTemplateFunc} from "../const";

let temperatureClassicTemplateFunc = null;

class TemperatureClassicDevice extends Device {



    constructor (config) {
        super(config);

        // Инициализация.
        this.temperature = config.temperature;
    }

    openForm(targetElm) {
        let poppForm = document.querySelector(".popup_form");
        super.openForm(poppForm, targetElm);

        if (!temperatureClassicTemplateFunc) {
            let template = document.getElementById("temperature_classic_template");
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


    }

}

export default TemperatureClassicDevice;