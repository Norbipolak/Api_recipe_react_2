import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeC({ r }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.push({
            id:r.id,
            name:r.name,
            quantity:quantity,
            price:Math.floor(Math.random()*26)+5
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const adjustQuantity = (q)=> {
        if(q < 1 || q >= 10) 
            return;
        /*
            ha ez r-nek lenne egy olyanja, hogy quantity, hony mennnyi van belőle vagy stock akkor lehetne így 
            if(quantity < 1 || quantity >= r.quantity)
            hogy ne tudjunk többet kiválasztani, mint amennyi van raktáron, de itt most nincsen ilyen 
            de random beírjuk, hogy ne lehessen 10-nél több 
        */
       setQuantity(q);
    };

    useEffect(() => {
        if (localStorage.getItem("cart") === null)
            localStorage.setItem("cart", "[]");

        //localStorage.clear();
    }, []);

    return (
        <div className="recipe">
            <div className="title">
                <h4>{r.name}</h4>
            </div>

            <div className="recipe-img">
                <Link to={"/recipes/ + r.id"}>
                    <img src={r.image} />
                </Link>
            </div>



            <div className="recipe-controls">
                <div>
                <FontAwesomeIcon className="icon"
                onClick={addToCart}
                    icon="fa-solid fa-cart-shopping" />
                </div>

                <div style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}>
                <FontAwesomeIcon onClick={()=>adjustQuantity(quantity-1)}
                className="minus-icon"
                icon="fa-solid fa-square-minus" />

                <input className="sm-input"
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    type="number" value={quantity} />

                <FontAwesomeIcon onClick={()=>adjustQuantity(quantity+1)}
                className="plus-icon"
                icon="fa-solid fa-square-plus" />
                </div>
            </div>
        </div>
    );
}
/*
Akarunk egy olyat, csinálni, hogy bele kosárba, akkor mi azt ebben a komponensben tudjuk kezelni és megoldani 
fogjuk magunkat és ezt a valamit rakjuk bele a kosárba 
és ehhez kellene egy localStorage!!!!!!!!!!!!!!!!!!!!
ehhez csináljuk az addToCart függvényt meg egy useEffect-et
és a useEffect-ben megnézzük, hogy létezik-e már nekünk ez a cart nevű valamink (getItem)
és ha ennek az értéke az null, tehát nem létezik, akkor (setItem) csinálunk eggyet 
a setItem két értéket fogad, az első, hogy mi legyen a neve, második pedig egy üres tömb, amibe majd belepakoljuk a dolgokat, 
amiket ide szeretnénk tenni, megvásárolni
kétféle lehet egy sima tömb vagy azt is lehetne odaírni, hogy JSON.parse([]) -> localStorage.setItem("cart", JSON.parse([]))
    useEffect(()=> {
        if(localStorage.getItem("cart") === null)
        localStorage.setItem("cart", "[]");
    }, []);
mert ezt egy tömbre fogja visszaalakítani a JSON.parse

Az addToCart tudunk kell, hogy mi a receptünkenk az id-ja és nevét is meg kellene majd jeleníteni
és kell oda egy input mező ami egy type="number" -> 
    <div style={{display.flex}}>
        <FontAwesomeIcon className="icon"
        icon="fa-solid fa-cart-shopping" />
        <input className="sm-input" type="number" value={1}/>
    </div>
hogy ugye tudjuk, hogy hány darabot szeretnénk a kosárba rakni, megadtunk neki egy className="sm-input"-ot, hogy tudjuk formázni, mert ugye 
most itt egymás mellett van a kosárba, másik lapra vívő ikon és ez az input mező is 
ha az egész div-nek megadjuk a style={{display:flex}}, ugyse lesz teljesen jó, ezért kell a az input-hoz a className="sm-input"
és a style={{display:flex, justify-content:space-evenly}}, mert akkor a space-evenly-vel nincsenek, annyira szorosan egymás mellett ezek a dolgok

de az még jobb lenne, hogy az input mező mellett lenne egy plusz-minusz gomb, hogy nem csak az input mezőben tudjuk váltani, 
tehát ha a plusz gombra rányomunk, akkor az input mezőben a szám eggyel növekszik ha a minuszra akkor pedig csökken 

Csináltunk egy useState-s változót, aminek az a neve, hogy quantity -> const [quantity, setQuantity] = useState(1);
ami 1-ről indul 

és akkor ennek az input mezőnek megadjuk a value-nak quantity és még csinálunk egy onChange-et is -> 
    <div>
        <FontAwesomeIcon className="icon"
        icon="fa-solid fa-cart-shopping" />
        <input className="sm-input"
        onChange={e=>setQuantity(parseInt(e.target.value))}
        type="number" value={quantity}/>
    </div>
value={quantity}!!!!
onChange={e => setQuantity(parseInt(e.target.value))}!!!!! -> elmagyarazas.js

és akkor így már nem lesz probléma, hogy van egy value-nk, ami nem köthető semmilyen változóhoz sem
******************************************************************************************************************************************
ugye most úgy néz ki az egész, hogy van egy recipe.name megjelenítve felül, alatta van egy recipe.image és utána van egy 
div className="recipe-controls", ami egy kétfelé osztható grid és ebben van az external link meg a cart és az input is már 
és még ide szeretnénk egy plus és egy minus ikont is és nem lenne elég hely így már, ezért kivesszük az external linket és 
azt szeretnék, hogy a képre kattintva menjen át a másik oldalra 
most így néznek ki a dolgok -> 

<div className="recipe-controls">
    <div>
        <Link to={"/recipes/ + r.id"}>
            <FontAwesomeIcon className="icon"
            icon="fa-solid fa-arrow-up-right-from-square" />
        </Link>
    </div>
    <div>
        <FontAwesomeIcon className="icon"
        icon="fa-solid fa-cart-shopping" />
        <input className="sm-input"
        onChange={e=>setQuantity(parseInt(e.target.value))}
        type="number" value={quantity}/>
    </div>

    itt meg van a képünk ->
        <div className="recipe-img">
            <img src={r.image}/>
        </div>

    új változat ->
    kiszedtük teljesen a recipe-controls-ot 
        <div>
            <FontAwesomeIcon className="icon"
            icon="fa-solid fa-cart-shopping" />
            <input className="sm-input"
            onChange={e => setQuantity(parseInt(e.target.value))}
            type="number" value={quantity} />
        </div>
    a képhez pedig hozzátettük -> 
        <div className="recipe-img">
            <Link to={"/recipes/ + r.id"}>
                <img src={r.image} />
            </Link>
        </div>
    !!!!!!!!!!!!!! tehát, ha rákattintunk a képre, akkor átvisz, minket 
    fontos két dolog, hogy ez egy <Link></Link>-be legyen
    és a link-nek az attributuma to pedig megmondja, hova vigyen minket -> to={"/recipes/ + r.id"}

    még átalakítjuk szóval van egy div className="recipe-controls" 
    ami egy grid 1fr 1fr és ebben lenne az egyik a cart ikon a másik meg az input mező 
    -> 
        <div className="recipe-controls">
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <FontAwesomeIcon className="icon"
                icon="fa-solid fa-cart-shopping" />
            </div>

            <div>
            <input className="sm-input"
                onChange={e => setQuantity(parseInt(e.target.value))}
                type="number" value={quantity} />
            </div>
        </div>

Felmegyünk a FontAwesome-ra és letöltjük a plus-t meg egy minus-t 
kell, hogy az App.js-ben a library-hoz hozzáadjuk ->
        library.add(
            faCartShopping,
            faArrowUpRightFromSquare, 
            faBackWardStep
            faSquarePlus,
            faSquareMinus
        );
és akkor ide rakjuk be ezeket az ikonokat 
    <div style={{display:"flex", justify-content:"space-evenly"}}>
        <FontAwesomeIcon icon="fa-solid fa-square-minus" />
        <input className="sm-input"
            onChange={e => setQuantity(parseInt(e.target.value))}
            type="number" value={quantity} />
        <FontAwesomeIcon icon="fa-solid fa-square-plus" />
    </div>
és akkor majd ez lesz a style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}, 
mert itt ugye három dolgunk van ott meg csak a cart, figyelni a színtaktikára -> nem align-items hanem alignItems

adunk mindegyik FontAwesomeIcon-nak egy class-t és ott adunk neki egy color-t, a plus az zöld lesz, a minus pedig piros, meg cursor: pointer-t
    <FontAwesomeIcon className="plus-icon"
    icon="fa-solid fa-square-plus" />
és ugyanígy a minusznál egy className="minus-icon"
    <FontAwesomeIcon className="minus-icon"
    icon="fa-solid fa-square-minus" />

Mit kell ezeknek a ikonak-nak adni, hogy hozzáadjanak, illetve kivonjanak -> 
használhatjuk a setQuantity-t itt egy onClick-vel 
OnClick={()=>setQuantity(q=>--q)} vagy lehet OnClick={()=>setQuantity(q=>q-1)}
elmagyarazas.js, megadtuk ezt a plus-nak és a minus-nak is 
most így néz ki a jsx elemek -> 
    <div style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}>
        <FontAwesomeIcon onClick={()=>setQuantity(q=>--q)}
        className="minus-icon"
        icon="fa-solid fa-square-minus" />

        <input className="sm-input" readOnly
            onChange={e => setQuantity(parseInt(e.target.value))}
            type="number" value={quantity} />

        <FontAwesomeIcon onClick={()=>setQuantity(q=>++q)}
        className="plus-icon"
        icon="fa-solid fa-square-plus" />
Tehát ez egy kétoszható grid-ben van benne, az első felében van egy cart ikon és ez a második fele(második 1fr)
ahol az első dolog egy minus FontAwesome-os ikon 3 dolog fontos 
1. icon:"fa-solid fa-square-minus", ezt ugye csak bemásoljuk az oldalról ilyen formában 
2. className="minus-icon", itt color-val megadjuk a színét és cursor:pointer
3. !!!! onClick={(=>setQuantity(q=>--q))}, ami egy callBack function-je a setQuantity-nek, ahol a q az eredeti érték --q meg amire szeretnénk 
változtatni 

második dolog az input mező 
1. onChange={e => setQuantity(parseInt(e.target.value))}, itt beállítja a quantity useState-s változót a target.value értékére (ami ott van 
az input mezőben), fontos, hogyha integerekkel akarunk dolgozni, akkor ez parseInt-elve legyen 
2. type="number"
3. value={quantity}, ezt meg azért kötjük hozzá hogy a quantity, ami useState-ben van, az jelenjen nekünk meg a böngészőben értékként!!!
fontos, ha van onChange settelés(mondjuk itt setQuantity), akkor value-nak meg kell adni azt amire a settelés történt(value={quantity})

harmadik, ugyanaz, mint az első csak plus, ugyanazok a dolgok vannak, csak hozzáad eggyet, nem kívon

és akkor így már müködik is, mert az input mező, ugye hozzá van kötve a quantity-hez, és akkor lehet növelni meg csökkenteni is 
ha az input mezőhöz oda van írva attributumként, hogy readOnly -> <input className="sm-input" readOnly, akkor ugy már nem is tudjuk 
beírni az input mezőhöz csak a gombokkal tudjuk eggyel növelni és csökkenteni 

az ennek a (onClick={()=>setQuantity(q=>++q)}) setQuantity-nek a hibája, hogy így át tudunk menni pluszba meg minuszba is 
ezért kell csinálnunk egy függvényt és majd azt megadni neki -> adjustQuantity függvény 

    const adjustQuantity = (q)=> {
        if(q < 1 || q > 10) 
            return;
        setQuantity(q);
    };
Tehát az adjustQuantity függvényünk vár egy q-t és ha ez a q kisebb, mint egy vagy nagyobb mint 10, akkor return
a setQuantity-nek pedig megadjuk ezt a q-t 
és, akkor ez már nem aktuális -> <FontAwesomeIcon onClick={()=>setQuantity(q=>++q)}
hanem ennek már a adjustQuantity-t fogjuk megadni és más formában ->

<FontAwesomeIcon onClick={()=>adjustQuantity(quantity-1)}
ugyanígy a plusznál is 

Itt az történik, hogy adjustQuantity-nek azt mondjuk, hogy ez a quantity-1, tehát ez -> const [quantity, setQuantity] = useState(1); -1 
ezért fog lejjebb menni folyamatosan, a másik meg a quantity+1, azért fog folyamatosan feljebb menni és akkor megnézzük az adjustQuantity
függvényben, amit csináltunk, hogyha q < 1 vagy q > 10, akkor itt returnölünk, tehát nem engedjük tovább különben meg setQuantity(q)
********************************************************************************************************************************************
és akkor ha ez megvan, akkor meg annyit belerakunk a kosárba, amennyi szükséges -> addToCart függvény kidolgozása
const cart = JSON.parse(localStorage.getItem("cart")); 
!!!!!!!!!!!!!!
tehát JSON string-ből visszaállítjuk JSON objektummá
cart.push({
    name:r.name,
    quantity:quantity
})
itt meg megcsináljuk, hogy hogyan nézzen ki a cart  name: r.name, az a name, amit recipe json-ben leszedutünk 
a quantity az meg a quantity, az itten useState-s változóból!!!!!!!!!
a legvégén meg setteljük a cart-ot, fontos, hogy stringify-val legyen, mert a localStorage-ban stringek vannak 
és ha meg getItem akkor meg JSON.parse-olni kell mert nekünk nem JSON stringek kellenek, hanem objektumok, olyanok, amiket majd push-olunk

és ha ez meg van, akkor még azt kell csinálni, hogy shoppingcart-os ikonhoz csinálunk egy onClick-et és megadjuk neki ezt az addToCart-os 
függvényt -> 
    <div>
        <FontAwesomeIcon className="icon"
        onClick={addToCart}
            icon="fa-solid fa-cart-shopping" />
    </div>

és ha most kiválasztottunk egy bizonyos mennyiséget és megnyomjuk a cart ikont, akkor beteszi ezt a localStorage-be 
amit meg tudunk nézni ott legfelül, ahol van az Elements, Console, Recorder ott van egy olyan, hogy Application!!!!!!!
és ott lesz egy olyan ->
Local Storage
    http://localhost:3000
és ott látunk egy olyat, hogy 
Origin http://localhost:3000
Key       Value 
cart      [{name: "Chicken Alfredo Pasta", quantity:3}]
    0:{name: "Chicken Alfredo Pasta", quantity:3}]
         name: "Chicken Alfredo Pasta"
         quantity: 3

csak ezzel még van egy probléma, hogyha mégegyszer megnyomom akkor belerakja ugyanazt és nem a quantity-t fogja növelni 
tehát valahogy, így fog kinézni
Key       Value 
cart      [{name: "Chicken Alfredo Pasta", quantity:3}, {name: "Chicken Alfredo Pasta", quantity:5}]
    0:{name: "Chicken Alfredo Pasta", quantity:3}]
    1. {name: "Chicken Alfredo Pasta", quantity:5}]
és ezt szeretnénk helyette -> 
Key       Value 
cart      [{name: "Chicken Alfredo Pasta", quantity:8}]
    0:{name: "Chicken Alfredo Pasta", quantity:8}]

Tehát ne tegye bele mégegyszer, hanem csak a quantity-ját növelje, amennyivel kell
ezt majd le kell ellenőrizni az id alapján, hogyha már benne van, akkor megnövelni a quantity-t annyival és nem pedig belerakni 
mégegyszer, majd az id-t is bele kell ide rakni, hogy tudjuk az alapján ellenőrizni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
mert most még csak name meg a quantity van benne, price-nak meg majd generálunk egy véletlen számot 

ha meg ki szeretnénk törölni mindent, ami itt van a localStorage-ban, akkor 
a useEffect-ben csak a clear legyen és miután ez megvolt utána meg a clear-t fogjuk kikommentelni 
    useEffect(() => {
        //if (localStorage.getItem("cart") === null)
            //localStorage.setItem("cart", "[]");

        localStorage.clear();
    }, []);

az id-t meg beállítjuk!!!!!!!!!!!
meg price-ot is, amit random generálunk egy számot 5-től 30-ig
cart.push({
    id:r.id,
    name:r.name,
    quantity:quantity
    price:Math.floor(Math.random()*26)+5
})
és akkor már így jelenik meg ->
    0:{id:3, name: "Chocolate Chip Cookies", quantity:1, price:11}
    1:{id:4, name: Chicken Alfredo Pasta" quantity:6, price:12}
        id:4
        name: "Chicken Alfredo Pasta"
        price: 12
        quantity: 6

*/

export default RecipeC;