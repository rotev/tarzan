var partsMoveTime = 500;

var clickData = {
  "1": {
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

var $body;


$(document).ready(function() {

  $body = $('body');

  $body.addClass('animate');

  for (var i = 1; i <= 5; i++) {
    $("#part-" + i).click(onPartClick);
  }

});


function onPartClick(e) {
  e.preventDefault();

  var $part = $(this);

  if ($part.hasClass('magnet')) {
    $part.removeClass('magnet');
    $body.addClass('animate');

    for (var i = 1; i <= 5; i++) {
      $("#part-" + i).css({left: "", top: ""});
    }
  } else {
    $part.addClass('magnet');

    setTimeout(function() {
      $body.removeClass('animate');
    }, partsMoveTime);

    var i = $(this).attr("id").replace("part-", "");
    var changeCSS = clickData[i].changeCSS;

    var $otherPart;
    for (var otherPart in changeCSS) {
      $otherPart = $("#part-" + otherPart);
      $otherPart.removeClass("magnet");
      $otherPart.css(changeCSS[otherPart]);
    }

    $part.css({left: "", top: ""});
  }

  return false;
}