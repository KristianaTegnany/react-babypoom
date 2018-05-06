let cssVarPoly = {
  init(variables) {
    // first lets see if the browser supports CSS variables
    // No version of IE supports window.CSS.supports, so if that isn't supported in the first place we know CSS variables is not supported
    // Edge supports supports, so check for actual variable support
    if (window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')) {
      // this browser does support variables, abort
      return;
    } else {
      document.querySelector('body').classList.add('cssvars-polyfilled');
    }

    cssVarPoly.oldCSS = {};
    
    // start things off
    cssVarPoly.findCSS(variables);
    cssVarPoly.updateCSS(variables);
  },

  // find all the css blocks, save off the content, and look for variables
  findCSS(variables) {
    let styleBlocks = document.querySelectorAll('style:not(.inserted),link[rel="stylesheet"]');

    // we need to track the order of the style/link elements when we save off the CSS, set a counter
    let counter = 1;

    // loop through all CSS blocks looking for CSS variables being set
    [].forEach.call(styleBlocks, function(block) {
      // console.log(block.nodeName);
      let theCSS;
      if (block.nodeName === 'STYLE') {
        // console.log("style");
        theCSS = block.innerHTML;
      } else if (block.nodeName === 'LINK') {
        // console.log("link");
        cssVarPoly.getLink(block.getAttribute('href'), counter, function(counter, request) {
          cssVarPoly.oldCSS[counter] = request.responseText;
          cssVarPoly.updateCSS(variables);
        });
        theCSS = '';
      }
      // save off the CSS to parse through again later. the value may be empty for links that are waiting for their ajax return, but this will maintain the order
      cssVarPoly.oldCSS[counter] = theCSS;
      counter++;
    });
  },


  // run through all the CSS blocks to update the variables and then inject on the page
  updateCSS(variables) {
    // loop through the css blocks (styles and links)
    for (let curCSSID in cssVarPoly.oldCSS) {
      // console.log("curCSS:",oldCSS[curCSSID]);
      let newCSS = cssVarPoly.replaceGetters(cssVarPoly.oldCSS[curCSSID], variables);
      // put it back into the page
      // first check to see if this block exists already
      if (document.querySelector('#inserted' + curCSSID)) {
        // console.log("updating")
        document.querySelector('#inserted' + curCSSID).innerHTML = newCSS;
      } else {
        // console.log("adding");
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = newCSS;
        style.classList.add('inserted');
        style.id = 'inserted' + curCSSID;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }
  },

  // parse a provided block of CSS looking for a provided list of variables and replace the --var-name with the correct value
  replaceGetters(curCSS, varList) {
    // console.log(varList);
    for (let theVar in varList) {
      // console.log(theVar);
      // match the variable with the actual variable name
      let getterRegex = new RegExp('var\\(\\s*' + theVar + '\\s*\\)', 'g');
      // console.log(getterRegex);
      // console.log(curCSS);
      curCSS = curCSS.replace(getterRegex, varList[theVar]);

      // now check for any getters that are left that have fallbacks
      let getterRegex2 = new RegExp('var\\(\\s*.+\\s*,\\s*(.+)\\)', 'g');
      // console.log(getterRegex);
      // console.log(curCSS);
      let matches = curCSS.match(getterRegex2);
      if (matches) {
        // console.log("matches",matches);
        matches.forEach(function(match) {
          // console.log(match.match(/var\(.+,\s*(.+)\)/))
          // find the fallback within the getter
          curCSS = curCSS.replace(match, match.match(/var\(.+,\s*(.+)\)/)[1]);
        });

      }

      // curCSS = curCSS.replace(getterRegex2,varList[theVar]);
    };
    // console.log(curCSS);
    return curCSS;
  },


  // get the CSS file (same domain for now)
  getLink(url, counter, success) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.overrideMimeType('text/css;');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        // console.log(request.responseText);
        if (typeof success === 'function') {
          success(counter, request);
        }
      } else {
        // We reached our target server, but it returned an error
        console.warn('an error was returned from:', url);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.warn('we could not get anything from:', url);
    };

    request.send();
  }
  
};

export default cssVarPoly;