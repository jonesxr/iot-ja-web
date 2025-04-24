const area = document.getElementById('area');  //pelialueen koko id perusteella


  //laskin klikkauksille
  let click_counter = 0;


//luo muodon
function clickable_object() { 
    //uusi elementti
    const shape = document.createElement('div');

  
    /* css luokkaan */
    shape.className = 'shape';

    // 50% ympyrä 50% neliö
    if (Math.random() > 0.5)
    
    {
    shape.style.borderRadius = '50%';
    } 

    else 
    {
    shape.style.borderRadius = '0';
    }

    //satunninen sijainti x akselilla pikseleinä 
    shape.style.left = Math.random() * 530 + 'px';
    //satunninen sijainti y akselilla pixeleinä
    shape.style.top = Math.random() * 430 + 'px';
    
    //aloitusaika
    shape.startTime = new Date().getTime();

    //ajan laskeminen 
    // alueen tyhjennys 
    shape.onclick = () => {

        //muodon klikkausaika - muodon ilmestymisaika
        document.getElementById('time').textContent = new Date().getTime() - shape.startTime;

        //+1
        click_counter++;

        //näytetään klikkaukset
        document.getElementById('clicks').textContent ='clicks: ' + click_counter;

        //poistetaan vanha muoto 
        area.innerHTML = '';

        //aika uuden muodon luomiselle (0.5ms)
        setTimeout(clickable_object, 500);

    };
    //uusi muoto
    area.appendChild(shape);

    

}


/* kutsuminen */
clickable_object();