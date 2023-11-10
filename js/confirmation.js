
//  Récupération de orderId via l'URL.
function getOrderId(){
    const queryString = window.location.search;
    const urlParams =  new URLSearchParams(queryString);
     const orderId = urlParams.get("orderId");
    displayOrderId(orderId)
}

// Affichange de l'orderId.

function displayOrderId(id){
    const orderElement = document.getElementById("orderId")
    orderElement.innerHTML = id;  
    localStorage.clear();

}

// appel de la fonction.
getOrderId()
//enlever le local storage clear