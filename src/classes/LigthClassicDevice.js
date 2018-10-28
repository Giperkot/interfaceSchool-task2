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

    openForm(targetElm) {
        let poppForm = document.querySelector(".popup_form");
        super.openForm(poppForm, targetElm);

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


    }

}

export default LigthClassicDevice;