function modifyMessenger() {
	document.title = 'document';
	changeCssProperty('--header-height', '0px');
	changeCssProperty('--wash', 'rgb(0,0,0);');
	changeCssProperty('--messenger-card-background', 'rgb(0,0,0);');
	changeTabIcon();
	removeAllImages();
	tagRemover('div','role','img');
	tagRemover('div','role','banner');
	tagRemover('svg','role','presentation');
	changeSVG();
	tagRemover('input','placeholder','Rechercher dans Messenger');
	tagRemoverCss('.facebook-logo-class');
	tagRemoverCss('.call-logo-class');
	tagRemoverCss('.call-logo-class');
	removeGrandParentFromSpan(6,"Discussions");
	removeGrandParentFromSpan(4,"Communautés");
	removeGrandParentFromSpan(6,"Marketplace");
	removeThemeBackgrounds();
	removeReels();
	removeCalls();
	updateColors();
}

function removeReels(){
	document.querySelectorAll('a[aria-label*="pièce jointe"]').forEach(link => {
		link.remove();
	});
}

function removeCalls(){
	document.querySelectorAll('div[aria-label*="Appel vocal"]').forEach(div => {
	  var newDiv = document.createElement('div');
	  newDiv.textContent = 'Appel vocal';
	  div.parentNode.replaceChild(newDiv, div);
	});
}

function removePublicationView(){
	document.querySelectorAll('a[aria-label*="publication"]').forEach(publication => {
		publication.remove();
	});
}

function changeSVG(){
	var svgs = document.querySelectorAll('[role="button"] svg');
	svgs.forEach(function(svg) {
	  svg.style.opacity = 0.2;
	});
}

function removeAllImages(){
  var images = document.querySelectorAll('img');
  images.forEach(img => img.remove());
}

function tagRemoverCss(selector){
  var divs = document.querySelectorAll(selector);
  divs.forEach(div => div.remove());
}

function tagRemover(tag, attribute, value){
  var divs = document.querySelectorAll(tag + '[' + attribute + '="' + value + '"]');
  divs.forEach(div => div.remove());
}

function removeThemeBackgrounds(){
	document.querySelectorAll('div').forEach(function(div) {
	  if (	div.style.cssText.includes('--messenger-header-background') ||
			div.style.cssText.includes('background-color') ||
			div.style.cssText.includes('linear-gradient')) {
		  div.style.backgroundImage = 'none'; // Remove background image
		  div.style.backgroundColor = 'transparent'; // Remove background color
	  }
	});
}
	

function changeTabIcon(){
	var link = document.querySelector("link[rel~='icon']");

	if (!link) {
	  link = document.createElement('link');
	  link.rel = 'icon';
	  document.head.appendChild(link);
	}

	link.href = 'https://media.tenor.com/4ZumnU9loQEAAAAC/google-google-icon.gif';
}

function changeCssProperty(propertyName, value){
	document.documentElement.style.setProperty(propertyName,value);
}

function removeGrandParentFromSpan(level,txt){
  document.querySelectorAll('span').forEach(function(span) {
	  if (span.textContent.trim() === txt) {
		let parent = span;
		for (let i = 0; i < level; i++) {
		  if (parent.parentNode) {
			parent = parent.parentNode;
		  }
		}
		if (parent && parent.parentNode) {
		  parent.parentNode.removeChild(parent);
		}
	  }
	});
}

function updateColors() {
  var styleSheets = document.styleSheets;

  // List of colors to replace
  var colorsToReplace = [
    '#E7F3FF',
    'rgba(0, 0, 0, 0.05)',
    'rgba(25, 110, 255, 0.15)',
    '#1877F2'
  ];

  for (var i = 0; i < styleSheets.length; i++) {
    var styleSheet = styleSheets[i];
    for (var j = 0; j < styleSheet.cssRules.length; j++) {
      var rule = styleSheet.cssRules[j];
      if (rule.style) {
        for (var k = 0; k < rule.style.length; k++) {
          var property = rule.style[k];
          var value = rule.style.getPropertyValue(property);
          if (colorsToReplace.includes(value)) {
            // Replace the color with 'none'
            rule.style.setProperty(property, 'none', 'important'); // 'important' to override existing styles
          }
        }
      }
    }
  }
}

modifyMessenger();

var observer = new MutationObserver(function(mutations) { modifyMessenger(); });
var config = { childList: true, subtree: true };
observer.observe(document.body, config);
