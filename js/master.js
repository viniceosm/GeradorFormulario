window.onload = ()=>{
	transformarTextAreaCustomEditable();
	focarCampo('#txtEditor');
	prevenirTabIdentar();
	$('#txtEditor').on('keyup', function(){
		interpretarCodigoEditor()
	});
}

function focarCampo(selector){
	document.querySelector(selector).focus();
}

function transformarTextAreaCustomEditable() {
	var textAreaCustom = document.querySelectorAll('textarea.textAreaCustom');
	for (textArea of textAreaCustom) {
		// textArea.setAttribute('contenteditable', 'true');
		textArea.setAttribute('spellcheck', 'false');
	}
}

function prevenirTabIdentar(){
	$('textArea.textAreaCustom').on('keydown', function(e) {
		if (e.keyCode == 9) {
			$(this).focus();

			var caret = $(this).caret();
			console.log(caret);
			console.log($(this).val().substring(caret, caret+1));

			$(this).val( $(this).val().substring(0, caret) + '\t' + $(this).val().substring(caret, $(this).val().length));

			$(this).caret(caret+1);

			e.preventDefault();
		}
	});
}

function interpretarCodigoEditor(){
	var linhas = $('#txtEditor').val().split('\n');
	var resultado="";

	for (var i=0; i<linhas.length; i++) {
		var campo="";
		var maxAtributo=2;
		var atributos=linhas[i].split('.');

		//Se outros atributos forem undefined, deixa vazio
		for (var j=0; j<maxAtributo; j++) {
			if(typeof atributos[j] == 'undefined'){
				atributos[j]="";
			}
		}
		if(linhas[i]!==""){
			campo+=`${atributos[0]}<br>`
					+`\n<input type="text" id="${atributos[1]}" placeholder="${atributos[0]}">`;
		}
		linhas[i]=campo;
	}

	$('#txtResultado').val(linhas.join('\n'));
}
