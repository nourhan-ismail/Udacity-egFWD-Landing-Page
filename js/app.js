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

//the navBar for populating it with links for each section
const navBar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * 
*/

/**
 Start Main functions
 */
const setActiveClass = () => {
    sections.forEach((inactiveSection) => {
        if (inactiveSection.classList.contains("your-active-class")){
            inactiveSection.classList.remove("your-active-class");
        }
            
        });
    sections.forEach((section) => {
        let currentSectionTop = section.getBoundingClientRect().top;
      
        //0 value to enure that the top is not a negative number, so sections that are not in the viewport are ignored
        //the value 415 is an arbitrary value to ensure that the current section is the active one
        //since there is no two sections have top less than or equal to 450, so top 450 will only correspond to one section (which is the active section in the viewport)
        if (currentSectionTop >= 0 && currentSectionTop <= 400) {
            section.classList.add("your-active-class");
        }
    });
  
}



// build the nav
sections.forEach((section, index, array) => {
    //create li element
    let newNavItem = document.createElement("li");
    newNavItem.innerHTML = section.getAttribute("data-nav");
    newNavItem.classList.add("menu__link");

    navBar.appendChild(newNavItem);

    // Scroll to section on link click
    newNavItem.addEventListener("click", function () {
        section.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        //styling for the active link

        navBar.childNodes.forEach(element => {
            element.classList.remove("active__link");
            element.style.color = "black";
        });
        newNavItem.classList.add("active__link");
        newNavItem.style.color = "white";
    });

});


//set the section active state
document.addEventListener("scroll", setActiveClass);

