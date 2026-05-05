
function search() {
    //  Get the typed search text
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase().trim();
    
    //  only select products inside the sidebar's content-section
    // This prevents the "Most Popular" section from being touched
    const sidebarProducts = document.querySelectorAll('#content-section .product');

    sidebarProducts.forEach(product => {
        //  Find the heading inside the sidebar product
        const title = product.querySelector('h2');
        
        if (title) {
            const textValue = title.textContent || title.innerText;
            
            //  Compare: If it matches, show it. Otherwise, hide it.
            if (textValue.toLowerCase().includes(filter)) {
                product.style.display = "flex"; // Restores sidebar layout
            } else {
                product.style.display = "none"; // Hides it completely
            }
        }
    });
}
