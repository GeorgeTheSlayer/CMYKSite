<script>
    let midiNoteNum = 48;
    export let objID = 'numBox';

    //Add MTL into Doc
    import { MtL } from "../main";
    import { animate, spring } from "motion"

    const animation = animate(('#' + objID),
            {scale: [1, 1.125]},
            {duration: 1, easing: "ease-in-out", repeat: Infinity, direction: "alternate"},
    );

    //Subtracts from Midi Num
    function sub(){
        if (midiNoteNum > 0){
            midiNoteNum -= 1;
        }
    }
    
    //Adds to Midi Note Num
    function add(){
        if (midiNoteNum < 127){
            midiNoteNum += 1;
        }
        
        changeNumber();
    }
    
    function changeNumber(){
        setTimeout(() => {
            const h1 = document.querySelector(objID);
        
        
        animate(
            h1.innerHTML = MtL(midiNoteNum, 0),
            {x: 1000},
            {duration: 2, easing: "ease-out" }
            );
        }, 1000)
    }
    
    
</script>

<style>
.theStripe{
    background-size: 50% 50%;
    background-color: #d8323c;
    background-repeat: no-repeat;
    
}

.Seq{
    size: 50%;
    background-size: 50%;
    padding: 10%;
}

.SeqChannel{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
}
</style>

<div class="SeqChannel">
    <button class="Seq Up-Button" on:click={add}>Up</button>
    <div class="theStripe">
        <h1 id={objID}>{MtL(midiNoteNum, 0)}<sup>{MtL(midiNoteNum, 1)}</sup>{MtL(midiNoteNum, 2)}</h1>
    </div>
    <button class="Seq Down-Button" on:click={sub}>Dn</button>
</div>

