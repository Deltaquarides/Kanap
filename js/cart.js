// ----------------------Récupérer et afficher tout les articles ajoutés dans le localstorage  par l'utilisateur------
let productStorage = JSON.parse(localStorage.getItem("cart"));

//console.log(productStorage);    //acceder a la valeur dun object precis : productStorage[0].name

console.log(productStorage)

 // Si le panier est vide, on affichera un message.  Le prix ainsi que la quantité sera initialisé à 0.
// n'arrive pas a mettre dans une fonction, solution appeler la fonction.


       function panierVide(){
        if( productStorage.length === 0 ){ //productStorage == ""|| productStorage === null
            document.querySelector(".cartAndFormContainer h1").innerHTML = "Votre panier est vide";
            document.querySelector(".cart__price ").innerHTML =  '<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>';
        
            } else{
                for (let cartdata of productStorage) {
                displaycart(cartdata)   
                }
            } 

        }

        panierVide()
    
//---------------------------------Affichage des produits du panier------------------------------------------------------------------

function displaycart(cartdata) {
    let positionCart = document.querySelector("#cart__items");

    //------------Creation de l'élement Article--------------------------
    let cartArticle = document.createElement("article");
    positionCart.appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute("data-id", cartdata.id);
    cartArticle.setAttribute("data-color", cartdata.color);


    //-------------Création de la div contenant l'élement img----------------
    let cartDivImg = document.createElement("div");
    cartDivImg.className = "cart__item__img";
    cartArticle.appendChild(cartDivImg);


    //------------Création de l'élement img-------------------

    
    let cartImg = document.createElement("img")
    cartImg.setAttribute("src",cartdata.img);
    cartImg.setAttribute("alt","Photographie d'un canapé");
    cartDivImg.appendChild(cartImg);
    


    //------------Création de la div container---------------
    let cartDivContainer = document.createElement("div");
    cartDivContainer.className = "cart__item__content";
    cartArticle.appendChild(cartDivContainer);


    //-----------Création de la div  description----------------
    let cartDivDescription = document.createElement("div");
    cartDivDescription.className = "cart__item__content__description";
    cartDivContainer.appendChild(cartDivDescription);


    //-----------Création élement h2 (nom) enfant la div description-------------
    let cartTitle = document.createElement("h2");
    cartTitle.innerHTML = cartdata.name;
    cartDivDescription.appendChild(cartTitle);


    //----------Création élement p (couleur) enfant la div description----------
    let cartColor = document.createElement("p");
    cartColor.innerHTML = (cartdata.color);
    cartDivDescription.appendChild(cartColor);


    //-----------Création élement p (prix) efant la div description---------
    let cartPrice = document.createElement("p");
    cartPrice.innerHTML = (cartdata.price) + " €";
    cartDivDescription.appendChild(cartPrice);


    //-----------Création d'une div Settings------------------------
    let cartDivSettings = document.createElement("div");
    cartDivSettings.className = "cart__item__content__settings";
    cartDivContainer.appendChild(cartDivSettings);


    //-----------Création d'une div SettingsQuantity --------------
    let cartDivSettingsQuantity = document.createElement("div");
    cartDivSettingsQuantity.className = "cart__item__content__settings__quantity";
    cartDivSettings.appendChild(cartDivSettingsQuantity);

    //----------Création élement p---------------------
    let cartQuantity = document.createElement("p");
    cartQuantity.innerHTML = (cartdata.quantity);
    cartDivSettingsQuantity.appendChild(cartQuantity);

    //----------Création input----------------------------
    let cartInput = document.createElement("input");
    cartInput.className = "itemQuantity";
    //cartInput.name = "itemQuantity"
    cartInput.value = cartdata.quantity
    cartInput.setAttribute("type", "number");
    cartInput.setAttribute("name", "itemQuantity");
    cartInput.setAttribute("min", "1");
    cartInput.max = "100";
    cartInput.setAttribute("value", "42");
    cartDivSettingsQuantity.appendChild(cartInput);
    cartInput.addEventListener("input",function(e) {

        let num = this.value.match("^([1-9]|[1-9][0-9]|100)$");
        if (num === null|| num == true) {
            
            
           // checkNumber(cartInput)
            this.value = "1";
            alert('choississez entre un nombre compris entre 1 et 100.')

        }else{}
        
    
            saveToStorage(cartdata.id,cartInput.value, cartQuantity, e)  // cartInput.value
  
            //checkNumber(cartInput)
        
        
        });


    //--------- -----Création div delete----------------------------------
    let cartDivDelete = document.createElement("div");
    cartDivDelete.className = "cart__item__content__settings__delete";
    cartDivSettingsQuantity.appendChild(cartDivDelete);
    cartDivDelete.addEventListener("click", () => {   
        
        popupDelete(productStorage,cartdata)
  

    });

    //-------------Création p delete---------------------------
    let cartDelete = document.createElement("p");
    cartDelete.className = "deleteItem";
    cartDelete.innerHTML = "Supprimer";
    cartDivDelete.appendChild(cartDelete);
 
    
    totalquantityProduct()
    totalPriceProduct()
    
    
}



