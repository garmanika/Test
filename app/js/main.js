class HeaderUi {
    constructor(menuContainer, menuTrigger, menuTriggerBack, searchContainer, searchTrigger,) {
        this.menuContainer = document.querySelector(menuContainer);
        this.menuTrigger = document.querySelector(menuTrigger);
        this.menuTriggerBack = document.querySelector(menuTriggerBack);
        this.hasMenu = this.menuContainer !== null && this.menuTrigger !== null && this.menuTriggerBack !== null;
        this.searchContainer = document.querySelector(searchContainer);
        this.searchTrigger = document.querySelector(searchTrigger);
        this.hasSearch =
            this.searchContainer !== null && this.searchTrigger !== null;
        if (this.hasMenu) {
            this.initMenu();
        }
        if (this.hasSearch) {
            this.initSearch();
        }
        this.initScrollEvents();
    }

    initMenu() {
        this.topParent = this.menuContainer.querySelector(".is-top");
        this.setTriggerEvents();
        this.parentItems = this.menuContainer.querySelectorAll(".is-parent");
        this.setParentsEvents();
        this.backTriggers = this.menuContainer.querySelectorAll(".back-trigger");
        this.setBackEvents();
    }

    initScrollEvents() {
        let pageHeader = document.querySelector(".header");
        window.onscroll = function () {
            if (this.scrollY > 136) {
                if (this.oldScroll > this.scrollY) {
                    pageHeader.classList.remove("template-header--hidden");
                } else {
                    pageHeader.classList.add("template-header--hidden");
                }
            }
            this.oldScroll = this.scrollY;
        };
    }

    resetParents() {
        for (let parentItem of this.parentItems) {
            parentItem.classList.remove("active", "current");
        }
    }

    openMenu() {
        if (this.hasSearch) {
            this.closeSearch();
        }
        this.resetParents();
        document.body.classList.add("no-scroll");
        this.topParent.classList.add("current");
        this.menuContainer.classList.add("active");
    }

    closeMenu() {
        this.resetParents();
        document.body.classList.remove("no-scroll");
        this.topParent.classList.remove("current");
        this.menuContainer.classList.remove("active");
    }

    setTriggerEvents() {
        let ui = this;
        this.menuTrigger.addEventListener("click", function (event) {
            event.preventDefault();
            ui.openMenu();

        });
        this.menuTriggerBack.addEventListener("click", function (event) {
            event.preventDefault();
            ui.closeMenu();

        });
    }

    setParentsEvents() {
        let ui = this;
        for (let parentItem of this.parentItems) {
            parentItem
                .querySelector(":scope > a")
                .addEventListener("click", function (event) {
                    event.preventDefault();
                    let currentParent = parentItem.closest(".is-parent.current");
                    if (currentParent !== null) {
                        currentParent.classList.remove("current");
                    } else {
                        ui.topParent.classList.remove("current");
                    }
                    parentItem.classList.add("active", "current");
                });
        }
    }

    setBackEvents() {
        let ui = this;
        for (let backTrigger of this.backTriggers) {
            backTrigger.addEventListener("click", function (event) {
                event.preventDefault();
                let currentParent = backTrigger.closest(".is-parent.current");
                if (currentParent !== null) {
                    currentParent.classList.remove("active", "current");
                }
                let activeParent = backTrigger.closest(".is-parent.active");
                if (activeParent !== null) {
                    activeParent.classList.add("current");
                } else {
                    ui.topParent.classList.add("current");
                }
            });
        }
    }

    initSearch() {
        let ui = this;
        this.searchTrigger.addEventListener("click", function (event) {
            event.preventDefault();
            if (ui.searchTrigger.classList.contains("active")) {
                ui.closeSearch();
            } else {
                ui.openSearch();
            }
        });
    }

    openSearch() {
        if (this.hasMenu) {
            this.closeMenu();
        }
        document.body.classList.add("no-scroll");
        this.searchTrigger.classList.add("active");
        this.searchContainer.classList.add("active");
    }

    closeSearch() {
        document.body.classList.remove("no-scroll");
        this.searchTrigger.classList.remove("active");
        this.searchContainer.classList.remove("active");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const headerUi = new HeaderUi(
        ".header-menu-mobile-container",
        ".menu-btn",
        ".header-menu-mobile-close",
        ".header-search",
        ".header-search-trigger"
    );
});

