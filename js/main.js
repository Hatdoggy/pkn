
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
const {spins,balance,tot,spnBtn} = stats;
let curNdx = 0;
const results = [50,100,75,75,100,900];
const mult = [
    `${currency}5 x 10 small size`,
    `${currency}10 x 10 big size`,
    `- ${currency}75 loss`,
    `-${currency}75 loss`,
    `${currency}10 x 10 big size`
];
const options = {
    decimalPlaces: 2,
    duration: 1,
};
let cntUp = new countUp.CountUp("cntUp", results[curNdx],options)
let bal = 0,spn = spins.val;
let headTxt = undefined;

const tl = gsap.timeline();
tl.from(".tl", {x: -150, opacity:0, rotation:180, duration: 1},"<");
tl.from(".ml", {y: 500, opacity:0, rotation:360, duration: 1},"<");
tl.from(".br", {x: 500, opacity:0, rotation:180, duration: 1},"<");
tl.from(".tr", {y: -500, opacity:0, rotation:360, duration: 1},"<");
tl.pause();

const popTl = gsap.timeline();
popTl.to('.bg-low',{y:500,opacity:0,duration:1.5})
popTl.pause();

const scl = gsap.timeline();
scl.to(".scale", {scale:1.5, duration: .2});
scl.pause();

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
        bound = $('#back')[0].getBoundingClientRect().y + 35;
    }else{
        bound = $('#back')[0].getBoundingClientRect().y + 70;
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

const resPop = async ()=>{

    switch (curNdx) {
        case 0:
            bal = bal + results[curNdx];
            $('#cnt').show();
            cntUp.start();
        break;
        case 1:
            bal = bal + results[curNdx];
            cntUp.endVal = results[curNdx];
            $('#cnt').show();
            cntUp.start();
        break;
        case 2:
            $('#cnt').removeClass('countTxt');
            $('#cnt').addClass('lseTxt');
            $('#dec').show();
            $('#statVal').removeClass('txt-ylw');
            $('#statVal').addClass('txt-red');
            $('.balVal').removeClass('txt-ylw');
            $('.balVal').addClass('txt-red');
            bal = bal - results[curNdx];
            cntUp.endVal = results[curNdx];
            $('#cnt').show();
            cntUp.start();
        break;
        case 3:
            bal = bal - results[curNdx];
            cntUp.endVal = results[curNdx];
            $('#cnt').show();
            cntUp.start();
        break;
        case 4:
            $('#cnt').removeClass('lseTxt');
            $('#cnt').addClass('countTxt');
            cntUp.endVal = results[curNdx];
            $('#cnt').show();
            cntUp.start();
            $('#statVal').removeClass('txt-red');
            $('#statVal').addClass('txt-ylw');
            $('.balVal').removeClass('txt-red');
            $('.balVal').addClass('txt-ylw');
            changeColor(1)
            bal = bal + results[curNdx];
        break;
        default:
            cntUp.endVal = results[curNdx];
            $('#cnt').show();
            cntUp.start();
            $('#popHead').html(jckpot.head);
            $('#popTxt').html(jckpot.mes);
            $('#jckptSymb').show();
            
            $('#popBtn').removeClass('btn-ylw');
            $('#popBtn').addClass('btn-jckpt');
            $('.balVal').removeClass('txt-ylw');
            $('.balVal').addClass('txt-drk');
            $('#popBtn').html(jckpot.btn);
            $('#symbol').attr('src','./imgCas/jackpot.png');
            $('#popBtn').click(function(){
                ActionRedirect($(this).data('product-id'))
            })
            bal = bal + results[curNdx];
        break;
    }
    
    if(curNdx < 5){
        await delay(2)
        $('#cnt').fadeOut();
        scl.play();
        await delay();
        if(curNdx === 3){
            $('#dec').fadeOut();
        }
        cntUp.reset();
        scl.reverse();
        $('#jckptSymb .balVal').html(currency + bal);
        $('.balVal').html(currency + bal);
        $('#statVal').html(mult[curNdx]);
        $('#spinVal').html(spn);
        curNdx = curNdx+1;
        await delay();
        showPop();
    }else{
        await delay(2)
        $('#cnt').fadeOut();
        await delay();
        $('#cnt').fadeOut();
        $('.bg-pop').show();
        $('#welc').show();
        $('.balLabel').html(jckpot.tot);
        $('#jckptSymb .balVal').html(jckpot.prize);
        $('.balVal').html(jckpot.prize);
        tl.play();
    }

}

const setText = ()=>{

    // set Stats
    $('#spinLabel').html(spins.label);
    $('#spinVal').html(spins.val);
    $('.balLabel').html(balance.label);
    $('.balVal').html(currency+" "+balance.val);
    $('#statLabel').html(tot.label);
    $('#statVal').html(tot.val);

    // Welcome Pop
    $('#popHead').html(greet.head);
    $('#popTxt').html(greet.mes);
    $('#popBtn').html(greet.btn);

    // terms
    $('.popTerm').html(terms)
}

const showPop = async()=>{

    if(curNdx === 0){
        // Set welcomeBtn
        $('.bg-pop').show();
        tl.play();
            $('#popBtn').click(async function(){
                tl.reverse();
                $('#welc').fadeOut();
                await delay();
                $('.bg-pop').fadeOut();
                $('.bg-low').show();
                await delay(2);
                // First spin
                    $(this).unbind('click')
                    spn = spn -1;
                    $('#spinVal').html(spn);
                    await spin()
                    resPop();
            })
    }else{
        // spin after every turn
        spn = spn - 1;
        await spin()
        resPop();
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