<?php

// Array indexes are 0-based, jCarousel positions are 1-based.
$first = intval($_REQUEST['first']) - 1;
$last  = max($first + 1, intval($_REQUEST['last']) - 1);

// ---

$brands = array(
	"<a href='#'><img src='img/brand1.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand2.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand3.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand4.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand5.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand6.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand7.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand8.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand9.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand1.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand2.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand3.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand4.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand5.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand6.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand7.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand8.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand9.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand1.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand2.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand3.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand4.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand5.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand6.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand7.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand8.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand9.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand1.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand2.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand3.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand4.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand5.jpg' alt='' width='100' height='27' /></a>",
	"<a href='#'><img src='img/brand6.jpg' alt='' width='100' height='27' /></a>",
);

$total = count($brands);

function getPos($in, $kolvo){
	return round(((($in) / $kolvo) - floor(($in) / $kolvo)) * $kolvo);
}
$selected = array();

for ($i=$first; $i<=$last; $i++){
	$pos = getPos($i, $total);
	array_push($selected, $brands[$pos]);
}

echo'{';
echo'"total":"';
echo $total;
echo '",';
echo '"brands":[';
foreach ($selected as $br) {
		echo'{"brand":"';
		echo $br;
		echo'"},';
	}
echo']}';


?>
