chrome.storage.local.get("enable", function (data) {
  if (data.enable) discreetMessenger();
});

function discreetMessenger() {
  var frenchDictionary = {};
  frenchDictionary["search"] = "Rechercher dans Messenger";
  frenchDictionary["discussions"] = "Discussions";
  frenchDictionary["communities"] = "Communautés";
  frenchDictionary["marketplace"] = "Marketplace";
  frenchDictionary["attachment"] = "pièce jointe";
  frenchDictionary["groupcall"] = "Appel vocal";
  frenchDictionary["publication"] = "publication";

  var englishDictionary = {};
  englishDictionary["search"] = "Search";
  englishDictionary["discussions"] = "Chats";
  englishDictionary["communities"] = "Communities";
  englishDictionary["attachment"] = "attachment";
  englishDictionary["groupcall"] = "Group audio call";
  englishDictionary["publication"] = "publication";
  englishDictionary["marketplace"] = "Marketplace";

  function modifyMessenger() {
    var lang = document.documentElement.getAttribute("lang");

    switch (lang) {
      case "en":
        var dictionary = englishDictionary;
        break;
      case "fr":
        var dictionary = frenchDictionary;
        break;
      default:
        var dictionary = englishDictionary;
    }

    document.title = "document";
    changeCssProperty("--header-height", "0px");
    changeCssProperty("--wash", "rgb(0,0,0);");
    changeCssProperty("--always-white", "black");
    changeCssProperty("--messenger-card-background", "rgb(0,0,0);");
    changeTabIcon();
    removeAllImages();
    tagRemover("div", "role", "img");
    tagRemover("div", "role", "banner");
    tagRemover("div", "aria-expanded", "true");
    tagRemover("div", "aria-expanded", "false");
    tagRemover("input", "placeholder", dictionary["search"]);

    changeSVG();
    tagRemoverCss(".facebook-logo-class");
    tagRemoverCss(".call-logo-class");
    tagRemoverCss(".call-logo-class");
    removeThemeBackgrounds();
    updateColors();

    removeReels(dictionary["attachment"]);
    removeCalls(dictionary["groupcall"]);

    removeGrandParentFromSpan("h1", 6, dictionary["discussions"]);
    removeGrandParentFromSpan("span", 4, dictionary["communities"]);
    removeGrandParentFromSpan("span", 6, dictionary["marketplace"]);
    removePublicationView(dictionary["publication"]);

    removeAllVideos();

    lightThemeSpecific();
  }

  function lightThemeSpecific() {
    if (document.documentElement.className.includes("light-mode")) {
      forceTxtInBlack();
    }
  }

  function forceTxtInBlack() {
    function textNodesUnder(el) {
      var n,
        a = [],
        walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      while ((n = walk.nextNode())) a.push(n);
      return a;
    }
    var textNodes = textNodesUnder(document.body);

    textNodes.forEach(function (node) {
      if (/\S/.test(node.nodeValue)) {
        if (node.parentElement) {
          node.parentElement.style.setProperty("color", "black", "important");
        }
      }
    });
  }

  function removeAllVideos(attachement) {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  }

  function removeReels(attachement) {
    document
      .querySelectorAll('a[aria-label*="' + attachement + '"]')
      .forEach((link) => {
        link.style.display = "none";
      });
  }

  function removeCalls(calls) {
    document
      .querySelectorAll('div[aria-label*="' + calls + '"]')
      .forEach((div) => {
        var newDiv = document.createElement("div");
        newDiv.textContent = "Appel vocal";
        div.parentNode.replaceChild(newDiv, div);
      });
  }

  function removePublicationView(publication) {
    document
      .querySelectorAll('a[aria-label*="' + publication + '"]')
      .forEach((publication) => {
        publication.style.display = "none";
      });
  }

  function changeSVG() {
    var svgs = document.querySelectorAll('[role="button"] svg');
    svgs.forEach(function (svg) {
      svg.style.opacity = 0.05;
    });
  }

  function removeAllImages() {
    var images = document.querySelectorAll("img");
    images.forEach((img) => (img.style.display = "none"));
  }

  function tagRemoverCss(selector) {
    var divs = document.querySelectorAll(selector);
    divs.forEach((div) => (div.style.display = "none"));
  }

  function tagRemover(tag, attribute, value) {
    var divs = document.querySelectorAll(
      tag + "[" + attribute + '="' + value + '"]'
    );
    divs.forEach((div) => {
      div.style.display = "none";

      if (
        (tag === "input" && attribute === "placeholder") ||
        (tag === "span" && value === "communities")
      ) {
        div.parentNode.parentNode.parentNode.parentNode.style.display = "none";
      }
    });
  }

  function removeThemeBackgrounds() {
    document.querySelectorAll("div").forEach(function (div) {
      if (
        div.style.cssText.includes("--messenger-header-background") ||
        div.style.cssText.includes("background-color") ||
        div.style.cssText.includes("linear-gradient")
      ) {
        div.style.backgroundImage = "none";
        div.style.backgroundColor = "transparent";
      }
    });
  }

  function changeTabIcon() {
    var link = document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href =
      "https://media.tenor.com/4ZumnU9loQEAAAAC/google-google-icon.gif";
  }

  function changeCssProperty(propertyName, value) {
    document.documentElement.style.setProperty(propertyName, value);
  }

  function removeGrandParentFromSpan(tag, level, txt) {
    document.querySelectorAll(tag).forEach((currentTag) => {
      if (currentTag.textContent.trim() === txt) {
        let parent = currentTag;
        for (let i = 0; i < level; i++) {
          if (parent.parentNode) {
            parent = parent.parentNode;
          }
        }
        if (parent && parent.parentNode) {
          parent.style.display = "none";
        }
      }
    });
  }

  function updateColors() {
    var styleSheets = document.styleSheets;

    var colorsToReplace = [
      "#E7F3FF",
      "rgba(0, 0, 0, 0.05)",
      "rgba(25, 110, 255, 0.15)",
      "#1877F2",
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
              rule.style.setProperty(property, "none", "important");
            }
          }
        }
      }
    }
  }

  modifyMessenger();

  var observer = new MutationObserver(function (mutations) {
    modifyMessenger();
  });
  var config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}
