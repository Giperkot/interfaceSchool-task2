
import {defaultScroll} from "../const";

class Scrollable {

    constructor (config) {
        this.min = config.min;
        this.max = config.max;
        this.isTransition = config.isTransition;
        this.cssProperty = config.cssProperty;
        this.currentValue = config.currentValue;
        this.parentLength = config.parentLength;
        this.onMax = config.onMax;
        this.unMax = config.unMax;
        this.reachMax = false;
        this.onMin = config.onMin;
        this.unMin = config.unMin;
        this.reachMin = true;
    }

    scrollTop (domElement, scroll, withAnimation) {

        if (withAnimation) {
            domElement.style.transition = "all " + defaultScroll.transitionDelay + "s";

            setTimeout(function () {
                domElement.style.transition = "none";
            }, defaultScroll.transitionDelay * 1000);
        }

        if (!scroll && scroll !== 0) {
            scroll = defaultScroll.velocity;
        }

        this.currentValue = Math.min(scroll + this.currentValue, this.min);

        domElement.style[this.cssProperty] = this.currentValue + "px";

        if (this.min === this.currentValue) {
            this.onMin();
            this.reachMin = true;
        } else {
            if (this.reachMin) {
                this.unMin();
            }
        }

        if (this.reachMax) {
            this.unMax();
        }
    }


    scrollBottom (domElement, scroll, withAnimation) {

        if (withAnimation) {
            domElement.style.transition = "all " + defaultScroll.transitionDelay + "s";

            setTimeout(function () {
                domElement.style.transition = "none";
            }, defaultScroll.transitionDelay * 1000);
        }

        if (!scroll && scroll !== 0) {
            scroll = defaultScroll.velocity;
        }


        this.currentValue = Math.max(this.currentValue - scroll, -this.max + this.parentLength - 25);
        domElement.style[this.cssProperty] = this.currentValue + "px";

        if (-this.max + this.parentLength - 25 === this.currentValue) {
            this.onMax();
            this.reachMax = true;
        } else {
            if (this.reachMax) {
                this.unMax();
                this.reachMax = false;
            }
        }

        if (this.reachMin) {
            this.unMin();
        }
    }

}

export default Scrollable;