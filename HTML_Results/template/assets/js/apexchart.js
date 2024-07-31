
document.addEventListener("DOMContentLoaded", function () {
    var tabLinks = document.querySelectorAll(".nav-link");
    tabLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            var tabId = this.dataset.tab;
            var tabContents = document.querySelectorAll(".tab-content");
            tabContents.forEach(function (content) {
                content.style.display = "none";
            });
            document.getElementById(tabId + "-tab-content").style.display = "block";
            tabLinks.forEach(function (link) {
                link.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
});