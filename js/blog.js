document.addEventListener("DOMContentLoaded", function () {
    const blogItems = document.querySelectorAll(".front-blog-item");

    blogItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            blogItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector(".article__thumbnail").style.opacity = "0.5";
                }
            });
        });

        item.addEventListener("mouseleave", () => {
            blogItems.forEach(otherItem => {
                otherItem.querySelector(".article__thumbnail").style.opacity = "1";
            });
        });
    });
});