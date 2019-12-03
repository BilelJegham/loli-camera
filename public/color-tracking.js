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
    registerColor('blue', (h, s, l) => h > 190 && h < 230 && s > 35 && l > 35);
    registerColor('brown', (h, s, l) => ((h > 300&& s < 20 && l < 30) || (h < 40 && h>20  && s < 50 && l < 30)) );
    registerColor('green', (h, s, l) => h > 80 && h < 105 && s < 60 && l < 30);
    registerColor('yellow', (h, s, l) => h > 38 && h < 64  && l < 50 && l > 20);
    
    var tracker = new window.tracking.ColorTracker(['brown', 'blue', 'yellow', 'green']);
    tracker.setMinDimension(5);
    tracker.setMinGroupSize(10);
    window.tracking.track('#video', tracker, { camera: true });
    tracker.on('track', onTrack);
}
var state =0;
var running =false;

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
            var color = ["yellow", "green","blue" ];
            var i = 0;
            event.data.forEach(element => {
                if(element.color === color[i]&& element.width>20 && element.width<100 && element.height>20 && element.height<100){
                    i++;
                }
                if(i === 2 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 2.mp4"
                        state = 1;
            
                        running = false
                    },9000);
                }
            });
        
            
            

        }else if(state === 1){
			var i = 0;
            var color = ["blue","green","brown" ];
            event.data.forEach(element => {
                if(element.color === color[i]&& element.width>20 && element.width<100 &&  element.height>20 && element.height<100){
                    i++;
                }
                if(i === 2 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 3.mp4"
                        state = 2;
            
                        running = false
                    },9000);
                }
            });
        
    

        }else if(state === 2){
			var i = 0;
            var color = ["yellow","brown","green","blue" ];
            event.data.forEach(element => {
                if(element.color === color[i]&& element.width>20 && element.width<100 && element.height>20 && element.height<100){
                    i++;
                }
                if(i ===1 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 4.mp4"
                        state = 3;
            
                        running = false
                    },9000);
                }
            });
        
    

        }else if(state === 3){
			var i = 0;
            var color = [ "blue","yellow","brown", "green"];
            event.data.forEach(element => {
                if(element.color === color[i] && element.width>20 && element.width<100 &&  element.height>20 && element.height<100){
                    i++;
                }
                if(i === 2 ){
                    running = true
                    
                    document.querySelector('#player').play();
                    setTimeout(function(){
                        document.querySelector('#player').src = "Composition 1.mp4"
                        state = 0;
            
                        running = false
                    },9000);
                }
            });
        
    

        }

    }
    // if (consecutiveColors == MIN_CONSECUTIVE_COLORS) {
    //    // onColorsChanged();
    //     //onColorsChangedUpdateSettings();
    // }
}
