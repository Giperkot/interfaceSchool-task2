

class Device {
    constructor (config) {
        this.id = config.id
        this.image = config.image;
        this.title = config.title;
        this.text = config.text;
    }

    openForm (poppForm, targetElm) {
        let overlay = poppForm.parentNode;
        let wrapperContent = document.querySelector(".wrapper_content");

        let targetGeometry = targetElm.getBoundingClientRect();
        poppForm.style.top = targetGeometry.top + "px";
        poppForm.style.left =  targetGeometry.left + "px";
        poppForm.style.transition = "top 0.5s, left 0.5s, transform 0.5s";

        setTimeout(function () {
            let popupFormGeometry = poppForm.getBoundingClientRect();
            poppForm.style.top = (window.innerHeight / 2 - popupFormGeometry.height / 0.3 / 2) + "px";
            poppForm.style.left = (window.innerWidth / 2 - popupFormGeometry.width / 0.3 / 2) + "px";
            poppForm.style.transform = "scale(1)";

            setTimeout(function () {
                poppForm.classList.remove("popup_form__scaled");
            }, 500);

        }, 10);

        overlay.style.display = "flex";
        setTimeout(function () {
            overlay.classList.add("overlay_background");
            wrapperContent.style.filter = "blur(5px)";
        }, 0);
        //

        function closePopup () {
            poppForm.style.transform = "scale(0.3)";
            poppForm.style.top = targetGeometry.top + "px";
            poppForm.style.left =  targetGeometry.left + "px";


            overlay.classList.remove("overlay_background");
            wrapperContent.style.filter = "none";
            poppForm.classList.add("popup_form__scaled");
            // poppForm.style.transform = "scale(1)";


            setTimeout(function () {
                poppForm.style.transition = "nome";
                overlay.style.display = "none";
            }, 500);
        }

        poppForm.addEventListener("click", function (evt) {
            let target = evt.target;

            if (target.closest(".button_cancel")) {
                closePopup();
                return;
            }

            if (target.closest(".button_ok")) {
                closePopup();
                return;
            }

        });
    }

}

export default Device;
