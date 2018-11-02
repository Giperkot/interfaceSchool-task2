/*import {initMap} from "./map";

function setMapSize (mapsId) {
    let maps = document.getElementById(mapsId);
    maps.style.width = window.innerWidth;
    maps.style.height = window.innerHeight;
}*/

import {getHttpPromise} from "./api";
import "./libs/lodash.min";
import Binding from "./classes/Binding.js";
import TemperatureClassicDevice from "./classes/TemperatureClassicDevice";
import {actions, projectConsts, types} from "./const";
import LigthClassicDevice from "./classes/LigthClassicDevice";
import TemperatureAlternativeDevice from "./classes/TemperatureAlternativeDevice";

document.addEventListener("DOMContentLoaded", function () {

    let config = {
        method: "GET",
        url: "/data/input.json",
        contentType: "application/json",
    };

    getHttpPromise(config).then(function (response) {
        let data = JSON.parse(response);

        let tasks = data.tasks;

        let mainPanelInnerRight = document.querySelector(".main_panel_inner_right__elements");
        let taskTemplate = document.getElementById("task_template");
        let templateFunc = _.template(taskTemplate.innerHTML);

        let elementsHtml = "";
        for (let i = 0; i < tasks.length; i++) {
            elementsHtml += templateFunc({data: tasks[i]});
        }

        mainPanelInnerRight.innerHTML = elementsHtml;


        let electScriptsPanel = document.querySelector(".panel_inner__elect_scripts");
        let electScriptTemplate = document.getElementById("elect_script_template");
        let electScriptTemplateFunc = _.template(electScriptTemplate.innerHTML);

        let electScripts = data.scripts;

        elementsHtml = "";
        for (let i = 0; i < 9; i++) {
            if (electScripts[i]) {
                elementsHtml += electScriptTemplateFunc({
                    data: electScripts[i]
                });
                continue;
            }

            elementsHtml += electScriptTemplateFunc({
                data: {
                    image: "",
                    title: "",
                    text: "",
                    invisible: true
                }
            });
        }

        electScriptsPanel.innerHTML = elementsHtml;

        let appliancesPanel = document.querySelector(".appliances_panel");

        let deviceArray = [];
        let devices = data.appliances;
        elementsHtml = "";
        for (let i = 0; i < devices.length; i++) {
            let tempObj = {
                id: i,
                type: types.device
            };

            Object.assign(tempObj, devices[i]);

            let device;

            switch (devices[i].action) {
                case actions.lightClassic:
                    device = new LigthClassicDevice(tempObj);
                    break;
                case actions.temperatureAlternative:
                    device = new TemperatureAlternativeDevice(tempObj);
                    break;
                default:
                    device = new TemperatureClassicDevice(tempObj);
                    break;
            }

            deviceArray.push(device);
            /*devices[i].type = types.device;
            devices[i].id = i;*/
            elementsHtml += templateFunc({data: tempObj});
        }

        appliancesPanel.innerHTML = elementsHtml;
        appliancesPanel.style.width = (devices.length * 200 + (devices.length - 1) * 15) + "px";

        let binding = new Binding();

        binding.setBinding();

        if (window.innerWidth <= 900 ) {
            binding.setMobileBinding();
        }




        window.devicesArray = deviceArray;
    });

    let config2 = {
        url: projectConsts.url + "api/public/login",
        method: "GET",
        contentType: "application/json",
    };

    getHttpPromise(config2).then(function (response) {
        console.log(response);

        let data = JSON.parse(response);
        document.querySelector(".user_name").innerHTML = (data.firstName) ? data.firstName : "Илья";

    });



});


