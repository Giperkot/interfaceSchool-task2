/**
 * Created by Odohar on 18.08.2018.
 */
import Scrollable from "./Scrollable";
import {types} from "../const";
import Point from "./Point"


class Binding {
    constructor () {
        this.startPoint = new Point(0, 0);

        this.leftScrollMouseDown = false;
        this.bottomScrollMouseDown = false;

        // mobile
        this.leftScrollMouseDownMobile = false;
        this.rightScrollMouseDownMobile = false;

        this.moveLeftScroll = null;
    }

    setBinding () {
        let self = this;

        let leftScrollMousePosition;

        let leftScrollMarginTop = 0;

        // let startPoint = new Point(0, 0);

        if (window.innerWidth > 900) {

            let leftScroll = document.querySelector(".main_panel_inner_right");
            let scrollLeftInner = document.querySelector(".main_panel_inner_right__elements");
            let scrollLeftInnerGeomenry = scrollLeftInner.getBoundingClientRect();
            let leftScrollArrowDown = leftScroll.querySelector(".arrow_down_js");
            let leftScrollArrowUp = leftScroll.querySelector(".arrow_up");

            let topScroll = new Scrollable({
                min: 0,
                max: scrollLeftInnerGeomenry.height,
                isTransition: false,
                cssProperty: "marginTop",
                currentValue: 0,
                parentLength: 331,
                onMax: function () {
                    leftScrollArrowDown.style.display = "none";
                },
                unMax: function () {
                    leftScrollArrowDown.style.display = "block";
                },
                onMin: function () {
                    leftScrollArrowUp.style.display = "none";
                },
                unMin: function () {
                    leftScrollArrowUp.style.display = "block";
                }
            });

            self.moveLeftScroll = function (evt) {
                if (!self.leftScrollMouseDown) {
                    return;
                }

                let delta = leftScrollMousePosition - evt.pageY;

                if (delta > 0) {
                    topScroll.scrollBottom(scrollLeftInner, delta);
                } else {
                    topScroll.scrollTop(scrollLeftInner, -delta);
                }

                leftScrollMousePosition = evt.pageY;
                self.leftScrollMouseDown = true;
            };

            leftScroll.addEventListener("wheel", function (evt) {
                if (evt.deltaY > 0) {
                    topScroll.scrollBottom(scrollLeftInner);
                } else {
                    topScroll.scrollTop(scrollLeftInner);
                }

                evt.preventDefault();
                evt.stopPropagation();
            });

            leftScroll.addEventListener("mousedown", function (evt) {
                leftScrollMousePosition = evt.pageY;
                self.leftScrollMouseDown = true;
            });

            leftScrollArrowDown.addEventListener("click", function (evt) {
                topScroll.scrollBottom(scrollLeftInner, 100, true);
            });

            leftScrollArrowUp.addEventListener("click", function (evt) {
                topScroll.scrollTop(scrollLeftInner, 100, true);
            });

        }


        // Панель с бытовой техникой...
        let filterPanel = document.querySelector(".filter_panel");
        let appliancePanelLeftArrow = filterPanel.querySelector(".arrow_left");
        let appliancePanelRightArrow = filterPanel.querySelector(".arrow_right");

        let panelElements = document.querySelector(".panel_elements");
        let appliancePanel = document.querySelector(".appliances_panel");
        let panelElementsGeometry = appliancePanel.getBoundingClientRect();

        let bottomScrollMousePosition;

        let bottomScroll = new Scrollable({
            min: 0,
            max: panelElementsGeometry.width,
            isTransition: false,
            cssProperty: "marginLeft",
            currentValue: 0,
            parentLength: window.innerWidth,
            onMax: function () {
                appliancePanelRightArrow.classList.remove("arrow_bold");
            },
            unMax: function () {
                appliancePanelRightArrow.classList.add("arrow_bold");
            },
            onMin: function () {
                appliancePanelLeftArrow.classList.remove("arrow_bold");
            },
            unMin: function() {
                appliancePanelLeftArrow.classList.add("arrow_bold");
            }
        });

        function moveBottomScroll (evt) {
            if (!self.bottomScrollMouseDown) {
                return;
            }

            let delta = bottomScrollMousePosition - evt.pageX;

            if (delta > 0) {
                bottomScroll.scrollBottom(appliancePanel, delta);
            } else {
                bottomScroll.scrollTop(appliancePanel, -delta);
            }

            bottomScrollMousePosition = evt.pageX;
            self.bottomScrollMouseDown = true;
        }

        let horisontalBottomMarginLeft = 0;
        appliancePanel.addEventListener("wheel", function (evt) {
            /*horisontalBottomMarginLeft += evt.deltaY;
            panelElements.style.marginLeft = horisontalBottomMarginLeft + "px";*/

            if (evt.deltaY > 0) {
                bottomScroll.scrollBottom(appliancePanel);
            } else {
                bottomScroll.scrollTop(appliancePanel);
            }

            evt.preventDefault();
            evt.stopPropagation();
        });

        panelElements.addEventListener("mousedown", function (evt) {
            bottomScrollMousePosition = evt.pageX;
            self.bottomScrollMouseDown = true;
        });

        appliancePanelLeftArrow.addEventListener("click", function (evt) {

            bottomScroll.scrollTop(appliancePanel, 300, true);
        });

        appliancePanelRightArrow.addEventListener("click", function (evt) {
            bottomScroll.scrollBottom(appliancePanel, 300, true);
        });

        // Общие события

        document.addEventListener("mousedown", function (evt) {
            self.startPoint = new Point (evt.pageX, evt.pageY);
        });

        document.addEventListener("mousemove", function (evt) {

            self.moveLeftScroll (evt);
            moveBottomScroll (evt);
        });

        document.addEventListener("mouseup", function (evt) {

            self.leftScrollMouseDown = false;
            self.bottomScrollMouseDown = false;

            if (self.startPoint.getDistance(new Point(evt.pageX, evt.pageY)) > 3) {
                return;
            }

            // Обработка кликов по блокам.

            let target = evt.target.closest(".main_panel_inner_right_element");
            if (!target) {
                return;
            }

            let type = target.getAttribute("data-type");
            let id = target.getAttribute("data-id");

            if (!type) {
                return;
            }

            switch (type) {
                case types.device:
                    devicesArray[id].openForm();
                    break;
            }

        });


    }

