MIN_CONSECUTIVE_COLORS = 5;
consecutiveColors = 0;
colors = [];
registerColor = (name, hslCondition) => {
    window.tracking.ColorTracker.registerColor(name, function (r, g, b) {
        const {h, s, l} = rgbToHsl(r, g, b);
        return hslCondition(h, s, l);
    });
}

window.onload = () => {
    //registerColor('red', (h, s, l) => 0 < h && h < 8 && s > 50 && l < 50);
    registerColor('blue', (h, s, l) => h > 200 && h < 230 && s > 40 && l > 40);
    registerColor('brown', (h, s, l) => h > 0 && h < 20 && s > 30 && l < 40);
    registerColor('green', (h, s, l) => h > 100 && h < 160 && s > 50 && l < 50);
    registerColor('yellow', (h, s, l) => 58 && h < 64 && s > 50 && l < 50 && l > 20);
    
    var tracker = new window.tracking.ColorTracker(['brown', 'blue', 'yellow', 'green']);
    tracker.setMinDimension(3);
    tracker.setMinGroupSize(3);
    window.tracking.track('#video', tracker, { camera: true });
    tracker.on('track', onTrack);
}
var state =0;
var running =false;
window.onload = function(){
document.querySelector('#player').play();
setTimeout(function(){
    document.querySelector('#player').src = "Composition 2.mp4"
    state = 1;

    running = false
},5000);
}
onTrack = (event) => {
    var canvas = document.getElementById('canvas');
    var camera = document.getElementById('camera');
    camera.classList.add('active');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);



    event.data.forEach(function (rect) {
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });

    const trackedColors = new Set(event.data.map(rect => rect.color));
  
    event.data.map(rest=>{
        console.log(rest);
        return rest
    })
    console.log(trackedColors);
    
    if(!running){
        if(state === 0){
            var color = ["blue", "green", "yellow"];
            var i = 0;
            trackedColors.forEach(element => {
                if(element === color[i]){
                    i++;
                }
                if(i === 2 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 2.mp4"
                        state = 1;
            
                        running = false
                    },5000);
                }
            });
        
            
            

        }else if(state === 1){
            var color = ["brown", "green", "blue"];
            trackedColors.forEach(element => {
                if(element === color[i]){
                    i++;
                }
                if(i === 2 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 3.mp4"
                        state = 2;
            
                        running = false
                    },5000);
                }
            });
        
    

        }else if(state === 2){
            var color = ["blue", "green","brown", "yellow"];
            trackedColors.forEach(element => {
                if(element === color[i]){
                    i++;
                }
                if(i === 3 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 4.mp4"
                        state = 2;
            
                        running = false
                    },5000);
                }
            });
        
    

        }else if(state === 3){
            var color = [ "green","brown","yellow", "blue"];
            trackedColors.forEach(element => {
                if(element === color[i]){
                    i++;
                }
                if(i === 3 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 1.mp4"
                        state = 1;
            
                        running = false
                    },5000);
                }
            });
        
    

        }

    }
    // if (consecutiveColors == MIN_CONSECUTIVE_COLORS) {
    //    // onColorsChanged();
    //     //onColorsChangedUpdateSettings();
    // }
}
