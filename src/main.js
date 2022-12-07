
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app

//Create RNBO Device
const { createDevice } = RNBO;

//RNBO Device Path
const patcherExportULR = "src/Exports/BongoFinalExports/bongoFinal.export.json";



//Create Audio Context
const WAContext = window.AudioContext;
const context = new WAContext();

//create New Objects 
let rawPatcher, patcher, device, param;
const setup = async () => {
  
  rawPatcher = await fetch(patcherExportULR);
  patcher = await rawPatcher.json();
  device = await RNBO.createDevice({ context, patcher });

  // This connects the device to audio output, but you may still need to call context.resume()
  // from a user-initiated function.
  device.node.connect(context.destination);
  console.log('Device Connected');
  
  let presets = patcher.presets || [];
  if (presets.length < 1) {
    console.log("No presets defined");
    
  } 
  else {
    const preset = presets[0];
    device.setPreset(preset.preset);
    console.log('Loaded Preset 0');
  }

};

setup();

//Change a Midi to Letter Function
export function MtL(num, mode){
  //Get the Note Value
  const noteNum = num % 12;
  const noteString = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
  const supString =  ['', '#', '', '#', '', '', '#', '', '#', '', '#', ''];
  
  //Find Oct Value and turn into string
  const noteOct = (Math.round(num / 12)).toString();
  
  //Return String
  
  switch (mode){
    case 0:
      return noteString[noteNum];
      break;
      
    case 1:
      return supString[noteNum];
      break;
      
    case 2:
      return noteOct;
      break;
      
      default:
        return '';
        break;
  }
  
}

//Getters and Setters for Params
//BPM

export function startAudio(){
  console.clear();
  context.resume();
  console.log('Audio Started');
  
  tester();
  configureParams();
}


export function tester(){
  console.log('Tester');
  
  //Log all Params
  device.parameters.forEach(parameter =>{
    console.log(parameter.id);
    //console.log(parameter.name);
  })
}

//Set Bpm Param
let bpmParam = null;

//Create Params
let param1 = null;
let param2 = null;
let param3 = null;
let param4 = null;

function configureParams(){
  
  //Param 1
  param1 = device.parametersById.get("par1");
  param1.value = 55;
  
  //Param 2
  param2 = device.parametersById.get("par2");
  param2.value = 55;
  
  //Param 3
  param3 = device.parametersById.get("par3");
  param3.value = 55;
  
  //Param 4
  param4 = device.parametersById.get("par4");
  param4.value = 55;
}

//Set Param 1  0-127
export function setParam1(p_value){
  param1.value = p_value;
}

//Set Param 2 0-127
export function setParam2(p_value){
  param2.value = p_value;
}

//Set Param 3 0-127
export function setParam3(p_value){
  param3.value = p_value;
}

//Set Param 4 0-127
export function setParam4(p_value){
  param4.value = p_value;
}


// export function setBPM(bpmValue){
//   bpmParam.value = bpmValue;

// }

