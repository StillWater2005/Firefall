const slime = document.querySelector(".slime");
const body = document.querySelector("body");
const land = document.querySelector(".land");
var slime_position = 50;
let delay = 25;
let fireball_delay = 110;
let time = 0;

//Creating score display panel
const score_panel = document.createElement("div");
score_panel.classList.add("score-panel");
const label_text = document.createElement("div");
label_text.classList.add("label-text");
label_text.textContent = "You Survived";
const score_text = document.createElement("div");
score_text.classList.add("score-text");
score_panel.appendChild(label_text);
score_panel.appendChild(score_text);

document.addEventListener("keydown", (event) =>{
    if(event.key === "d" && slime_position <= 1750)//1750 after accounting for slime width fo 75px
    {
        slime_position += 10;
    }
    if(event.key === "a" && slime_position >= 25)
    {
        slime_position -= 10;
    }
    slime.style.left = `${slime_position}px`;
})

//Create Start Animation

// Create function for creating and checking fireballs for hits
function create_fireball(position){
    // Create fireball and add it.
    const new_fireball = document.createElement("img");
    new_fireball.src = "./images/fireball.jpeg";
    new_fireball.classList.add("fireball");
    new_fireball.style.left = `${position}px`;
    body.insertBefore(new_fireball, body.firstChild);

    //Variables for position and velocity of fireball
    let height = 778;
    let velocity = 450;
    // Controlling logic
    let intervalID = setInterval(() => {
        if(height <= 0)
        {
            const difference= position - slime_position;
            if(difference >= -50 && difference <= 50)
            {
                slime.remove();
                land.style.marginTop = "880px";
                clearInterval(Game_intervalID);
                score_text.textContent = `${time/1000}s`;
                body.insertBefore(score_panel, body.firstChild);
            }
            new_fireball.remove();
            clearInterval(intervalID);
        }
        height -= velocity * delay/1000;
        new_fireball.style.top = `${778 - height}px`;
    }, delay)

}

// Function for firefall logic
let Game_intervalID = setInterval(()=>{
    time += fireball_delay;
    let position = 25 + Math.random() * (1725);
    create_fireball(position);
} , fireball_delay)
// Create End Animation