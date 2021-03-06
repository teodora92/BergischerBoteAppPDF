function loadPage(url) {

	url = currentURL.replace(/\//g,"\\");
	
	//url = rootURL + url;
	//alert(encodeURLComponent(rootURL + url));
	
	
	// make call to service
	function callback(data) {
			
	}
	
	$.ajax({
			type: 'GET',
			url: rootURL + encodeURIComponent(url),
			dataType: 'jsonp',
			jsonp: 'callback',
			crossDomain: true,
			success: function(data) {
				switch(currentPage)
				{
					case "home":
						displayHome(data.data);
						break;
					default:
						displayData(data.data);
				}
				
			},
			error: function(xhr, textStatus, thrownError) {
				
				if(textStatus == "timeout") {
					alert('timeout');
				}
				else {
					
					alert('error');
				}
			},
			complete: function(request, textStatus) { 
				
			},
			
			jsonpCallback: 'callback'
		});

}

function displayHome(data) {
	$('#content').empty();
	// make links universally visible
	data = data.replace(/<img src="/g,"<img src=\"" + rootClientURL); 
	data = data.replace(/href="/g,"href=\"" + rootClientURL);
	var pdfList = [];
	
	var dataCopy = data;
	var index, endIndex;
	
	// get current magazine pdf files and images
	do {
		index = dataCopy.indexOf('<a href=\"'+rootClientURL+'aktuelle-Ausgabe/PDF');
		endIndex = dataCopy.indexOf('>', index);
		if(dataCopy.substring(index, endIndex+1).indexOf('.pdf') != -1) {
			var string = dataCopy.substring(index, endIndex+1);
			var indexStart = string.indexOf('/PDF') + 5;
			var namePart = string.substring(indexStart, indexStart+4);
			var candidate = dataCopy.substring(index, endIndex+1);
			
			
			
			var indexImageStart = dataCopy.toLowerCase().indexOf('<img src="' + rootClientURL.toLowerCase() + 'aktuelle-ausgabe/cover/' + namePart.toLowerCase());
			
			if(indexImageStart != -1) {
				var indexImageEnd = dataCopy.indexOf('>', indexImageStart);
				
				var result = dataCopy.substring(index, endIndex) + 'class="rotatingImage">' + dataCopy.substring(indexImageStart, indexImageEnd + 1) + '</a>';
				pdfList.push(result);
			}
			
			
		}
		dataCopy = dataCopy.substring(endIndex);
	}
	while(index != -1);
	//$('#content').append('<h1 class="normalH1">Aktuelle Ausgabe</h1>');
	$('#content').append('<div id="swipe3d"></div>');
	$('#swipe3d').append('<div id="container3d"></div>');
	$('#container3d').append('<div id="carousel"></div>');
	
	// Append pdf gallery
	var i;
	for(i = 0; i < pdfList.length; ++i) {
		$('#carousel').append('<figure class="link">' + pdfList[i] + '</figure>');
	}
	for(i = 0; i < pdfList.length; ++i) {
		$('#carousel').append('<figure class="link">' + pdfList[i] + '</figure>');
	}
	
	// create the 3d scrolling effect
	var transformProp = Modernizr.prefixed('transform');

    function Carousel3D ( el ) {
      this.element = el;
      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;
      this.isHorizontal = true;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

	  
	  
      this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
	  
	  
	  
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;
	
      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        //panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
      }

      // hide other panels
      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

    };

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    };



    var init = function() {


      var carousel = new Carousel3D( document.getElementById('carousel') );

		  $('#swipe3d').swipe({
			swipe: function(event, direction, distance, duration, fingerCount) {
				if(direction == "left") {
					//alert('left');
					event.stopPropagation();
					carousel.rotation += carousel.theta * -1;
					carousel.transform();
					
				}
				
				if(direction == "right") {
					//alert('right');
					event.stopPropagation();
					carousel.rotation += carousel.theta;
					carousel.transform();
					
					
				}
			}
		});
		  
      // populate on startup
	  // IMPORTANT --> here modify with appropriate number of panels
      carousel.panelCount = pdfList.length * 2;// parseInt( panelCountInput.value, 10);
      carousel.modify();


      setTimeout( function(){
        document.body.addClassName('ready');
		
      }, 0);

    };
	// initialize 3d scroller
	init();
	
	$('.link').click(function() {
		
		$('#pageOver').attr('class', 'pageOverVis');
		
		var height = $( document ).height();
		var docHeight = height;
		var docWidth = $( document ).width();
		var width = height / 1.3685383244206773618538324420677;
		width *= 2;
		var dif = 0;
		if(width > docWidth) {
			width = docWidth;
			height = width * 1.3685383244206773618538324420677;
			height = height / 2;
			var dif = docHeight - height;
			dif = dif / 2;

		}
		var margin = width / 2;
		margin -= 32;
		$('.btnClose').css('margin-left', margin+ 'px');
		
		//$("#pageTurner").jFlip(width,height,{background:"#FFFFFF",cornersTop:true,scale:"fit", gradientColors:['#4F2727','#BBBBBB','#EFEFEF']});
		$('#mybook').booklet({pagePadding: 0, closed: true, width: width, height: height, pageNumbers: false,  next: '#custom-next', prev: '#custom-prev', hovers: false, manual: false});
		
		if(dif != 0) {
			$('#mybook').css('margin-top', dif + 'px');
		}
		//$( '#bb-bookblock' ).bookblock();
	});
	
	$('a').click(function(e) {
		e.preventDefault();
	});
	
	
	//$('#content').append('<div id="readDiv"><img id="glassesIcon" src="res/img/glassesIcon.png"></div>');
	$('#content').append('<div id="readDiv"><div id="readBtn" class="readBtn">Weiter lesen<img id="readImg" src="res/img/searchIconDark.png"></div></div>');
	
	$("#readBtn").mousedown(function(){
		$('#readBtn').attr('class', 'readBtnClicked');
		$('#readImg').attr('src', 'res/img/searchIconLight.png');
	});
	$("#readBtn").mouseup(function(){
		$('#readBtn').attr('class', 'readBtn');
		$('#readImg').attr('src', 'res/img/searchIconDark.png');
		
		$('#pageOver').attr('class', 'pageOverVis');
		
		var height = $( document ).height();
		var docHeight = height;
		var docWidth = $( document ).width();
		var width = height / 1.3685383244206773618538324420677;
		width *= 2;
		var dif = 0;
		if(width > docWidth) {
			width = docWidth;
			height = width * 1.3685383244206773618538324420677;
			height = height / 2;
			dif = docHeight - height;
			dif = dif / 2;
			//alert(dif);
			
		}
		var margin = width / 2;
		margin -= 32;
		$('.btnClose').css('margin-left', margin+ 'px');
		//$("#pageTurner").jFlip(width,height,{background:"#FFFFFF",cornersTop:true,scale:"fit", gradientColors:['#4F2727','#BBBBBB','#EFEFEF']});
		
		$('#mybook').booklet({pagePadding: 0, closed: true, width: width, height: height, pageNumbers: false,  next: '#custom-next', prev: '#custom-prev', hovers: false, manual: false});
		
		if(dif != 0) {
			$('#mybook').css('margin-top', dif + 'px');
		}
		
		//$( '#bb-bookblock' ).bookblock();
	});
	$("#readBtn").bind('touchstart', function(){
		$('#readBtn').attr('class', 'readBtnClicked');
		$('#readImg').attr('src', 'res/img/searchIconLight.png');
	}).bind('touchend', function(){
		$('#readBtn').attr('class', 'readBtn');
		$('#readImg').attr('src', 'res/img/searchIconDark.png');
		
		
		$('#pageOver').attr('class', 'pageOverVis');
		
		var height = $( document ).height();
		var docHeight = height;
		var docWidth = $( document ).width();
		var width = height / 1.3685383244206773618538324420677;
		width *= 2;
		var dif = 0;
		if(width > docWidth) {
			width = docWidth;
			height = width * 1.3685383244206773618538324420677;
			height = height/2;
			dif = docHeight - height;
			dif = dif / 2;
		}
		var margin = width / 2;
		margin -= 32;
		$('.btnClose').css('margin-left', margin+ 'px');
		//$("#pageTurner").jFlip(width,height,{background:"#FFFFFF",cornersTop:true,scale:"fit", gradientColors:['#4F2727','#BBBBBB','#EFEFEF']});
		$('#mybook').booklet({pagePadding: 0, closed: true, width: width, height: height, pageNumbers: false,  next: '#custom-next', prev: '#custom-prev', hovers: false, manual: false});
		
		if(dif != 0) {
			$('#mybook').css('margin-top', dif + 'px');
		}
		
		//$( '#bb-bookblock' ).bookblock();
	});
	
	$("#readBtn").click(function() {
		
		
	});
	
	
	
	$('#pageOver').swipe({
		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "left") {
			
				if(currentScale != 1.0) {
					return;
				}
				
				
				scroll1.destroy();
				scroll2.destroy();
				$('#custom-next').click();
				
			
				//alert('swiped left');
				//$('#pageTurner').trigger("flip.jflip");
				currentScrollPage += 2;
				if(currentScrollPage > 33) {
					currentScrollPage = 35;
					return;
				}
				var page1 = currentScrollPage-1;
				var page2 = currentScrollPage;
				setTimeout(function() {
					
					scroll1 = new iScroll('page'+page1, {zoom: true, vScrollbar: false, onZoomEnd: function() {
						currentScale = this.scale;
					}});
					
					
					scroll2 = new iScroll('page'+page2, {zoom: true, vScrollbar: false, onZoomEnd: function() {
						currentScale = this.scale;
					}});
				}, 2000);
			}
			
			if(direction == "right") {
				//document.getElementById('pageLeft').setAttribute('class', 'pageLeftVis');
				//document.getElementById('pageCenter').setAttribute('class', 'pageCenterInv');
				//alert('swiped right');
				//meny.open();
				if(currentScale != 1.0) {
					return;
				}
				
				currentScrollPage -= 2;
				if(currentScrollPage <= 1) {
					currentScrollPage = 1;
					$('#custom-prev').click();
					return;
				}
				scroll1.destroy();
				scroll2.destroy();
				$('#custom-prev').click();
				
				var page1 = currentScrollPage-1;
				var page2 = currentScrollPage;
				setTimeout(function() {
					
					scroll1 = new iScroll('page'+page1, {zoom: true, vScrollbar: false, onZoomEnd: function() {
						currentScale = this.scale;
					}});
					
					
					scroll2 = new iScroll('page'+page2, {zoom: true, vScrollbar: false, onZoomEnd: function() {
						currentScale = this.scale;
					}});
				
				}, 2000);

			}
		},
		tap: function(event, target) {
			alert('tapped');
		}
	});
	
	/*$('#pageOver').swipe({
		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "left") {
				alert('swiped left');
				//$('#pageTurner').trigger("flip.jflip");
				$('#bb-bookblock').bookblock('next');
			}
			
			if(direction == "right") {
				//document.getElementById('pageLeft').setAttribute('class', 'pageLeftVis');
				//document.getElementById('pageCenter').setAttribute('class', 'pageCenterInv');
				alert('swiped right');
				//meny.open();
				$('#bb-bookblock').bookblock('prev');

			}
		}
	});*/
	
	
	
	data = data.replace('content', 'newsContent');
	
	/*$('#content').append(data);
	
	$('#content #header').remove();
	$('#rechteSpalte').remove();
	$('#footer').remove();
	$('#custom-tweet-button').parent().remove();
	//$('img').unwrap(); // maybe not for some images
	
	document.getElementById('pageCenter').setAttribute('class', 'pageCenterVis');
	document.getElementById('pageLeft').setAttribute('class', 'pageLeftInv');
	*/
	//$('#content').append('<a href="http://bergischerbote.de/aktuelle-Ausgabe/PDF/BB04-2013web.pdf">Download pdf</a>');
	
	//centerScroll.refresh();
	
}

