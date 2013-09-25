

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_validateForm() { //v4.0

  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
        if (document.form1.nada.value=='nada'){  errors += '- Anrede bitte auswählen.\n'; }
	      if (document.form1.fieldn.value==''){  errors += '- Name bitte angeben.\n'; }
		  if (document.form1.fieldv.value==''){  errors += '- Vorname bitte angeben.\n'; }
		 if (document.form1.fields.value==''){  errors += '- Strasse bitte angeben.\n'; }  
			 if (document.form1.fieldp.value==''){  errors += '- PLZ bitte angeben.\n'; }
			if (document.form1.fieldo.value==''){  errors += '- Ort bitte angeben.\n'; }
		   if (document.form1.fielde.value==''){  errors += '- Email bitte angeben.\n'; }
		   if (document.form1.fieldt.value==''){  errors += '- Telefon bitte angeben.\n'; }
		   if (document.form1.Tag.value==''){  errors += '- Geburtstag bitte angeben.\n'; }
		     		   	if (document.form1.Monat.value==''){  errors += '- Geburtsmonat bitte angeben.\n'; }
				   		   if (document.form1.Jahr.value==''){  errors += '- Geburtsjahr bitte angeben.\n'; }
 
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- Email Adresse hat kein gültiges Format.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (isNaN(val)) errors+='- '+nm+' bitte nur Ziffern eintragen.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' nur Zahlen eingeben zwischen '+min+' und '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } 
    if (document.form1.email.value!=''){  errors = '- Übermittlungsfehler. Das Formular wurde zur&uuml;ckgesetzt. \nBitte f&uuml;llen Sie das Formular nochmals aus und senden Sie Ihre Anfrage erneut.\nFalls der Fehler wieder auftritt, bitten wir Sie, uns Ihre Anfrage per Email zu senden. \nDanke!\n'; document.form1.reset()} else {
	 if (document.form1.eingabefeld.value!=''){  errors = '- Übermittlungsfehler. Das Formular wurde zur&uuml;ckgesetzt. \nBitte f&uuml;llen Sie das Formular nochmals aus und senden Sie Ihre Anfrage erneut.\nFalls der Fehler wieder auftritt, bitten wir Sie, uns Ihre Anfrage per Email zu senden. \nDanke!\n'; document.form1.reset()}}
 

												   var verl = 0;
																			   		   if (document.form1.verlaengern[1].checked==true){  verl=1; }  
																					   if (document.form1.verlaengern[0].checked==true){  verl=1; }  
																					   

 if (verl==0){  errors += '- Bitte Laufzait wählen.\n'; }  
     		 
										   		   if (document.form1.widerruf.checked==false){  errors += '- Bitte Widerruf bestätigen.\n'; }  
												   if (errors) alert('Bitte beachten:\n'+errors);
  document.MM_returnValue = (errors == '');
}