//--------------- Calcul du Prix total des produits-----------
function totalPriceProduct() {

    let arrayPriceCart = []
    productStorage.forEach(item => {
        let totalPricePerProduct = item.quantity * item.price;
        arrayPriceCart.push(totalPricePerProduct)
    });
    //ajouter le "0" dans la methode reduce sinon message d'erreure
    let totalPriceCart = arrayPriceCart.reduce((a, b) => a + b,0);
    console.log(totalPriceCart);

    document.querySelector("#totalPrice").innerHTML = parseInt(totalPriceCart);

}
//--------------- Calcul de la Quantité total des produits-----------

function totalquantityProduct() {
 
    let totalQuantity = productStorage.map(product => product.quantity)
        .reduce((a, b) => a + b,0);    
        

    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
}

//--------------------AddEvenListener pour calculer les nouvelles valeurs----------------------------------

function saveToStorage(id,newvalue, cartQuantity, e) { //newValue
    e.preventDefault();

    let cartToUpdate = productStorage.find(item => item.id === id)
     cartToUpdate.quantity = Number(newvalue)
     cartQuantity.innerHTML = cartToUpdate.quantity
     
    //let price =document.querySelector('.cart__item__content__settings__quantity p ').innerHTML =  cartToUpdate.quantity
        console.log(productStorage)
        console.log(cartToUpdate)
      
        localStorage.setItem("cart", JSON.stringify(productStorage))    
       

    totalquantityProduct()
    totalPriceProduct()


}


//------------------------- Gestion du button supprimé de l'article -----------

 function popupDelete(productStorage,cartdata){
    const response =confirm("Vous êtes sur le point de supprimer un article de votre panier. Voulez-vous continuer ?");
    if(response){
         deleteProduct(productStorage,cartdata)
         console.log("ok")
    }
 }

function deleteProduct (productStorage,cartdata,){
 
   
 //besoin que de l'index (findindex) et non de lobjet entier avec ses values avec (find) method
 //avec la methode (delete) larray contient un objet effacé vide mais vide contrairement a la methode splice
    let found = productStorage.findIndex((item)=>item.id=== cartdata.id) 
    console.log('item to delete :', found)
    productStorage.splice(found,1);

    localStorage.setItem("cart", JSON.stringify(productStorage)) 
    window.location.reload()
    totalquantityProduct()
    totalPriceProduct()   
}


//-------------- Gestion du boutton commander-----------------


    const orderButton = document.querySelector('#order');
    orderButton.addEventListener('click', (e) => submitForm(e))

    //s'il manque des informations dans le formulaire on change la couleur en rouge de l'input vide
    //et affichage un popup  d'erreure dans la formulaire
    