function displayData(data) {
	//alert(data);
	//alert(rootURL);
	$('#content').empty();
	data = data.replace(/<img src="/g,"<img src=\"" + rootClientURL); 
	data = data.replace(/href="/g,"href=\"" + rootClientURL);
	
	
	$('#content').append(data);
	
	//alert($('#content #header').length);
	$('#content #header').remove();
	$('#content h2').remove();
	$('#rechteSpalte').remove();
	$('#footer').remove();
	$('#custom-tweet-button').parent().remove();
	//$('img').unwrap(); // maybe not for some images
	
	document.getElementById('pageCenter').setAttribute('class', 'pageCenterVis');
	document.getElementById('pageLeft').setAttribute('class', 'pageLeftInv');

	//$('#content').append('<a href="http://bergischerbote.de/aktuelle-Ausgabe/PDF/BB04-2013web.pdf">Download pdf</a>');
	
	//centerScroll.refresh();
	
}



/*
	Navigation behavior
*/
function bindEvents() {

	$('#pageCenter').swipe({
		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "left") {
				//document.getElementById('pageLeft').setAttribute('class', 'pageLeftInv');
				//document.getElementById('pageCenter').setAttribute('class', 'pageCenterVis');
				//meny.close();
			}
			
			if(direction == "right") {
				//document.getElementById('pageLeft').setAttribute('class', 'pageLeftVis');
				//document.getElementById('pageCenter').setAttribute('class', 'pageCenterInv');
				
				//meny.open();


			}
		}
	});
	
	
	$('#pageLeft').swipe({
		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "left") {
				//document.getElementById('pageLeft').setAttribute('class', 'pageLeftInv');
				//document.getElementById('pageCenter').setAttribute('class', 'pageCenterVis');
				//meny.close();
			}
		}
	});
	
	
	
	
	$('#pageRight').swipe({
		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "right") {
				// here check current scale
				document.getElementById('pageRight').setAttribute('class', 'pageRightInv');
			}
		}	
	});
	
	
	
	$(".btnClose").bind('touchstart', function(){
		$(this).attr('src', 'res/img/btnCloseDark.png');
	}).bind('touchend', function(){
		$(this).attr('src', 'res/img/btnCloseLight.png');
	});
	
	$(".btnClose").mousedown(function(){
		$(this).attr('src', 'res/img/btnCloseDark.png');
	});
	$(".btnClose").mouseup(function(){
		$(this).attr('src', 'res/img/btnCloseLight.png');
	});
	// IMPORTAINT FOR FORMS
	/*centerScroll = new iScroll('wrapper', {
		vScrollbar: false,
		hScrollbar: false,
		hScroll: false,
		useTransform: false,
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
		}
	});*/
	
}



