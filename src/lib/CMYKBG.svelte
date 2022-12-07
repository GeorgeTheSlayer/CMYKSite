<script>
    //Import Functions
    import P5 from "p5-svelte";
    import {startAudio} from "./../main"
    import {setParam1, setParam2, setParam3, setParam4} from "./../main"

    
    
    export let canvasWidth = 865;
    export let canvasHeight = 400;
    let CMYKText = 'C M Y K';
    let setBPMP = 55;
    let p1_v = 55;
    let p2_v = 55;
    let p3_v = 55;
    let p4_v = 55;
    
    let isStarted = false;
    
    
    const sketch = (p5) => {
          
          p5.setup = () => {
              p5.createCanvas(canvasWidth, canvasHeight);
              p5.textAlign(p5.CENTER, p5.CENTER);
              p5.textFont('Helvetica');
              p5.textSize(50);
              p5.frameRate(30);
              CMYKText = 'C L I C K';
          };
  
          p5.draw = () => {
            
            let C = getNormalizedX();
            let M = (getNormalizedX() + getNormalizedY()) * 0.5;
            let Y = (inverseY() / inverseX()) * 0.5;
            let K = inverseY() * 0.25;
            
            
            p1_v = C * 127;
            p2_v = M * 127;
            p3_v = Y * 127;
            p4_v = K * 127 * 4;
            
            var RED = 255 * (1-C) * (1-K);
            var GREEN = 255 * (1-M) * (1-K);
            var BLUE = 255 * (1-Y) * (1-K);
            
            if (isStarted == true){
              p5.background(RED, GREEN, BLUE);
              p5.fill(255 - RED, 255 - GREEN, 255 - BLUE);
            }
            else{
              p5.background(255);
            }
            
            
            p5.textSize(50);
            p5.text(CMYKText, p5.width / 2, p5.height / 2);
            
            
          };
          
          
          p5.mouseClicked = () => {
            startAudio();
            CMYKText = 'C M Y K';
            isStarted = true;
            //setBPM(setBPMP);
            
          };
          
          p5.mouseMoved = () => {
            // setBPM(setBPMP);
            setParam1(p1_v);
            setParam2(p2_v);
            setParam3(p3_v);
            setParam4(p4_v);
            
          };
          
          function getNormalizedX(){
            return p5.mouseX / p5.width;
          }
        
          //Normalized Y value
          function getNormalizedY(){
              return p5.mouseY / p5.height;
          }

          
          function inverseY(){
              return (p5.height - p5.mouseY) / p5.height;
          }
          
          function inverseX(){
              return (p5.width - p5.mouseX) / p5.width;
          }
      };
</script>
  
  <P5 {sketch} />