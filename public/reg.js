
function ug(){

    const drop = document.getElementById('dropDown')
    drop.innerHTML = ""
    drop.innerHTML = `
    <select id="courseSelect" name="course">
                        <option value="">Searching For</option>
                        <option value="neet">NEET</option>
                        <option value="jee">JEE</option>
                        <option value="ca">CA</option>
                        <option value="cuet">CUET</option>
                        <option value="webjee">WEBJEE</option>
                       
                    </select>
    
    `
}

function pg(){

    const drop = document.getElementById('dropDown')
    drop.innerHTML = ""
    drop.innerHTML = `
    <select id="courseSelect" name="course">
    <option value="">Searching For</option>
    <option value="Engineering Mentors">Engineering Mentors</option>
<option value="Design Mentors">Design Mentors</option>
<option value="Startup Mentors">Startup Mentors</option>
<option value="Product Managers">Product Managers</option>
<option value="Marketing Coaches">Marketing Coaches</option>
<option value="Leadership Mentors">Leadership Mentors</option>
<option value="Career Coaches">Career Coaches</option>
<option value="Top Mentors">Top Mentors</option>
</select>
    
    `

}

function handleRadioChange(clickedRadio) {
    // Get all radio buttons with the same name
    var radioButtons = document.getElementsByName(clickedRadio.name);
    
    // Iterate through all radio buttons
    for (var i = 0; i < radioButtons.length; i++) {
        // Uncheck all radio buttons except the one clicked
        if (radioButtons[i] !== clickedRadio) {
            radioButtons[i].checked = false;
            ug();
        }else{
            pg();
        }

        
    }
}

