<?php

// Array indexes are 0-based, jCarousel positions are 1-based.
$first = intval($_GET['first']) - 1;
$last  = intval($_GET['last']) - 1;

// ---

$tovars = array(
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar4.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar5.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar3.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar1.jpg' alt=''/><span class='sale'><img src='i/sale10.png' alt='' width='80' height='80' /></span></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar1.jpg' alt='' /><span class='sale'><img src='i/sale2.png' alt='' width='80' height='80' /></span></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar3.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar4.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar1.jpg' alt='' /><span class='sale'><img src='i/sale2.png' alt='' width='80' height='80' /></span></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar3.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar4.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
	"<div class='tovar'><h2>Samsung <a href='#'>SGH-i900</a></h2><div class='img'><img src='i/tovar2.jpg' alt='' /></div><div class='by'><span class='price'>12999</span><a href='#' class='incard'>usd</a></div></div>",
);

$total = count($tovars);

function getPos($in, $kolvo){
	return round(((($in) / $kolvo) - floor(($in) / $kolvo)) * $kolvo);
}
$selected = array();

for ($i=$first; $i<=$last; $i++){
	$pos = getPos($i, $total);
	array_push($selected, $tovars[$pos]);
}

echo'{';
echo '"tov_col":"' . $total . '",';
echo '"tovars":[';
foreach ($selected as $tov) {
		echo'{"tovar":"';
		echo $tov;
		echo'"},';
	}
echo']}';


?>