/*
	Starting function
*/

{

	/*var meny = Meny.create({
		// The element that will be animated in from off screen
		menuElement: document.querySelector( '#pageLeft' ),

		// The contents that gets pushed aside while Meny is active
		contentsElement: document.querySelector( '#pageCenter' ),

		// The alignment of the menu (top/right/bottom/left)
		position: 'left',


		// The width of the menu (when using left/right position)
		width: 200,
		// Use mouse movement to automatically open/close
		mouse: false,

		// Use touch swipe events to open/close
		touch: false

	});
	*/
	// universal variables
	var urlList = [];
	var rootClientURL = "http://www.bergischerbote.de/";
	var rootURL = "http://gyoca.com/cloud/demos/bergbote_pdf/res/php/getURL/:";
	// currentPage can be: ["home", "abo", "archive", "detail", "karriere", "jobs", "media", "impressum"]
	var currentPage, currentScale = 1.0, currentURL;
	var menuScroll, centerScroll;
	var frontPageScroll, scroll1, scroll2;
	var currentScrollPage = 1;
	
	// on load behavior
	document.addEventListener('DOMContentLoaded', function () { 
	
		$(window).load(function() {
			$('#menuList li').each(function() {
				urlList.push($(this).attr('url'));
			});
			
			currentURL = "http://www.bergischerbote.de/index.htm";
			currentPage = "home";
			loadPage(currentURL);
			
			//initScrolls();
			frontPageScroll = new iScroll('page1', {zoom: true, vScrollbar: false, onZoomEnd: function() {
				currentScale = this.scale;
			}});
			scroll1 = new iScroll('page2', {zoom: true, vScrollbar: false, onZoomEnd: function() {
				currentScale = this.scale;
			}});
			scroll2 = new iScroll('page3', {zoom: true, vScrollbar: false, onZoomEnd: function() {
				currentScale = this.scale;
			}});
			bindEvents();
		});
		//loadHome();
		
	}, false);
	
	
	
	// back button and menu button functions for Android
	document.addEventListener("deviceready", function() {	
		
		//document.removeEventListener('backbutton', goLeft, false);
		document.addEventListener("backButton", function() {
			
		}, false);
		document.addEventListener("menubutton", function() {
			
		}, false);
			
	}, false);
	
	// resume app behavior
	document.addEventListener("resume", function() {
		
	}, false);

	
	
}