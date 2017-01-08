// == Jssor Slider
// var jssor_1_SlideshowTransitions = [
//   {$Duration:1000,$Delay:80,$Cols:8,$Rows:4,$Clip:15,$SlideOut:true,$Easing:$Jease$.$OutQuad},
//   {$Duration:1200,y:0.3,$Cols:2,$During:{$Top:[0.3,0.7]},$ChessMode:{$Column:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
//   {$Duration:1000,x:-1,y:2,$Rows:2,$Zoom:11,$Rotate:1,$SlideOut:true,$Assembly:2049,$ChessMode:{$Row:15},$Easing:{$Left:$Jease$.$InExpo,$Top:$Jease$.$InExpo,$Zoom:$Jease$.$InExpo,$Opacity:$Jease$.$Linear,$Rotate:$Jease$.$InExpo},$Opacity:2,$Round:{$Rotate:0.85}},
//   {$Duration:1200,x:4,$Cols:2,$Zoom:11,$SlideOut:true,$Assembly:2049,$ChessMode:{$Column:15},$Easing:{$Left:$Jease$.$InExpo,$Zoom:$Jease$.$InExpo,$Opacity:$Jease$.$Linear},$Opacity:2},
//   {$Duration:1000,x:4,y:-4,$Zoom:11,$Rotate:1,$SlideOut:true,$Easing:{$Left:$Jease$.$InExpo,$Top:$Jease$.$InExpo,$Zoom:$Jease$.$InExpo,$Opacity:$Jease$.$Linear,$Rotate:$Jease$.$InExpo},$Opacity:2,$Round:{$Rotate:0.8}},
//   {$Duration:1500,x:0.3,y:-0.3,$Delay:80,$Cols:8,$Rows:4,$Clip:15,$During:{$Left:[0.3,0.7],$Top:[0.3,0.7]},$Easing:{$Left:$Jease$.$InJump,$Top:$Jease$.$InJump,$Clip:$Jease$.$OutQuad},$Round:{$Left:0.8,$Top:2.5}},
//   {$Duration:1000,x:-3,y:1,$Rows:2,$Zoom:11,$Rotate:1,$SlideOut:true,$Assembly:2049,$ChessMode:{$Row:28},$Easing:{$Left:$Jease$.$InExpo,$Top:$Jease$.$InExpo,$Zoom:$Jease$.$InExpo,$Opacity:$Jease$.$Linear,$Rotate:$Jease$.$InExpo},$Opacity:2,$Round:{$Rotate:0.7}},
//   {$Duration:1200,y:-1,$Cols:8,$Rows:4,$Clip:15,$During:{$Top:[0.5,0.5],$Clip:[0,0.5]},$Formation:$JssorSlideshowFormations$.$FormationStraight,$ChessMode:{$Column:12},$ScaleClip:0.5},
//   {$Duration:1000,x:0.5,y:0.5,$Zoom:1,$Rotate:1,$SlideOut:true,$Easing:{$Left:$Jease$.$InCubic,$Top:$Jease$.$InCubic,$Zoom:$Jease$.$InCubic,$Opacity:$Jease$.$Linear,$Rotate:$Jease$.$InCubic},$Opacity:2,$Round:{$Rotate:0.5}},
//   {$Duration:1200,x:-0.6,y:-0.6,$Zoom:1,$Rotate:1,$During:{$Left:[0.2,0.8],$Top:[0.2,0.8],$Zoom:[0.2,0.8],$Rotate:[0.2,0.8]},$Easing:{$Zoom:$Jease$.$Swing,$Opacity:$Jease$.$Linear,$Rotate:$Jease$.$Swing},$Opacity:2,$Round:{$Rotate:0.5}},
//   {$Duration:1500,y:-0.5,$Delay:60,$Cols:15,$SlideOut:true,$Formation:$JssorSlideshowFormations$.$FormationCircle,$Easing:$Jease$.$InWave,$Round:{$Top:1.5}},
//   {$Duration:1000,$Delay:30,$Cols:8,$Rows:4,$Clip:15,$Formation:$JssorSlideshowFormations$.$FormationStraightStairs,$Assembly:2050,$Easing:$Jease$.$InQuad},
//   {$Duration:1200,$Delay:20,$Clip:3,$SlideOut:true,$Assembly:260,$Easing:{$Clip:$Jease$.$OutCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
// ];
//
// var jssor_1_SlideoTransitions = [
//   [{b:-1,d:1,o:-1,e:{o:1}},{b:0,d:400,o:1,e:{o:1}}],
//   [{b:-1,d:1,o:-1,e:{o:1}},{b:0,d:400,o:1,e:{o:1}}],
//   [{b:-1,d:1,o:-1,e:{o:1}},{b:0,d:400,o:1,e:{o:1}}]
// ];
//
// var jssor_1_options = {
//   $AutoPlay: true,
//   $SlideDuration: 800,
//   $SlideEasing: $Jease$.$InOutExpo,
//   $FillMode: 2,
//   $PauseOnHover: 3,
//   $SlideshowOptions: {
//     $Class: $JssorSlideshowRunner$,
//     $Transitions: jssor_1_SlideshowTransitions,
//     $TransitionsOrder: 1
//   },
//   $CaptionSliderOptions: {
//     $Class: $JssorCaptionSlideo$,
//     $Transitions: jssor_1_SlideoTransitions
//   },
//   $ArrowNavigatorOptions: {
//     $Class: $JssorArrowNavigator$
//   },
//   $BulletNavigatorOptions: {
//     $Class: $JssorBulletNavigator$
//   }
// };
//
// var jssor_1_slider = new $JssorSlider$("jssor-promo", jssor_1_options);

// Responsive code: you can remove it if you don't want the slider scales while window resizing
// function ScaleSlider() {
//   var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
//   if (refSize) {
//     // refSize = Math.min(refSize, 1920);
//     jssor_1_slider.$ScaleWidth(refSize);
//   }
//   else {
//     window.setTimeout(ScaleSlider, 30);
//   }
// };
//
// ScaleSlider();
// $(window).bind("load", ScaleSlider);
// $(window).bind("resize", ScaleSlider);
// $(window).bind("orientationchange", ScaleSlider);
