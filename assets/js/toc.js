// This file contains JavaScript code to dynamically generate the table of contents based on the headings in the content.

// Initialize TOC when the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    updateTableOfContents();
});

// Update the table of contents based on the headings in the content
function updateTableOfContents() {
    const tocContainer = document.getElementById("toc");
    const headings = document.querySelectorAll(".main-content h1, .main-content h2, .main-content h3");

    if (tocContainer && headings.length > 0) {
        // Clear existing TOC
        const existingList = tocContainer.querySelector("ul");
        if (existingList) {
            existingList.remove();
        }

        const tocList = document.createElement("ul");

        headings.forEach(heading => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const headingId = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');

            heading.id = headingId; // Set the id for the heading if it doesn't have one
            link.href = `#${headingId}`;
            link.textContent = heading.textContent;

            // Add appropriate indentation based on heading level
            if (heading.tagName === "H2") {
                listItem.style.marginLeft = "10px";
            } else if (heading.tagName === "H3") {
                listItem.style.marginLeft = "20px";
            }

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
    }
}