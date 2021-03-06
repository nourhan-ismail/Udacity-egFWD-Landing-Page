/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//returns nodelist which contains all sections
const sections = document.querySelectorAll("section");

//returns the navBar for populating it with links for each section
const navBar = document.getElementById("navbar__list");

//to append dynamically the navigation links when created
let docFragment = document.createDocumentFragment();
/**
 * End Global Variables
 * 
*/


/**
 Start Main functions
 */
//build the nav
function buildNav() {
    let sectionsLength = sections.length;
    for (let i = 0; i < sectionsLength; i++) {
        
        let newNavItem = document.createElement("li");
        newNavItem.innerHTML = sections[i].getAttribute("data-nav");
        newNavItem.classList.add("menu__link");
        docFragment.appendChild(newNavItem);

        // Scroll to section on link click
        newNavItem.addEventListener("click", function () {
            sections[i].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        });

    }
    navBar.appendChild(docFragment);

    //to distinguish which link is currently clicked
    navBar.addEventListener("click", setActiveLink);

}

//These functions are called when scroll event is trigerred
const setActiveClass = () => {

    //to remove the styling from the sections that are not in the viewport
    sections.forEach((inactiveSection) => {
        if (inactiveSection.classList.contains("your-active-class")) {
            inactiveSection.classList.remove("your-active-class");
        }

    });
    sections.forEach((section) => {
        let currentSectionTop = section.getBoundingClientRect().top;

        /*0 value is used to ensure that the top of the section is not a negative number, 
        so sections that are not in the viewport are ignored.
        The value 410 is an arbitrary value to ensure that the current section in the viewport is the active one,
        since there is no two sections together have top less than or equal to 410, so the section that has top between 0 and 410 
        will only correspond to one section (which is the active section in the viewport)
        */
        if (currentSectionTop >= 0 && currentSectionTop <= 410) {
            section.classList.add("your-active-class");
        }
    });

}


//to change the styling of the clicked link
function setActiveLink(e) {
    const navItems = document.getElementsByTagName('li');

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].style.background = "white";
        navItems[i].style.color = "black";
    }
    e.target.style.background = "black";
    e.target.style.color = "white";

}

/**
 End Main functions
 */

//to ensure that the DOM is ready
document.addEventListener('DOMContentLoaded', buildNav);

//set the section active state
document.addEventListener("scroll", setActiveClass);




