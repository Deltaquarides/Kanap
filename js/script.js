
const KanapProducts = fetch ("http://localhost:3000/api/products")
.then ((resp) => {
  if(resp.ok) {
     return resp.json();
    }
})
.then ((data)=> {
    console.log(data);    
      array(data)   
    // displayProduct();
      return data;
})
.catch(function(error) {
document.querySelector(".titles").innerHTML = 
"<h1> oups! une erreur s'est produite :(  </h1>"
 console.log("une erreur est survenue :( "+ error);
});


    function array(data){

//     // let userFullnames = data.map((element)=>{
//     //      displayProduct()
//     //       return  `${element._id}`
//     //     // `${element._id} ${element.imageUrl}
//     //     //  ${element.name} `;
//     // })
//     //  console.log(userFullnames);
      for (let datas of data){
        // console.log(datas.description);
        // console.log(datas.imageUrl);
        // console.log(datas.altTxt);
              displayProduct(datas);
    }
    }

 function displayProduct(datas){

let ProductsArticle = document.querySelector('#items');

//   create <a> element
const link = document.createElement('a');
link.setAttribute("href","./product.html?id=" + datas._id)
ProductsArticle.appendChild(link);

// create article element
const article = document.createElement('article');
link.appendChild(article);

// create img element
const img = document.createElement('img');
article.appendChild(img);
img.setAttribute("alt", datas.altTxt);
img.setAttribute("src", datas.imageUrl);

 // create element h3
 const h3 = document.createElement('h3');
 h3.className = 'productName';
 h3.textContent = datas.name;
 article.appendChild(h3)

//create element p
const p = document.createElement('p');
p.className = "productDescription";
p.innerHTML = datas.description;
article.appendChild(p)
// return displayProduct
}