$(document).ready(function() {
    if(!$('#myCanvas').tagcanvas({
      //textColour: '#ec1e4f',
      outlineColour: 'transparent',
      reverse: true,
      depth: 1.0,
      maxSpeed: 0.05,
      textFont: null,
      textColour: null,
      weightMode:'both',
      weight: true,
      weightGradient: {
       0:    '#A73E57', 
      //  0.33: '#1DB3B2',
      //  0.66: '#FFCA64', 
       1:    '#ec1e4f'
      }
    },'tags')) {
      // something went wrong, hide the canvas container
      $('#myCanvasContainer').hide();
    }
  });