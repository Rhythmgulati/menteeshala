const mentee =  document.getElementById('mentee')
const mentor = document.getElementById('mentor')
let mn = true;
let mt = false;
mentee.addEventListener('click',()=>{
    if(mn){

    }else{
        mentee.style.color = '#2d1b81'
        mentee.style.borderBottom = 'solid 2px #2d1b81'
        mn = true
        mentor.style.color = '#aaaaaa'
        mentor.style.borderBottom = 'none'
        mt = false
    }

})

mentor.addEventListener('click',()=>{
    if(mt){

    }else{
        mentor.style.color = '#2d1b81'
        mentor.style.borderBottom = 'solid 2px #2d1b81'
        mt = true

        mentee.style.color = '#aaaaaa'
        mentee.style.borderBottom = 'none'
        mn = false
    }

})