// This file will contain JavaScript code to dynamically generate the table of contents based on the headings in the markdown files.

document.addEventListener("DOMContentLoaded", function() {
    const tocContainer = document.getElementById("toc");
    const headings = document.querySelectorAll("h1, h2, h3");

    if (tocContainer && headings.length > 0) {
        const tocList = document.createElement("ul");

        headings.forEach(heading => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const headingId = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');

            heading.id = headingId; // Set the id for the heading if it doesn't have one
            link.href = `#${headingId}`;
            link.textContent = heading.textContent;

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
    }
});