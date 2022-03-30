//ESTO ES PARA LA LISTA DE LA COMPRA//

jQuery(function(){



lalista=window.localStorage.getItem("lalista");
ladespensa=window.localStorage.getItem("ladespensa");

if(lalista==null){
	lista=[];
}else{
	lista=JSON.parse(lalista);
}
if(ladespensa==null){
	despensa=[];
}else{
	despensa=JSON.parse(ladespensa);
}
actualizapantalla();
actualizapantalladespensa();


jQuery("#boton").click(meteenlalista);
jQuery("#botonguardar").click(meteenladespensa);

function meteenlalista(){
	elemento = jQuery("#texto").val();
	lista.push(elemento);
	console.log(lista);
	jQuery("#texto").val("");
	actualizapantalla();
	window.localStorage.setItem("lalista",JSON.stringify(lista));
	jQuery.mobile.navigate( "#pagina4",{ transition : "fade" } );
}


function meteenladespensa(){
	nombre = jQuery("#nombreproducto").val();
	lugar = jQuery("#select-native-1").val();
	foto =  jQuery("#fototxt").val();
    fecha = jQuery("#fecha").val();

	despensa.push({'nombre':nombre,'lugar':lugar,'foto':foto, 'fecha':fecha});
	jQuery("#nombreproducto").val("");
	jQuery("#fototxt").val("");
    jQuery("#fotoimg").attr("src","");
    jQuery("#foto").val("");
    jQuery("#fecha").val("");
	actualizapantalladespensa();
	window.localStorage.setItem("ladespensa",JSON.stringify(despensa));
	jQuery.mobile.navigate( "#pagina2",{ transition : "fade" } );
}
/******************************************************/
document.getElementById('foto').addEventListener('change', handleFileSelect);
function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      var base64String = window.btoa(binaryData);
      jQuery('#fototxt').val(base64String);
      jQuery('#fotoimg').attr('src','data:image/jpeg;charset=utf-8;base64,'+base64String);
    };
  })(f);
  
  reader.readAsBinaryString(f);
}
/******************************************************/

jQuery(document).on('click',".borra",eliminaitem);
jQuery(document).on('click',".borra2",eliminadespensa);


function eliminaitem(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	e.stopPropagation();
	var index = jQuery("#lista .itemdelista").index(jQuery(this).parent());
	lista.splice(index,1);
	window.localStorage.setItem("lalista",JSON.stringify(lista));
	actualizapantalla();
}
    
function eliminadespensa(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	e.stopPropagation();
	var index = jQuery("#despensa li").index(jQuery(this).parent());
	despensa.splice(index,1);
	window.localStorage.setItem("ladespensa",JSON.stringify(despensa));
	actualizapantalladespensa();
}


function actualizapantalla(){
	jQuery("#lista").html("");
	i=0;
	for(i=0; i<lista.length; i++){
		jQuery("#lista").append('<div class="itemdelista"><label class="item"><input type="checkbox">'+lista[i]+'</label><a class="borra" href="#">✕</a></div>').trigger('create');
	}

}



function actualizapantalladespensa(){
	jQuery("#despensa").html("");
	i=0;
	for(i=0; i<despensa.length; i++){
		
		var prefijo='data:image/jpeg;charset=utf-8;base64,';
		if(   despensa[i]['foto'].substring(0,4)=='http'   ){
			prefijo='';
		}

		jQuery("#despensa").append('<li class="ui-li-has-thumb ui-li-static ui-body-inherit ui-first-child"><img class="minifoto" src="'+prefijo+despensa[i]['foto']+'"> <h1>'+despensa[i]['nombre']+'</h1> <p><span class="minifecha">'+despensa[i]['fecha']+'</span> en '+despensa[i]['lugar']+'</p><p class="borra2" href="#">✕</p></li>').trigger('create');
		
	}

}

//ESTO ES PARA LA LISTA DE LA COMPRA//


jQuery('#video video').on('ended',function(){
      jQuery.mobile.navigate( "#pagina4",{ transition : "fade" } );
    });
//jQuery(document).on("pageshow","#pagina0",function(){
     jQuery("#video video")[0].play();
     console.log("Funciona video");
//});






$( "#fecha" ).datepicker({
  dateFormat: "dd/mm/yy"
});




































Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#lector')
        },
        decoder : {
          readers : ["ean_reader","ean_reader"]
        },
        locate: true,
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Preparado!");
          Quagga.start();
      });


    Quagga.onDetected(function(data){
      console.log(data['codeResult']['code']);
      Quagga.stop();

    })







Quagga.onDetected(function(data){
      Quagga.stop();
      jQuery.getJSON( "https://world.openfoodfacts.org/api/v0/product/"+data['codeResult']['code']+".json", function( data ) {
        //jQuery('body').html('<img src="'+data['product']['image_front_small_url']+'">');
        jQuery("#nombreproducto").val(data['product']['product_name']);
		jQuery("#fototxt").val(data['product']['image_front_small_url']);
		jQuery("#fotoimg").attr('src',data['product']['image_front_small_url']);
		jQuery.mobile.navigate( "#pagina1",{ transition : "fade" } );
      });

 


    });


});





