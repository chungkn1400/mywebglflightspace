//jscompile_chung a program by NGUYEN.Chung (freeware 2014)
var op=" (){}[]+-*/=%&|<>!;,.:";
var let="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$";
//var cons="bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ$_";
var cons="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_";
var num="0123456789",letnum=let+num+"_";let=let+"_";
var varid=new Array(200*100),nvar=0;
function varexists(id){
  var test=false;
  try{if(eval(id) || eval("!"+id)){test=true;};}catch(e){}
  return test;
}
for(var i=0;i<let.length-1;i++){
    var id=let.substr(i,1)+"_";
	if(!isreserved(id)){varid[nvar]=id;nvar+=1;};}
for(var i=0;i<letnum.length-1;i++){
  for(var j=0;j<cons.length;j++){
    var id=cons.substr(j,1)+letnum.substr(i,1);
	if(!isreserved(id)){varid[nvar]=id;nvar+=1;};};}
for(var i=0;i<let.length-1;i++){
  for(var j=0;j<letnum.length;j++){
    var id=let.substr(i,1);
	id+=letnum.substr(j,1)+"_";
	if(!isreserved(id)){varid[nvar]=id;nvar+=1;};};}
for(var i=0;i<letnum.length;i++){
  for(var j=0;j<letnum.length;j++){
    var id="_"+letnum.substr(i,1);
	id+=letnum.substr(j,1);
	if(!isreserved(id)){varid[nvar]=id;nvar+=1;};};}
//for(var i=0;i<let.length;i++){
//  for(var j=10;j<100;j++){
//    varid[nvar]=let.substr(i,1)+j;
//	if(!isreserved(varid[nvar]){nvar+=1;};};}
var gvarid=[],ivar=0,skipvar=0;
function issystem(id){
  var test=false;
  try{eval("var "+id+";");
  }catch(e){test=true;};
  return test;
}
function isreserved(id){
  var test=false;
  try{eval("var "+id+";");
  }catch(e){test=true;};
  if(test){return true;}
  if(varexists(id)){return true;}
  var id1=id.toLowerCase();//resetsizescreencombofocuskey
  //if(id1.indexOf("gl")>=0){return true;}
  //if(id1.indexOf("mat")>=0){return true;}
  //if(id1.indexOf("pro")>=0){return true;}
  //if(id1.indexOf("draw")>=0){return true;}
  if(id1.indexOf("google")>=0){return true;}
  if(id1.indexOf("location")>=0){return true;}
  if(id1.indexOf("type")>=0){return true;}
  if(id1.indexOf("name")>=0){return true;}
  if(id1.indexOf("radius")>=0){return true;}
  if(id1.indexOf("zoom")>=0){return true;}
  if(id1.indexOf("navigator")>=0){return true;}
  if(id1.indexOf("keyup")>=0){return true;}
  if(id1.indexOf("keydown")>=0){return true;}
  if(id1.indexOf("keypress")>=0){return true;}
  if(id1.indexOf("waitkey")>=0){return true;}
  if(id1.indexOf("reset")>=0){return true;}
  if(id1.indexOf("screen")>=0){return true;}
  if(id1.indexOf("combo")>=0){return true;}
  if(id1.indexOf("focus")>=0){return true;}
  if(id1.indexOf("subchat")>=0){return true;}
  if(id1.indexOf("subquit")>=0){return true;}
  //if(id1.indexOf("uni")>=0){return true;}
  //if(id1.indexOf("buf")>=0){return true;}
  //if(id1.indexOf("buf")>=0){return true;}
  return test;
}
function getvarid(id){
  //if(id=="skip"){skipvar=1;}
  if(id.length<=1){return id;}
  if(eval("window."+id)){return id;}
  if(typeof(gvarid[id])=="string"){return gvarid[id];}
  if(isreserved(id)){return id;}
  //if(skipvar==1){return id;}
  //try{if(eval(id) || eval("!"+id)){gvarid[id]=id;return gvarid[id];};}catch(e){}
  //try{
   if(ivar<nvar){
        //gvarid[id]=id;//varid[ivar];
        gvarid[id]=varid[ivar];
        ivar+=1;
        return gvarid[id];}
  //}catch(e){auxvar+=1;a$=newid+"id="+id;};
  return id;
}
var nmsgerr=0;
function msgerr(text,i,msg,line){
 if(nmsgerr>=4){return;}
 nmsgerr+=1;
 if(i>400){alert("warning: "+msg+"/line="+line+"/txt="+text.substr(i-400,401));
 }else{alert("warning: "+msg+"/line="+line+"/txt="+text.substr(0,i+10));}
}
function alertmsg(msg){
 if(nmsgerr>=4){return;}
 nmsgerr+=1;
 alert(msg);
}
var bracket=new Array(101),ibracket=0;
function pushbracket(key){
   if(ibracket>=100){alertmsg("bracket>100 !");}else{
     ibracket+=1;bracket[ibracket]=key;};}
