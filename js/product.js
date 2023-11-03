let searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
.then ((resp) => resp.json())
.then ((data)=> {
    console.log(data);
    displaydata(data);
})

.catch(function (err) {
    document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>"
    console.error("une erreur est survenue "+ err);
});

//------------------------------ Affichage du produit---------------
function displaydata(kanap){

 // Nom du produit _ document.querySelector('#title').innerHtml = kanap.name
    let kanapName = document.querySelector('#title');
    kanapName.innerHTML = kanap.name;

 // Prix du produit
    let kanapPrice = document.querySelector('#price');
    kanapPrice.innerHTML = kanap.price;

 // Image du Produit
    let imgContainer = document.querySelector('.item__img');
    let kanapImg = document.createElement('img');
    kanapImg.setAttribute("src", kanap.imageUrl);
    kanapImg.setAttribute("alt","Photographie d'un canapé");
    imgContainer.appendChild(kanapImg);

// Description du produit
    let kanapDescription = document.querySelector('#description');
    kanapDescription.innerHTML = kanap.description;

 // Boucle pour afficher chaque couleurs selon le produit 
    const select = document.querySelector('#colors')
    const arrayColor = kanap.colors;
    arrayColor.forEach(color => {
        const optioncolor = document.createElement('option');
        optioncolor.value = color;
        optioncolor.textContent = color;
        select.appendChild(optioncolor);
    }) 

    addToCart(kanap)
} 

    function addToCart(kanap){
    const button = document.querySelector('#addToCart');
    button.addEventListener("click", (e)=>{
        e.preventDefault()


     //Initialiser les variables  pour pouvoir l'utiliser dans l'objet article 

        // const price = document.querySelector('#price').innerHTML;
        const price = document.querySelector('#price').innerHTML
        const name = document.querySelector('#title').innerHTML;

    
     //ciblé la couleur et la quantité que l'utilisateur aura choisie
        const color = document.querySelector('#colors').value;       
        const quantity = document.querySelector('#quantity').value 

        const img = kanap.imageUrl;
        console.log(img)

     // Récupération des article à mettre dans le panier
   const article= {
    id: id,
    name: name,
    price: Number(price),
    color: color,
    quantity: Number(quantity),
    img: img
   }
 

// Vérifier si les inputs couleurs et quantités ne sont pas correctement indiqué
       if(color=== null || color===''|| quantity <= 0 ||quantity >100){
        alert ("Veuillez choisir une couleur et/ou une quantité entre 1 et 100");  
       }  
       else{
        valid(article)
       }                    
    
    });   
    
}


//-------------------------------- Le Local Storage----------------------------------------------


    function valid(article){
        let productStorage = JSON.parse(localStorage.getItem("cart"))

// S'il y a des produits dans le local storage
 if (productStorage){
   // const found = array1.find((element) => element > 10);
    let found = productStorage.find(
        (element) =>
         element.id === article.id && element.color === article.color);
         if(found){    
            let totalQuantity = found.quantity + article.quantity;
            found.quantity = totalQuantity;
            localStorage.setItem("cart",JSON.stringify(productStorage));
            console.log(productStorage);
            popupConfirmation(article);
         }else{

    productStorage.push(article);
    localStorage.setItem("cart", JSON.stringify(productStorage));
    console.log(productStorage); //console.table
    popupConfirmation(article);
}

 }
 // S'il n'y a pas de produits dans le local storage
else{
    let productStorage = [];
    productStorage.push(article);
    localStorage.setItem("cart", JSON.stringify(productStorage));
    console.log(productStorage); //console.table
    popupConfirmation(article);
}
   }                    


//-------------------------------PopupConfirmation------------------------------------

  
 function popupConfirmation(article){
        const response = confirm
        (`votre commande ${article.name}  couleur :${article.color}  prix: ${article.quantity} à bien été enregistrer.
Appuyer sur OK pour retourner à l'accueil
Annuler pour aller au panier`);
        if(response){
            // window.location.href = "index.html"
        }else{
           // window.location.href = "cart.html"
    
        }
    }      
    