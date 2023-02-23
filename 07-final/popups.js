
<script>
  const pageType = "{{ request.page_type }}";
</script>

<script src="{{ 'popups.js' | asset_url }}" defer="defer"></script>
{{ 'popups.css' | asset_url | stylesheet_tag }}

const modal = document.querySelector(".modal-container");

  //close modal:
    modal.addEventListener("click", (event) => {
      const modalContent = event.target.querySelector(".modal-content");
      const exitButton = event.target.closest("[data-action='close-popup']");
        console.log(modalContent);

      if (exitButton || modalContent) {
        //we clicked outside the modal, so we should close the modal
        modal.classList.add("out");
      }
    });

//open modal:
window.addEventListener("load", (event) => {
  if (modal) {
    console.log(modal.dataset.delay);
    console.log(modal.dataset.show_once);
    const popupDelay = parseInt(modal.dataset.delay);
    const showOnce = modal.dataset.show_once === "true";
    if (window.location.hash === "#newsletter-popup" && pageType !== "captcha") {
        openPopup(modal);
    } else if ( showOnce && localStorage.getItem("popupShown") === null ||
         !showOnce ) {
          setTimeout(
            openPopup(modal),
            popupDelay * 1000
          );
    }
  }
});

function openPopup(element) {
  modal.classList.remove("modal-animation","out");
  modal.classList.add("modal-animation");
  localStorage.setItem("popupShown", "true");
}