function errorMessage(){

   const errmessage = document.querySelectorAll('.cart__order__form__question input'); // nodelist de tout les inputs du formaulaire.

errmessage.forEach( (input) => {
    if (input.value === ''){
        alert('Erreure champ vide, veuillez remplir tout les champs')
    }
})
}



//------------------------------------------ regex pour le formulaire----------------------------
function firstNameValidation(){
    const f = requestBody() 
    let nameError = document.getElementById('firstNameErrorMsg');

    const checkFirstname = f.contact.firstName;
    const regexName = /^[A-Za-z éèëôîï-]+$/gm ;

    if (regexName.test(checkFirstname)){
        nameError.innerText = '';
        return true;
    }else{
        nameError.innerText = "Le nom n'est pas valide";
    }
  }

  function lastName(){
    const l = requestBody()
    let lastNameError = document.getElementById('lastNameErrorMsg');
 
    const checkLastName = l.contact.lastName;
    const regexLastName = /^[A-Za-z éèëôîï-]+$/g;

    if(regexLastName.test(checkLastName)){
        lastNameError.innerText = '';
        return true
    }else{
        lastNameError.innerText = "Le prénom n'est pas valide."
    }
  }

  function address(){
    const a = requestBody() 
    let addressError = document.getElementById('addressErrorMsg');

    const checkAddress = a.contact.address;
    const regexAddress = /[A-Za-zéèëôîï0-9\'\.\-\s\,]{2,}/g; 
    if(regexAddress.test(checkAddress)){
        addressError.innerText ='';
        return true
    }else{
        addressError.innerText = "L'adresse n'est pas valide."
    }
  }

  function city(){
    const c = requestBody()
    let cityError = document.getElementById('cityErrorMsg'); 

    const checkCity = c.contact.city;
    const regexCity = /[a-zA-Z\'\.\-\s\,]{1,23}\D/g;
    if(regexCity.test(checkCity)){
        cityError.innerText = '';
        return true
    }else{
        cityError.innerText = "La ville n'est pas valide."
    }
    
  }

function emailValidation() {
        // const email = document.getElementById('email').value; 
    const e = requestBody()  
    const checkEmail = e.contact.email;
    let emailError = document.getElementById('emailErrorMsg');

  
   const regexEmail = /^([\w](\.|_)?)+[\w]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
   
    if (regexEmail.test(checkEmail)) {
        emailError.innerText = '';
      return true;
    } else {
      emailError.innerText = "Adresse e-mail non valide";     
    }
  } 


    function submitForm(e){
        e.preventDefault()
      if(errorMessage() ) {return}
       if(!firstNameValidation() || !lastName() || !emailValidation() || !address() || !city()) {return}

        if (productStorage.length === 0 ) {
            alert("Veuillez choisir un article")   
             return
          }
          const body = requestBody()

         fetch("http://localhost:3000/api/products/order",{
            method : 'POST',
             body: JSON.stringify(body),
            headers: {
                "Content-Type" : "application/json",
            }
         })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let orderId = data.orderId;
                window.location.href = "confirmation.html?orderId=" + orderId;
            })
            .catch(function(err) {
                alert("erreur de l'envoie du formulaire, veuillez reéssayer plus tard");
                console.log(err)
            });

}


   function requestBody(){
    const form = document.querySelector('.cart__order__form');  
        
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;

     const body = {
        contact:{                   //l'objet formData ne marche pas
           firstName: firstName,
           lastName: lastName,
           address: address,
           city: city,
           email: email
           },                     //oublie de la virgule  error bad request 400
           products: idProducts()    //on prend seulement les id du localstorage en tableau
        }
           return body
    }   

    function idProducts(){

    const ids = [];
    for(items of productStorage){
        ids.push(items.id)
    }
  return ids                //valeur de retour de la fonction
}

