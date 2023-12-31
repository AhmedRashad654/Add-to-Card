
var products = document.querySelector( ".products" );
var card = document.querySelector( '.card' );
var d = document.querySelector( '.tot' );
var nu = document.querySelector( ".num" );
var nume;
var con = 1;
if ( localStorage.getItem( "number" ) ) {
    nume = localStorage.number;
} else {
    nume = 0;
}

var subtot;
   if ( localStorage.getItem( 'subtot' ) ) {
      subtot =parseFloat(localStorage.subtot);

    } else {
        subtot = 0
} 
  var arr;
    if ( localStorage.getItem( 'product' ) ) {
        display()
    } else {
        arr = [];
    }
     function display() {
         arr = JSON.parse( localStorage.product );
            card.innerHTML = "";
            for (var i = 0; i < arr.length; i++) {
                card.innerHTML +=
                    `
                    <div class="one">
                        <img src="${arr[i].imgpro}">
                        <p class="l">${arr[i].titlepro}</p>
                        <p class="pr">${arr[i].pricepri} x <span class="sa">${arr[i].c}</span>$</p>
                        <button onclick='delproduct("${arr[ i ].idpro}")'>remove</button>
                        <button onclick = 'increase("${arr[i].idpro}")'>increase</button>
                        <button onclick = 'decrease("${arr[ i ].idpro}")'>decrease</button>
                    </div>
                `;
            }
           
         d.innerHTML = parseFloat( subtot ).toFixed( 2 );
         nu.innerHTML = nume; 
}
function increase( nim ) {
    arr = JSON.parse(localStorage.product);
    for ( let i = 0; i < arr.length; i++ ){
        if ( arr[ i ].idpro == nim ) {
            var ode = arr[ i ].c;
            var tde = arr[ i ].pricepri;
            ode++;
            arr[ i ].c = ode;
            localStorage.setItem( 'product', JSON.stringify( arr ) )
            nume++;
            localStorage.setItem( 'number', nume );
            subtot +=parseFloat(tde);
            localStorage.setItem( 'subtot', (subtot).toFixed(2) );
            display();
        }
    }
}
function decrease( nem ) {
    arr = JSON.parse(localStorage.product);
    console.log( arr )
    for ( let i = 0; i < arr.length; i++ ){
        if ( arr[ i ].idpro == nem ) {
            var ode = arr[ i ].c;
            if ( ode > 1 ) {
                 var tde = arr[ i ].pricepri;
            ode--;
            arr[ i ].c = ode;
            localStorage.setItem( 'product', JSON.stringify( arr ) )
            nume--;
            localStorage.setItem( 'number', nume );
                subtot -= parseFloat(tde);
            localStorage.setItem( 'subtot', (subtot).toFixed(2) );    
            display();
            }
        }
    }
  }
// localStorage.clear()
    function delproduct(num) {
            arr = JSON.parse(localStorage.product);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].idpro == num) {
                    var ty = arr.splice( i, 1 ); 
                    // console.log(ty)
                    var tyu = ty[ 0 ].pricepri
                    var quan = ty[0].c
                    var plas = tyu * quan;
                    // console.log(tyu)
                    subtot -= Number( plas );
                    nume -=quan;
                    localStorage.setItem( "product", JSON.stringify( arr ) );
                    localStorage.setItem( "subtot", subtot.toFixed( 2 ) );
                    localStorage.setItem("number",nume)
                    display();
                    break; 
                }
            }
}


    // localStorage.clear()
$( function () {
    $.ajax( {
        url: 'https://fakestoreapi.com/products',
                type:'get',
                contenytType:'json',
                dataType:'json',
        success: function ( res ) { 
          console.log(res)
            for ( var i = 0; i <10; i++ ){
                products.innerHTML += `
                    <div class="product">
                        <p class="i">${res[i].id}</p>
                        <img src="${res[i].image}">
                        <h4 class="title">${res[i].title}</h4>
                        <p class="price">${res[ i ].price}</p>
                        <span class="s">${con}</span>
                        <button class='btn')>Add To Card</button>
                    </div>
                `
            }
        }
    } )
 
   
    $( document ).on( 'click', '.btn', function () {
        var id =$(this).parent().find('.i').text()
        var title = $( this ).parent().find( '.title' ).text();
        var price = $( this ).parent().find( '.price' ).text();
        var img = $( this ).parent().find( 'img' ).attr( 'src' );
        var concou = $( this ).parent().find( 'span' ).text();
        // console.log(concou)
        subtot += parseFloat( price );
        localStorage.setItem( "subtot", parseFloat( subtot ).toFixed( 2 ) );
        nume++;
        localStorage.setItem( "number", nume );     



        var present = 0;
        if ( localStorage.getItem( "product" ) ) {
            var dan = JSON.parse( localStorage.product );
            if ( dan.length >= 1 ) {
                for ( let i = 0; i < dan.length; i++ ){
                    if ( dan[ i ].idpro == id ) {
                        var get = JSON.parse( localStorage.getItem( "product" ) );
                        var flo = get[i].c
                        var pafl = parseFloat( flo );
                        pafl++;
                        get[i].c = pafl;
                        localStorage.setItem( "product", JSON.stringify( get ) );
                        present = 1;
                        break;                   
                    }
                }    
                if ( present == 0 ) {
                        var obj = {
                         idpro:id,
                         titlepro: title,
                         pricepri: price,
                         imgpro: img,
                         c:concou
                    }
                 arr.push( obj )
                 localStorage.setItem( "product", JSON.stringify( arr ) )  
                }
            }
            else {
                     var obj = {
            idpro:id,
            titlepro: title,
            pricepri: price,
            imgpro: img,
            c:concou
        }
        arr.push( obj )
        localStorage.setItem( "product", JSON.stringify( arr ) )
            }   
    } 
        else {
                var obj = {
            idpro:id,
            titlepro: title,
            pricepri: price,
            imgpro: img,
            c:concou
        }
        arr.push( obj )
        localStorage.setItem( "product", JSON.stringify( arr ) )
            }
        display()
    } ); 
    });


