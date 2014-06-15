var partsLoopTime = 1000,
    partsMoveTime = 2000;

var clickData = {
  "1": {
    "stoneCSS": {
      "left": "1386px",
      "top": "85px"
    },
    "textUrl": "swf/Album.swf",
    "changeCSS": {
      "2": {
        "left": "1409px",
        "top": "175px" 
      },
      "3": {
        "left": "1419px",
        "top": "348px"
      },
      "4": {
        "left": "1436px",
        "top": "397px"
      },
      "5": {
        "left": "1629px",
        "top": "328px"
      }
    }
  },

  "2": {
    "stoneCSS": {
      "left": "421px",
      "top": "10px" 
    },
    "textUrl": "swf/Video.swf",
    "changeCSS": {
      "1": {
        "left": "587px",
        "top": "16px" 
      },
      "3": {
        "left": "455px",
        "top": "273px"
      },
      "4": {
        "left": "472px",
        "top": "322px"
      },
      "5": {
        "left": "666px",
        "top": "253px"
      }
    }
  },

  "3": {
    "stoneCSS": {
      "left": "58px",
      "top": "96px" 
    },
    "textUrl": "swf/Shows.swf",
    "changeCSS": {
      "1": {
        "left": "224px",
        "top": "100px" 
      },
      "2": {
        "left": "82px",
        "top": "183px"
      },
      "4": {
        "left": "109px",
        "top": "406px"
      },
      "5": {
        "left": "303px",
        "top": "337px"
      }
    }
  },

  "4": {
    "stoneCSS": {
      "left": "373px",
      "top": "248px" 
    },
    "textUrl": "swf/Critic.swf",
    "changeCSS": {
      "1": {
        "left": "538px",
        "top": "252px" 
      },
      "2": {
        "left": "396px",
        "top": "336px"
      },
      "3": {
        "left": "406px",
        "top": "509px"
      },
      "5": {
        "left": "616px",
        "top": "489px"
      }
    }
  },

  "5": {
    "stoneCSS": {
      "left": "1177px",
      "top": "346px"
    },
    "textUrl": "swf/Face.swf",
    "changeCSS": {
      "1": {
        "left": "1342px",
        "top": "350px" 
      },
      "2": {
        "left": "1199px",
        "top": "433px"
      },
      "3": {
        "left": "1209px",
        "top": "607px"
      },
      "4": {
        "left": "1226px",
        "top": "656px"
      }
    }
  }
};

var $body,
    $stone;


$(document).ready(function() {

  $body = $('body');
  $stone = $('#stone');

  $stone.click(partStone).hide();

  $body.addClass('animate');

  for (var i = 1; i <= 5; i++) {
    $("#part-" + i).click(onPartClick)
    $("#part-" + i).on('animationiteration webkitanimationIteration', function(e) {
      console.log("blah");
    }).on('animationstart', function() { console.log('blee');})
      .on('animationend', function() { console.log('blet');});
  }

});


var animTimeouts = [];

function clearTimeouts() {
  for (var i = 0; i < animTimeouts.length; i++) {
    clearTimeout(animTimeouts.pop());
  }
}

function hideParts() {
  for (var i = 0; i <= 5; i++) {
    $('#part-' + i).css({visibility: "hidden"});
  }
}

function showStone(i) {
  var css = clickData[i].stoneCSS;

  if (css) {
    $stone.css(css);
    $stone.show();
  }
}

function hideStone() {
  $stone.hide();
}

function showText(i) {
  var url = clickData[i].textUrl;

  var flashvars = {},
      params = { wmode: "transparent", allowscriptaccess: "always" },
      attributes = {};

  swfobject.embedSWF(url, "text", "1920", "1080", "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
}

function hideText() {
  $('#text').hide();
}

function partStone(e) {
  if (e) {
    e.preventDefault();
  }

  $('.magnet').removeClass('magnet');
  $body.addClass('animate');
  $body.removeClass('remove-animation');

  for (var i = 1; i <= 5; i++) {
    $("#part-" + i).css({left: "", top: "", visibility: "visible"});
  }

  hideStone();
  hideText();

  return false;
}

function magnetToPart($part) {
  var i = $part.attr("id").replace("part-", "");

  $part.addClass('magnet');
  
  var changeCSS = clickData[i].changeCSS;

  animTimeouts.push(setTimeout(function() {
    $body.removeClass('animate');

    animTimeouts.push(setTimeout(function() {

      $body.addClass('remove-animation');
      animTimeouts.push(setTimeout(function() {
        showStone(i);
        hideParts();
      }, partsLoopTime/4));

    }, partsLoopTime/4));

  }, partsMoveTime - partsLoopTime));
  
  showText(i);

  var $otherPart;
  for (var otherPart in changeCSS) {
    $otherPart = $("#part-" + otherPart);
    $otherPart.removeClass("magnet");
    $otherPart.css(changeCSS[otherPart]);
  }

  $part.css({left: "", top: ""});
}

function onPartClick(e) {
  e.preventDefault();

  clearTimeouts();

  if ($('.magnet').length > 0) {
    partStone();
  } else {    
    magnetToPart($(this));
  }

  return false;
}

function gotoScene(scene) {
  for (var i = 0; i <=5; i++) {
    $body.removeClass('show-scene-' + i);
  }
  $body.addClass('show-scene-' + scene);
}