    setMobileBinding () {
        let self = this;

        let leftScrollMousePosition = 0;
        let leftScroll = document.querySelector(".main_panel_inner_right");
        let scrollLeftInner = document.querySelector(".main_panel_inner_right__elements");
        let scrollLeftInnerGeomenry = scrollLeftInner.getBoundingClientRect();

        let topScroll = new Scrollable({
            min: 0,
            max: scrollLeftInnerGeomenry.width,
            isTransition: false,
            cssProperty: "marginLeft",
            currentValue: 0,
            parentLength: leftScroll.getBoundingClientRect().width,
            onMax: function () {

            },
            unMax: function () {

            },
            onMin: function () {

            },
            unMin: function () {

            }
        });

        self.moveLeftScroll = function (evt) {
            if (!self.leftScrollMouseDown) {
                return;
            }

            let delta = leftScrollMousePosition - evt.pageX;

            if (delta > 0) {
                topScroll.scrollBottom(scrollLeftInner, delta);
            } else {
                topScroll.scrollTop(scrollLeftInner, -delta);
            }

            leftScrollMousePosition = evt.pageX;
            // self.leftScrollMouseDown = true;
        };

        leftScroll.addEventListener("wheel", function (evt) {
            if (evt.deltaY > 0) {
                topScroll.scrollBottom(scrollLeftInner);
            } else {
                topScroll.scrollTop(scrollLeftInner);
            }

            evt.preventDefault();
            evt.stopPropagation();
        });

        leftScroll.addEventListener("mousedown", function (evt) {
            leftScrollMousePosition = evt.pageX;
            self.leftScrollMouseDown = true;
        });

    }

}

export default Binding;
