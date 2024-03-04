import { useParams } from "react-router-dom";

function RecipeP() {
    const [recipe, setRecipe] = useState(null);
    const {id} = useParams();
    console.log(id);

const getRecipe = async ()=> {
    const response = await fetch("https://dummyjson.com/recipes/" + id);

    const json = await response.json();
    console.log(json);

    setRecipe(json);

};

useEffect(()=> {
    getRecipe();
}, []);

return(
    <div className="container">
        <Link className="link-icon" to={"/"}>
            <FontawesomeIcon icon="fa-solid-fa-backward-step"/>
        </Link>
        <div className="recipe-page-grid border-rad-md">
            <div className="box">
                <div className="recipe-page-img">
                    <img src={recipe && recipe.image}/>
                </div>
            </div>
            <div className="box p-large">
                <h3>{recipe && recipe.name}</h3>

                <div className="recipe-data-grid">
                    <div className="white-box">
                        <h4>Cuisine</h4>
                        {recipe && recipe.cuisine}
                    </div>

                    <div className="white-box">
                        <h4>Difficulty</h4>
                        {recipe && recipe.difficulty}
                    </div>

                    <div className="white-box">
                        <h4>Calories</h4>
                        {recipe && recipe.caloriesPerServing} kCal
                    </div>

                    <div className="white-box">
                        <h4>Cook time</h4>
                        {recipe && recipe.cookTimeMinutes} m
                    </div>

                    <div className="white-box">
                        <h4>Prepare time minutes</h4>
                        {recipe && recipe.prepTimeMinutes} minutes
                    </div>
                    
                    <div className="white-box">
                        <h4>Meal type</h4>
                        {recipe && recipe.mealType.join(", ")} 
                    </div>

                    <div style={{gridRow:"3/5", GridColumn:"2/3"}} className="white-box">
                        <h4>Ingredients</h4>
                        <ul className="recipe-list">
                            {
                                recipe && recipe.ingredients.map((ing, i)=>
                                <li key={i}>{ing}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="border-rad-sm" style={{gridColumn: "1/3"}}>
                        <h4>Instructions</h4>
                        <ul className="recipe-list">
                            {
                                recipe && recipe.instructions.map((ins, i)=>
                                <li key={i}>{ins}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

/*
Csináltunk egy visszafele gombot, ha rámegyünk erre az oldalra, akkor lefelül megjelenjen egy FontAwesome-os ikon, és akkor 
visszaugorjön a főoldalra, ha oda szeretnénk visszamenni 
Fontos dolgok!!!!!!!!!
1. ezt egy <Link><Link/>-be kell megcsinálni!!!!!!
2. ugy tudjuk megadni, hogy hova szeretnénk visszamenni, hogy ennek a link-nek van egy attributuma, ami egy to={""} és ide kell megadni,
hogy hova szeretnénk, hogy vigyen minket ez, tehát a to={"/"} -> a főoldalra, fog minket visszavinni
3. FontAwesome-os ikon 2 részből áll szintaktikailag
    1. <FontAwesomeIcon/> 
    2. és ennek van egy icon attributuma, ahova bemásoljuk amit az oldalról be lehet másolni -> icon="fa-solid-fa-backward-step"
és még fontos az is, hogy be legyen hívva az App.js-en három dolog-> 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
a kisbetűs library is és ahhoz add-oljuk, hozzá ezeket a FontAwesome-os dolgokat, amikre szükségünk lesz 
library.add(
  faCartShopping,
  faArrowUpRightFromSquare, 
  faBackWardStep
);
Színtaktika fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!
és akkor ezt a visszafele gombot megformázzuk css-ben és ezért adtunk neki egy className="link-icon"-t -> 
    <Link className="link-icon" to={"/"}>
        <FontawesomeIcon icon="fa-solid-fa-backward-step"/>
    </Link>
adtunk neki css-ben egy font-size-ot, hogy akkora legyen az ikon, amekkorát szeretnénk, utána egy valamilyen color-t, hogy olyan 
színű legyen és még egy margin: 5px;-t is

és akkor ezen az oldalon meg akarunk jeleníteni bizonyos adatokat, megnézzük, hogy milyen adatok jönnek le nekünk a json-ben, 
ugye getRecipe async függvényünkben visszakapunk egy reponse-t ami egy json fájl lesz -> const json = await response.json();
és mégnézzük, hogy milyen adatok vannak itt -> console.log(json)
{id: 1, name: 'Classic Margherita Pizza', ingredients: Array(6), instructions: Array(6) stb..}
caloriesPerServing: 300
cookTimeMinutes: 15
cuisine: "Italian"
difficulty: "Easy"
id: 1
image: "https://cdn.dummyjson.com/recipe-images/1.webp"
ingredients: (6) ['Pizza dough', 'Tomato sauce', 'Fresh Mozzarella' stb..]
instructions: (6) ['Preheat the oven to 475F (245C' stb..még 5 ilyen]
mealType: ['Dinner'], azért van egy tömbben, mert más ételeknél ez lehet többféle is
name: "Classic Margherita Pizza"
prepTimeMinutes: 20
rating: 4.6
reviewCount: 3
servings: 4
tags: (2) ['Pizza', 'Italian']
userId: 45
[[Prototype]]: Object 

és akkor ezekből szeretnénk válogatni különböző dolgokat, amiket majd megjelenítünk ezen az oldalon 
itt már ezekből két dolgok meg is jelenítettünk, az egyik az egy image a másik pedig a name
pl. a képünk ->
    <div className="recipe-page-img">
        <img src={recipe.image}/>
    </div>
fontos, hogy mindig egy külső div-ben legyen benne ez kapott egy className="recipe-page-img"-t
és at is fontos, hogy majd a css-ben a formázásnál a .recipe-page-img img.re kell hívatkoznunk -> 
.recipe-page-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
ahol kapjon egy height egy width és egy object-fit: cover általában!!!!
és ebbe a div-be tesszük majd bele a <img/> 
ennek mindig van egy attributuma az src={} !!!!! és ide csak beletesszük a képet vagy mint ebben az esetben hivatkozunk rá 
src={recipe.image} mert ugye visszakaptunk egy JSON objektumot és ennek van egy image kulccsa 
hogy meg tudjuk jeleníteni itt React-ben fontos 3 dolog 
1. Csinálunk egy useState-s változót -> const [recipe, setRecipe] = useState([]);
ami egy üres tömb lesz és ide töltjük majd be azokat az adatokat, amiket visszakapunk 
2. adatoknak a lehívása
készítünk egy függvényt getRecipes, fontos, hogy async legyen 
const getRecipe = async ()=> {
    const response = await fetch("https://dummyjson.com/recipes/" + id);
    const json = await response.json();
    setRecipe(json);
};
fontos dolgok ebben a függvényben 
- const {id} = useParams(); igy kapjuk meg az id-t
és eggyes termékeket az id alapján megjelenítünk -> const response = await fetch("https://dummyjson.com/recipes/" + id);
URL majd, így fog kinézni ha a főoldalon az elsőre kattintunk rá és azt akarjuk megjeleníteni -> https://dummyjson.com/recipes/1
és, ahogy szoktuk ezt a response objektumot, amit majd visszakapunk, ezt JSON formátumban kapjuk meg 
const json = await response.json();
elmagyarazas.js-ben lesz, hogy mi ez pontosan 
!!!!!!!!!!!!!!!!!!!!
és, ami nagyon fontos itt, hogy ebben a függvényben setteljük, amit visszakaptunk json-ban adatokat 
setRecipe(json);
a függványt egy useEffect-ben kell majd meghívni
useEffect(()=> {
    getRecipe();
}, []);
3. hogy megjelenítsük ezeket a dolgokat pl. a képet a böngészőben, abban a kódban kell, amit a return()-ben csinálunk -> 
<div className="recipe-page-img">
    <img src={recipe.image}/>
</div>
**************************************************************************************************************************************
Ezeket a dolgokat, amiket meg szeretnénk jeleníteni a json-ból ezeket, majd el kell rendezni -> 
grid-rendszer
    <div className="box">
        <h3>{recipe.name}</h3>

        <div className="recipe-data-grid">
            <div>
                <h4>Cuisine</h4>
                {recipe.cuisine}
            </div>
            <div>
                <h4>Difficulty</h4>
                {recipe.difficulty}
            </div>
van ez a boxunk, amiben a legtetején megjelenítjük, hogy melyik ételről van 
utána csináltunk egy div-et, aminek megadtunk egy className="recipe-data-grid"-et ez egy display: grid, grid-template-columns: 1fr 1fr
ebbe beleraktunk még két div-et, az egyikben megjelenítjük a cuisine-t a másikban pedig a difficulty-t 
    <h4>Cuisine</h4>
    {recipe.cuisine}
Beírtuk egy h4-es tagbe, hogy Cuisine, hogy tudjuk, hogy miről van szó, ne csak az jelenjen meg, hogy italian, amit ugye ezzel 
jelenítünk meg -> {recipe.cuisine}
difficulty-t ugyanilyen formában 
ez most, így jelenik meg a böngészőben, ugye van egy kétosztható grid -> recipe-page-grid
.recipe-page-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
}
ebben van két darab div, mindegyiknek meg van adva a className="box" 
.box {
    background-color: #a9f4e3;
    border: 1px solid #8fccbe;
    margin-left: -1px;
}
és az egyikben a kép van, az látható az egész container bal oldalán tehát az a első 1 fr, a másidok 1fr, pedig azok a dolgok, amiket 
most csinálunk
<div className="box">
    <h3>{recipe.name}</h3>

    <div className="recipe-data-grid">
        <div className="white-box">
            <h4>Cuisine</h4>
            {recipe.cuisine}
        </div>
        <div className="white-box">
            <h4>Difficulty</h4>
            {recipe.difficulty}
        </div>
    </div>
</div>

                                                Classic Margherita Pizza
                        Cuisine                                                          Difficulty
                        Italian                                                             Easy
valahogy ilyen formában, tehát legfelül a {recipe.name}
alatta egy className="recipe-data-grid"-ben pedig a <h4>Cuisine</h4> és alatta a recipe.cuisine}
ugyanígy a Difficulty, ami a recipe-data-grid második 1fr-re lesz 
mindegyik-nek adtunk mág egy className="white-box" -ot -> 
    <div className="white-box">
        <h4>Difficulty</h4>
        {recipe.difficulty}
    </div>
még megadtunk neki ugyanilyen formában két dolgot Calories és Cook time
    <div className="white-box">
        <h4>Calories</h4>
        {recipe.caloriesPerServing} kCal
    </div>
    <div className="white-box">
        <h4>Cook time</h4>
        {recipe.cookTimeMinutes} minuntes
    </div>
és akkor így már a Cuisine és a Difficulty alatt ugyanilyen formában megjelennek a Calories és a Cook time
ugye egy white-box-ban, aminek fehér a háttérszíne 

Következő dolog, amit meg szeretnénk jeleníteni az az instructions, ami egy tömb, ahol fel vannak sorolva az instrukciók
így néz ki a json-ben ->
instructions: Array(6)
    0: "Preheat the oven to 475F (245C)"
    1: "Roll out the pizza dough and spread tomato sauce evenly"
    2: "Top with slices of fresh mozzarella and basil leaves"
    3: ....
    4: ....
    5: ....
    length: 6
    [[Prototype]]: Array

és ezeket szeretnénk megjeleníteni egy listában -> 
    <div style={{gridColumn: "1/3"}}>
        <h4>Instructions</h4>
        <ul className="recipe-list">
            {
                recipe.instructions.map((ins, i)=>
                <li key={i}>{ins}</li>
                )
            }
        </ul>
    /div>
Tehát az egészet belerakjuk egy div-be, ami fontos, hogy kapott egy style={{gridColumn: "1/3"}}
mert ugye ez egy recipe-data-grid-ben van benne, ami 1fr 1fr és ennek nem lenne elég az egy 1 fr-es szélesség, azért 
gridColumn: "1/3"-val felveszi mindkettőt tehát az elsőtől indul a 3-ig, amit ugye már nem vesz fel, itt nincs is ilyen 
feleveszi az 1fr és 1fr-t tehát az egész szélességét nem csak a felét 
itt még csináltunk egy <h4>Instructions</h4>, hogy tudjuk miről van szó 
meg utána megjelenítjük ul-ben az li-ket, ugy hogy végigmegyünk map-val a recipe.instructions-on 
    {
        recipe.instructions.map((ins, i)=>
        <li key={i}>{ins}</li>
        )
    }
Teljesen ugyanilyen formában megjelenítjük az ingredientseket is, csak azok elöbb lesznek, mint az instructions-onok

és, hogy megformázzuk a listákat, megadunk minegyik ul-nek egy className="recipe-list"-et, ami list-style: none; !!!!!

Átírtuk const [recipe, setRecipe] = useState(null); tömbről null lett 
és mindig mielött meg akarunk jeleníteni valamit le kell ellenóriznünk, hogy a recipe létezik-e, mert a getRecipe async 
függvényünknek időbe tellik, amig lehozza az adatokat az API-ból és ugy probálja elöször megjeleníteni az első kirajzoláskor, 
hogy a recipe az még nincsen beállítva semmire sem -> const [recipe, setRecipe] = useState(null);
ezért kell eléírni midengyiknél -> 
{recipe && recipe.image}
{recipe && recipe.name}
{recipe && recipe.caloriesPerServing}
recipe && recipe.ingredients.map((ing, i)=>
<li key={i}>{ing}</li>
!!!!!!!!!Le kell ellenőrizni, hogy a recipe létezik-e és ezért muszály, azt mondanunk, hogy Recipe &&

az ingredients az mégsem style={{gridColumn: "1/3"}}, mert nem kell neki az egés sor és megjelenítjük mellé a Prepare time minutes-et
de azt szeretnénk, hogy az ingredients az egy hosszú valami és mellé kettőt akarunk betenni, ilyen prep time-ból pl. ami egy sor
ezért ->
    <div style={{gridRow:"3/5", GridColumn:"2/3"}} className="white-box">
        <h4>Ingredients</h4>
        <ul className="recipe-list">
gridRow beállítottuk, hogy kér sort vegyen fel a gridColumn-nél pedig azt, hogy a második sorban legyen
valahogy, így fog kinézni ->
                Prep time                          Ingredients
                 15 min                              valami
                                                     valami
                Meal type                            valami
               lunch, dinner                         valami
                                                     valami

a meal type, az egy tömb és akkor nem map-val megyünk végig rajta, hanem join-val a tömbböl stringeket csinálunk -> 
{recipe && recipe.mealType.join(", ")} 
és akkor nem egymás alá rakja be őket, hanem vesszővel elválasztva egymás mellé, ahogy felette van a Meal type-nál 
******************************************************************************************************************
Az volt a kérdés, hogy most a kép az kicsit kisebb, mint a másik ahol vannak ezek a dolgaink, hogy difficulty, calories, ingredients stb.
és hogy ugyanakkora legyen a kép, mint a ezek, de ezt nem lehet megoldani, mert ugye itt nincse meghatározott magasság
valahol több ingredients van meg instructions és emiatt ugye az egyiknél sokkal kisebb a kép a másiknál nem annyira, de
ezt nem lehet megoldani pont emilyatt, amit leírtam
*/



export default RecipeP;