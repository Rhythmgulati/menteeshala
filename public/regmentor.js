function ug() {
  const drop = document.getElementById("dropDown");
  drop.innerHTML = "";
  drop.innerHTML = `
    <select id="courseSelect" name="course">
                        <option value="">Applying For</option>
                        <option value="neet">NEET</option>
                        <option value="jee">JEE</option>
                        <option value="ca">CA</option>
                        <option value="cuet">CUET</option>
                        <option value="webjee">WEBJEE</option>
                       
                    </select>
    
    `;
}

function pg() {
  const drop = document.getElementById("dropDown");
  drop.innerHTML = "";
  drop.innerHTML = `
    <select id="courseSelect" name="course">
                        <option value="">Applying For</option>
                        
                        <option value="Engineering Mentor">Engineering Mentor</option>
                        <option value="Design Mentor">Design Mentor</option>
                        <option value="Startup Mentor">Startup Mentor</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Marketing Coach">Marketing Coach</option>
                        <option value="Leadership Mentor">Leadership Mentor</option>
                        <option value="Career Coach">Career Coach</option>
                        <option value="Top Mentor">Top Mentor</option>
                    </select>
    
    `;
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
    } else {
      pg();
    }
  }
}
