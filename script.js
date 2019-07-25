

var _c = $('.container'); // cintainer of elements
var _n = Array(Math.floor(Math.random() * 500)); // random numbre of elements 
var imgs = [
    "bg-0",
    "bg-1",
    "bg-2",
    "bg-3",
]
var zIndex = 1;

// loop tocreate random element in container
for (o=0; o < _n.length; o++) {
    $(_c).append(`
        <div onclick="SetState(this)" class="box bg-0">
        
        </div>
    `)
}

_l = $(_c).children()[$(_c).children().length - 1];
_t = $(_c).children()[$(_c).children().length - 1];
valid_l =  _l.offsetLeft;
valid_t =  _t.offsetTop;

setInterval( () => {

    $($(_c).children()[
        Math.floor(Math.random() * $(_c).children().length)
    ]).click();
}, 100)


function SetState(e) {


    

    // ++ zIndex
    ++zIndex;

    // e = element || this

    // why we use this check => to get a real position of elemnt not a offeset in page
    var l = e.hasAttribute('data-left') == false ? e.offsetLeft : parseInt(e.getAttribute('data-left'))
    var t = e.hasAttribute('data-top') == false ? e.offsetTop : parseInt(e.getAttribute('data-top'));
    var rclass = imgs[Math.floor(Math.random() * imgs.length)];
    // console.log(l ,t)

    // create a new element box for append in mover position
    ndiv = document.createElement('div')
    ndiv.style = "position: relative;";
    ndiv.setAttribute('onclick', "SetState(this)");
    
    ndiv.classList.add(`box`);
    ndiv.classList.add(`${rclass}`);
    
    // 
    $(_c).append(ndiv);
    ndiv.setAttribute('data-top', `${ndiv.offsetTop}`);
    ndiv.setAttribute('data-left', `${ndiv.offsetLeft}`);
    $(ndiv).css({
        top: `${e.offsetTop - ndiv.offsetTop}px`,
        left: `${e.offsetLeft - ndiv.offsetLeft}px`,
    })


    $(e).css('background-color', "red");


    _randomChild = $(_c).children()[
        Math.floor(Math.random() * _n.length)

        // Math.floor(Math.random() * $(_c).children().length)
    ]; // this child will remove & move this to her position!

    var lchild = _randomChild.offsetLeft;
    var tchild = _randomChild.offsetTop;

    // console.log(lchild ,tchild)

    // checking if this values position is not valid
    if (lchild >= valid_l) return;
    if (tchild >= valid_t) return;

    // disabled all mothed in unused element
    $(_randomChild).addClass('hide-box').attr('onclick', "return false");
   
    // move the e || this to his position

    // we stop event onclick becaouse don't call it more times in same time this will make accents in positions in game
    // and return it back to complete a game again :D !
    $(e).attr('onclick', 'return false').css({
        position: "relative",
        zIndex: zIndex,
        
    }).addClass('rotate').animate({
        top: `${tchild - t}px`,
        left: `${lchild - l}px`,
    }, 400, () => $(this).attr('onclick', 'SetState(this)'))



}