
function getURLParameter(name) {
    return decodeURI(
      (RegExp(name + "=" + "(.+?)(&|$)").exec(window.location.search) || [
        ,
        null,
      ])[1] || ""
    );
  }
  
  let subid = getURLParameter("subid");
  let subid2 = getURLParameter("subid2");
  let firstname = getURLParameter("firstname");
  let surname = getURLParameter("surname");
  let city = getURLParameter("city");
  let zipcode = getURLParameter("zipcode");
  let address = getURLParameter("address");
  let phone = getURLParameter("phone");
  let mobile = getURLParameter("mobile");
  let pid = getURLParameter("pid");
  let nrp = getURLParameter("nrp");
  
  let ffdomain = "https://" + getURLParameter("ffdomain");
  let session = getURLParameter("session");
  let fluxf = getURLParameter("fluxf");
  let fluxffn = getURLParameter("fluxffn");
  
  function ActionRedirect(action) {
    window.location.replace(
      ffdomain +
        "/?flux_action=" +
        action +
        "&flux_f=" +
        fluxf +
        "&flux_ffn=" +
        fluxffn +
        "&flux_sess=" +
        session
    );
  }


const {currency,pop,stats,terms} = txt;
const {greet,win,jckpot,lose} = pop;
const {spins,balance} = stats;
let curNdx = 0;
const results = [20,40,10,10,20,1540];
let bal = 0,spn = spins.val;
let headTxt = undefined;

const tl = gsap.timeline();
tl.from(".tl", {x: -150, opacity:0, rotation:180, duration: 1},"<");
tl.from(".ml", {y: 500, opacity:0, rotation:360, duration: 1},"<");
tl.from(".br", {x: 500, opacity:0, rotation:180, duration: 1},"<");
tl.from(".tr", {y: -500, opacity:0, rotation:360, duration: 1},"<");
tl.pause();

// Simple Delay
const delay = async(val)=>{

    let ret = 0;

    switch (val) {
        case 1:
            ret = 1000;
        break;
        case 2:
            ret = 1500;
        break; 
        case 3:
            ret = 2500;
        break;       
        case 4:
            ret = 2000;
        break;    
        default:
            ret = 500;
        break;
    }
    
    return new Promise(res=>{
        setTimeout(()=>res(),ret)
    })
}

const placeBtn = (width)=>{

    let bound = undefined;

    if(width < 1000){
        bound = $('#back')[0].getBoundingClientRect().y + 10;
    }else{
        bound = $('#back')[0].getBoundingClientRect().y + 30;
    }

    $('#wheelPnt').css('top',bound+"px");
}

const changeColor = (col)=>{
    if(col){ // Hide Red 
        $('#loseT').hide();
        $('#loseTR').hide();
        $('#loseBR').hide();
        $('#loseML').hide();

        $('#cloveT').show();
        $('#cloveTR').show();
        $('#cloveBR').show();
        $('#cloveML').show();
    }else{  // Show Red 
        $('#cloveT').hide();
        $('#cloveTR').hide();
        $('#cloveBR').hide();
        $('#cloveML').hide();
    
        $('#loseT').show();
        $('#loseTR').show();
        $('#loseBR').show();
        $('#loseML').show();
    }
}

const resPop = (val)=>{
    
    $('.bg-pop').show();
    tl.play();
    $('#welc').show();

    switch (curNdx) {
        case 0:
            headTxt = win.head;
            $('#popBtn').html(win.btn);
            $('#popTxt').html(win.mes);
            bal = bal + results[curNdx];
        break;
        case 1:
            $('#popBtn').html(win.btn);
            bal = bal + results[curNdx];
        break;
        case 2:
            headTxt = lose.head;
            changeColor()
            $('#popTxt').html(lose.mes);
            $('#popBtn').removeClass('btn-ylw');
            $('#popBtn').addClass('btn-red');
            $('#popBtn').html(lose.btn);
            $('#symbol').attr('src','./img/lose.png');
            bal = bal - results[curNdx];
        break;
        case 3:
            $('#popBtn').html(lose.mes);
            $('#popBtn').html(lose.btn);
            bal = bal - results[curNdx];
        break;
        case 4:
            headTxt = win.head;
            changeColor(1)
            $('#popTxt').html(win.mes);
            $('#popBtn').removeClass('btn-red');
            $('#popBtn').addClass('btn-ylw');
            $('#popBtn').html(win.btn);
            $('#symbol').attr('src','./img/symbol.png');
            bal = bal + results[curNdx];
        break;
        default:
            headTxt = jckpot.head;
            $('#popTxt').html(jckpot.mes);
            $('#jckptSymb').show();
            
            $('#popBtn').removeClass('btn-ylw');
            $('#popBtn').addClass('btn-jckpt');
            $('#popBtn').html(jckpot.btn);
            $('#symbol').attr('src','./img/jackpot.png');
            $('#popBtn').click(function(){
                ActionRedirect($(this).data('product-id'))
            })
            bal = bal + results[curNdx];
        break;
    }
    
    if(curNdx <5){
        $('#popHead').html(headTxt + currency + results[curNdx]);
        $('#balVal').html(currency + bal);
        $('#jckptSymb #balVal').html(currency + bal);
    }else{
        $('#popHead').html(headTxt);
        $('#jckptSymb #balLabel').html(jckpot.tot);
        $('#balVal').html(jckpot.prize);
        $('#jckptSymb #balVal').html(jckpot.prize);
    }
    curNdx = curNdx+1;
    showPop();
}

const setText = ()=>{

    // set Stats
    $('#spinLabel').html(spins.label);
    $('#spinVal').html(spins.val);
    $('#balLabel').html(balance.label);
    $('#balVal').html(currency+" "+balance.val);

    // Welcome Pop
    $('#popHead').html(greet.head);
    $('#popTxt').html(greet.mes);
    $('#popBtn').html(greet.btn);

    // terms
    $('.popTerm').html(terms)
}

const showPop = ()=>{
    $('.bg-pop').show();
    tl.play();

    switch (curNdx) {
        case 0:
            // Set popBtn
            $('#popBtn').click(async function(){
                tl.reverse();
                $('#welc').fadeOut();
                await delay();
                $('.bg-pop').fadeOut();
                await delay();
                spn = spn -1;
                $('#spinVal').html(spn);
                await spin()
                resPop();
            })
        break;
        case 1:
        break;
        default:
        break;
    }
    

}

$(async()=>{
    await delay()
    placeBtn($(window).width());
    setText();
    showPop();

    $(window).on('resize',function(){
        placeBtn($(this).width())
    });
})