function popbracket(key){
   if(ibracket<1){alertmsg("bracket<=0 !");}else{
      if(bracket[ibracket].indexOf(key)<0){
        alertmsg("bracket error found="+key+" expected="+bracket[ibracket]);}
      ibracket-=1;
      }
}

function compile(text0){//return text0;
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a=" ",b="",c="",d="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1,newcompile=0,isempty=1,line=0,newvar=1,id0="";
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case "'":
	var txt2="";isempty=0;
    while(i<n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a=="'"){
			    if(newcompile>=2){txt+=a+compile2(txt2.substr(1,n),'"')+a;
				}else{txt+=txt2+a;};newcompile=0;newvar=0;break;};};	
			   break;
    case '"':
	var txt2="";isempty=0;
	while(i<n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a=='"'){
			    if(newcompile>=1){txt+=a+compile2(txt2.substr(1,n),"'")+a;
				}else{txt+=txt2+a;};newcompile=0;newvar=0;break;};};
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	line+=1;
	     //if(isempty==0){txt+=lf;}
		 d=txt.substr(txt.length-1,1);
		 if(isempty==0 && d!=";"){if(d=="}"){txt+=lf;}else{txt+=lf;};}
		 //if(isempty==0 && newvar==0){txt+=lf;}
	     //if(isempty==0 && d=="}"){txt+=lf;}
		 //else if(isempty==0 && (letnum+"'"+'"').indexOf(d)>=0){txt+=lf;}	 
		    isempty=1;newvar=1;a=" ";
	        newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){txt+="";break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	isempty=0;
	txt+=a;newid=1;newvar=1;break;
    default:
	isempty=0;
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;				             
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        var txt2=getvarid(id);
							if(txt2=="setTimeout" || txt2=="eval"){
							   newcompile=1;}
        					txt+=txt2;
							if(issystem(txt2)){newvar=1;id0=txt2;
							}else{if(newid==1 && newvar==0 && id0==""){
							         msgerr(text,i,"var error1 ",line);}
							      newvar=0;id0="";}
							break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){if(newid==1 && newvar==0){
	                      msgerr(text,i,"var error2 ",line);};
						  newid=0;newvar=0;id0="";
	}else if(a=="."){newid=0;newvar=0;id0="";
	}else if(a.charCodeAt(0)==92){newid=0;newvar=0;id0="";//"\\"
	}else if(op.indexOf(a)>=0){newid=1;if(a!=" "){newvar=1;};}
	if(newcompile>=1){if(a=="("){newcompile+=1;};
	                  if(a==")"){newcompile-=1;if(newcompile==1){newcompile=0;};};
					  }
    if("{([".indexOf(a)>=0){if(a=="{"){pushbracket("}");}
	                        if(a=="("){pushbracket(")");}
							if(a=="["){pushbracket("]");}
                         if(ibracket>=100){msgerr(text,i,"bracket error",line);};}
    if("})]".indexOf(a)>=0){if(ibracket<1){msgerr(text,i,"bracket error",line);
                            }
							popbracket(a);}
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,400));
return txt;
}
function compile2(text0,c$){//return text0;$$$
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a=" ",b="",c="",d="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1,newcompile=0,isempty=1;
var d$;
if(c$=="'"){d$='"';}else{d$="'";}
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$:
	var txt2="";
    while(i<=n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a==c$){
			    if(newcompile>=2){txt+=a+compile3(txt2.substr(1,n),d$)+a;
				}else{txt+=txt2+a;};newcompile=0;break;};};
               if(a!=c$){txt+=txt2;}				
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	     //if(isempty==0){txt+=lf;}
		 d=txt.substr(txt.length-1,1);
		 if(isempty==0 && d!=";"){if(d=="}"){txt+=lf;}else{txt+=lf;};}
		    isempty=1;a=" ";
	        newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){txt+="";break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	isempty=0;
	txt+=a;newid=1;break;
    default:
	isempty=0;
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        var txt2=getvarid(id);
							if(txt2=="setTimeout" || txt2=="eval"){
							   newcompile=1;}
        					txt+=txt2;
							break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(a.charCodeAt(0)==92){newid=0;//"\\"
	}else if(op.indexOf(a)>=0){newid=1;}
	if(newcompile>=1){if(a=="("){newcompile+=1;};
	                  if(a==")"){newcompile-=1;if(newcompile==1){newcompile=0;};};
					  }
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,300));
return txt;
}
function compile3(text0,c$){//return text0;
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a=" ",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1;
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$://"'":
    while(i<=n){txt+=a;a=text.substr(i,1);i+=1;
               if(a==c$){txt+=a;break;};};
               if(a!=c$){txt+=a;}				
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	txt+=lf;newid=1;a=" ";
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	txt+=a;newid=1;break;
    default:
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        txt+=getvarid(id);
        					break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(op.indexOf(a)>=0){newid=1;}
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,100));
return txt;
}
function compile_(text0){//return text0;
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a="",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1,newcompile=0,isempty=1;
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case "'":
	var txt2="";
    while(i<n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a=="'"){
			    if(newcompile>=2){txt+=a+compile2(txt2.substr(1,n),'"')+a;
				}else{txt+=txt2+a;};newcompile=0;break;};};	
			   break;
    case '"':
	var txt2="";
	while(i<n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a=='"'){
			    if(newcompile>=1){txt+=a+compile2(txt2.substr(1,n),"'")+a;
				}else{txt+=txt2+a;};newcompile=0;break;};};
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	     if(isempty==0){txt+=lf;}
		    isempty=1;
	        newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){txt+=lf;break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	isempty=0;
	txt+=a;newid=1;break;
    default:
	isempty=0;
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        var txt2=getvarid(id);
							if(txt2=="setTimeout" || txt2=="eval"){
							   newcompile=1;}
        					txt+=txt2;
							break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(a.charCodeAt(0)==92){newid=0;//"\\"
	}else if(op.indexOf(a)>=0){newid=1;}
	if(newcompile>=1){if(a=="("){newcompile+=1;};
	                  if(a==")"){newcompile-=1;if(newcompile==1){newcompile=0;};};
					  }
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,100));
return txt;
}
function compile2_(text0,c$){//return text0;$$$
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a="",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1,newcompile=0,isempty=1;
var d$;
if(c$=="'"){d$='"';}else{d$="'";}
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$:
	var txt2="";
    while(i<=n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a==c$){
			    if(newcompile>=2){txt+=a+compile3(txt2.substr(1,n),d$)+a;
				}else{txt+=txt2+a;};newcompile=0;break;};};
               if(a!=c$){txt+=txt2;}				
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	     if(isempty==0){txt+=lf;}
		    isempty=1;
	        newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){txt+=lf;break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	isempty=0;
	txt+=a;newid=1;break;
    default:
	isempty=0;
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        var txt2=getvarid(id);
							if(txt2=="setTimeout" || txt2=="eval"){
							   newcompile=1;}
        					txt+=txt2;
							break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(a.charCodeAt(0)==92){newid=0;//"\\"
	}else if(op.indexOf(a)>=0){newid=1;}
	if(newcompile>=1){if(a=="("){newcompile+=1;};
	                  if(a==")"){newcompile-=1;if(newcompile==1){newcompile=0;};};
					  }
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,300));
return txt;
}
function compile3_(text0,c$){//return text0;
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a="",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1;
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$://"'":
    while(i<n){txt+=a;a=text.substr(i,1);i+=1;
               if(a==c$){txt+=a;break;};};
               if(a!=c$){txt+=a;}				
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	txt+=lf;newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	txt+=a;newid=1;break;
    default:
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        txt+=getvarid(id);
        					break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(op.indexOf(a)>=0){newid=1;}
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,100));
return txt;
}
function compile20(text0,c$){
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a="",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1,newcompile=0,d$;
if(c$=="'"){d$='"';}else{d$="'";}
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$:
	var txt2="";
    while(i<n){txt2+=a;a=text.substr(i,1);i+=1;
               if(a==c$){
			    if(newcompile>=2){txt+=a+compile3(txt2.substr(1,n),d$)+a;
				}else{txt+=txt2+a;};newcompile=0;break;};};	
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	txt+=lf;newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	txt+=a;newid=1;break;
    default:
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        var txt2=getvarid(id);
							if(txt2=="setTimeout" || txt2=="eval"){
							   newcompile=1;}
        					txt+=txt2;
							break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(op.indexOf(a)>=0){newid=1;}
	if(newcompile>=1){if(a=="("){newcompile+=1;};
	                  if(a==")"){newcompile-=1;if(newcompile==1){newcompile=0;};};
					  }
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,100));
return txt;
}
function compile30(text0,c$){
var text=text0+" ";
var txt="",n=text.length-1,i=0,j=0,k=0,a="",b="",c="",test=0;
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var cr=String.fromCharCode(13),lf=String.fromCharCode(10);
var newid=1;
while(i<n){
 c=a;
 a=text.substr(i,1);
 b=text.substr(i+1,1);
 i+=1;
 if(test==0){
   switch (a){
 	case c$://"'":
    while(i<n){txt+=a;a=text.substr(i,1);i+=1;
               if(a==c$){txt+=a;break;};};
			   break;
    case " ":
	if(op.indexOf(b)>=0){
	}else if(op.indexOf(c)>=0){
	}else if(b=="'" || b=='"' || b==cr || b==lf){
	}else{txt+=a;};
	          newid=1;
	          break;	
    case cr :
	//txt+=" ";if(b==lf){i+=1;};
	          newid=1;
	          break;	
    case lf :
	txt+=lf;newid=1;
	        break;
    case "/" :
    if(b=="/"){i+=1;	
       while(i<n){a=text.substr(i,1);i+=1;
            if(a==cr || a==lf){break;};};break;}
    if(b=="*"){i+=1;	
       while(i<n){a=text.substr(i,1);b=text.substr(i+1,1);i+=1;
            if(a=="*"){if(b=="/"){i+=1;break;};};};break;}
	txt+=a;newid=1;break;
    default:
	if(newid==1){if(let.indexOf(a)>=0){
	             var id=a;
                 while(i<n){b=text.substr(i,1);
				      if(letnum.indexOf(b)>=0){id+=b;i+=1;
					  }else{if(b=="."){newid=0;};
					        txt+=getvarid(id);
        					break;}
					  }
				 break;};}
	if(num.indexOf(a)>=0){newid=0;
	}else if(a=="."){newid=0;
	}else if(op.indexOf(a)>=0){newid=1;}
	txt+=a;break;
   };	
 }
}
//alert(ivar+"/"+auxvar);
//alert(txt.substr(0,100));
return txt;
}
