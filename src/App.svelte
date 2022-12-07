<script>
  // @ts-nocheck
    import CMYKBG from './lib/CMYKBG.svelte'
    
    // let canvasBox = document.querySelector('.DB');
    let htmlCanvasWidth = window.innerWidth;;
    let htmlCanvasHeight = window.innerHeight;
</script>



<style>
.DynamicBackground{
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: white;
  height: 100%;
  text-align: center;
}
</style>

<div class="DynamicBackground" id="DB">
  <CMYKBG canvasWidth={htmlCanvasWidth} canvasHeight={htmlCanvasHeight}/>
</div>
