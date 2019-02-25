<?php

// Array indexes are 0-based, jCarousel positions are 1-based.
$first = intval($_GET['first']);
$last  = intval($_GET['last']);

// ---

$tovars = array(
" <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> "," <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img23.jpg' width='116' height='76' alt='#' /> <strong>гипсокартон листовой КНАУФ</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
" <a href='#'> <img src='images/img24.jpg' width='116' height='76' alt='#' /> <strong>кирпич огнеупорный FAGOT</strong> </a> <span class='price'> <em>68.41</em><span class='rur'>p<span>уб.</span></span>/м&sup2; </span> ",
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
