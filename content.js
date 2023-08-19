var frenchDictionary = {};
frenchDictionary['search'] = 'Rechercher dans Messenger';
frenchDictionary['discussions'] = 'Discussions';
frenchDictionary['communities'] = 'Communautés';
frenchDictionary['marketplace'] = 'Marketplace';
frenchDictionary['attachment'] = 'pièce jointe';
frenchDictionary['groupcall'] = 'Appel vocal';
frenchDictionary['publication'] = 'publication';

var englishDictionary = {}
englishDictionary['search'] = 'Search';
englishDictionary['discussions'] = 'Chats';
englishDictionary['communities'] = 'Communities';
englishDictionary['attachment'] = 'attachment';
englishDictionary['groupcall'] = 'Group audio call';
englishDictionary['publication'] = 'publication';
englishDictionary['marketplace'] = 'Marketplace';


function modifyMessenger(englishDictionary) {
	var lang = document.documentElement.getAttribute('lang');

	switch (lang) {
	  case 'en':
		var dictionary = englishDictionary;
		break;
	  case 'fr':
		var dictionary = frenchDictionary;
		break;
	  default:
		var dictionary = englishDictionary;
	}

	
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
	tagRemoverCss('.facebook-logo-class');
	tagRemoverCss('.call-logo-class');
	tagRemoverCss('.call-logo-class');
	removeThemeBackgrounds();
	updateColors();
	
	removeReels(dictionary['attachment']);
	removeCalls(dictionary['groupcall']);
	
	tagRemover('input','placeholder',dictionary['search']);
	removeGrandParentFromSpan('h1',6,dictionary['discussions']);
	removeGrandParentFromSpan('span',4,dictionary['communities']);
	removeGrandParentFromSpan('span',6,dictionary['marketplace']);
	removePublicationView(dictionary['publication']);
}

function removeReels(attachement){
	document.querySelectorAll('a[aria-label*="'+attachement+'"]').forEach(link => {
		link.remove();
	});
}

function removeCalls(calls){
	document.querySelectorAll('div[aria-label*="'+calls+'"]').forEach(div => {
	  var newDiv = document.createElement('div');
	  newDiv.textContent = 'Appel vocal';
	  div.parentNode.replaceChild(newDiv, div);
	});
}

function removePublicationView(publication){
	document.querySelectorAll('a[aria-label*="'+publication+'"]').forEach(publication => {
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

function removeGrandParentFromSpan(tag,level,txt){
  document.querySelectorAll(tag).forEach( currentTag => {
	  if (currentTag.textContent.trim() === txt) {
		let parent = currentTag;
		for (let i = 0; i < level; i++) {
		  if (parent.parentNode) {
			parent = parent.parentNode;
		  }
		}
		if (parent && parent.parentNode) {
		  parent.remove();
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
            rule.style.setProperty(property, 'none', 'important');
          }
        }
      }
    }
  }
}

modifyMessenger(englishDictionary);

var observer = new MutationObserver(function(mutations) { modifyMessenger(englishDictionary); });
var config = { childList: true, subtree: true };
observer.observe(document.body, config);
