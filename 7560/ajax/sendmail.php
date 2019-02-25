<? // WR-sendmail v 1.3.1  //  19.01.08 г.  //  Miha-ingener@yandex.ru

$myemail="email@email.ru";  // Ваш электронный адрес
$refreshpage="sendmail.php";  // Страница, куда возвращается человек после отправки сообщения
$antispam="1"; // 1/0 вкл.выкл АНТИСПАМ
$maxname="30";   // Максимальное кол-во символов в имени
$maxtema="50"; // максимум символов в теме
$maxmsg="1500";  // Максимальное количество символов в сообщении

// Далее настраивается цвет таблицы и текста: цвет таблицы и цвет текста в заголовке таблицы
// Для Выбора схемы - раскоментируйте её и закоментируйте текущую символами //
$bdcolor="#79BBEF";  $fcolor="#FFFFFF";  // Светлоголубой
//$bdcolor="#FF9A00"; $fcolor="#FFFFFF";   // Оранжевый
//$bdcolor="#FFE51A"; $fcolor="#00253B";   // Жёлтый
//$bdcolor="#00E900"; $fcolor="#00253B";   // Светло-зеленый
//$bdcolor="#007800"; $fcolor="#FFFFFF";   // Темно зеленый
//$bdcolor="#D2A500"; $fcolor="#FFFFFF";   // Золотой
//$bdcolor="#BCC0C0"; $fcolor="#FFFFFF";   // Серый
//$bdcolor="#00253B"; $fcolor="#FFFFFF";   // Темно-синий

$addstyle="style='font-family: Verdana; font-size: 12px; text-decoration: none; color: #000000; cursor: default; background-color: #FFFFFF; border-style: solid; border-width: 1px; border-color: #000000;'";
$shapka="<html><head><META http-equiv=Content-Type content='text/html; charset=windows-1251'></head><body>";
$back="<center>Вернитесь <a href='javascript:history.back(1)'><B>назад</B></a>"; // Удобная строка


// Для цифрозащиты антиспам:
$maxkey=4; // Колличество символов в коде  (можно изменять)
$absrand="676756";// Случайное число. Используется для цифрозащиты. Генерировать его нужно случайно при настройке или изменении конфигурации скрипта.
if (isset($_GET['image'])) {
// Функция с цифрами защиты
$st="R0lGODlhCgAMAIABAFNTU////yH5BAEAAAEALAAAAAAKAAwAAAI"; // общая часть для всех рисунков
function imgwr($st,$num){
 if ($num=="0") {$len="63"; $number=$st."WjIFgi6e+QpMP0jin1bfv2nFaBlJaAQA7";}
 if ($num=="1") {$len="61"; $number=$st."UjA1wG8noXlJsUnlrXhE/+DXb0RUAOw==";}
 if ($num=="2") {$len="64"; $number=$st."XjIFgi6e+QpMPRlbjvFtnfFnchyVJUAAAOw==";}
 if ($num=="3") {$len="64"; $number=$st."XjIFgi6e+Qovs0RkTzXbj+3yTJnUlVgAAOw==";}
 if ($num=="4") {$len="64"; $number=$st."XjA9wG8mWFIty0amczbVJDVHg9oSlZxQAOw==";}
 if ($num=="5") {$len="63"; $number=$st."WTIAJdsuPHovSKGoprhs67mzaJypMAQA7";}
 if ($num=="6") {$len="63"; $number=$st."WjIFoB6vxmFw0pfpihI3jOW1at3FRAQA7";}
 if ($num=="7") {$len="61"; $number=$st."UDI4Xy6vtAIzTyPpg1ndu9oEdNxUAOw==";}
 if ($num=="8") {$len="63"; $number=$st."WjIFgi6e+QpMP2slSpJbn7mFeWDlYAQA7";}
 if ($num=="9") {$len="64"; $number=$st."XjIFgi6e+QpMP0jinvbT2FGGPxmlkohUAOw==";}
 header("Content-type: image/gif"); 
 header("Content-length: $len");
 echo base64_decode($number); }
// Вывод изображений на экран (все кодированы - робот не пройдёт)
if (array_key_exists("image", $_REQUEST)) { $num=$_REQUEST["image"];
for ($i=0; $i<10; $i++) {if (md5($i+$absrand)==$num) {imgwr($st,$i); die();}} }
exit;}

//******************* Ниже лучше ничего не трогать ************************//

// Событие проверки на ошибки и отправки сообщения //
if (isset($_GET['event'])) { if ($_GET['event']=="add")  {

sleep(1); // мелкая защита от БОТОВ. Человеку секунда не время - а прога по подбору ключа - будет работать долго и не загружать сервер

if ($antispam!="0") {
$bada="$shapka $back <font color=red>Введённый вами код НЕ верен</font>!";
if (isset($_POST['usernum'])) {$usernum=$_POST['usernum'];} else {print"$bada"; exit;}
if (isset($_POST['xkey'])) {$xkey=$_POST['xkey'];} else {print"$bada"; exit;}
$userkey=md5("$usernum+$absrand");
if ($userkey!=$xkey) {print"$bada"; exit;}}

if (!isset($_POST['name'])) {print"$shapka $back Вы не ввели имя!";} else {$name=$_POST['name'];}
if (!isset($_POST['email'])) {print"$shapka $back Вы не ввели емайл!";} else {$email=$_POST['email'];}
if (!isset($_POST['tema'])) {print"$shapka $back Вы не ввели тему!";} else {$tema=$_POST['tema'];}
if (!isset($_POST['msg'])) {print"$shapka $back Вы не ввели сообщение!";} else {$msg=$_POST['msg'];}
if ($name=="" || strlen($name)>$maxname) {print "$shapka $back Вы не ввели имя, или вввели слишком длинное имя!</B></center>"; exit;}
if ($msg=="" || strlen($msg)>$maxmsg) {print "$shapka $back Ваше сообщение или пустое или превышает $maxmsg символов.</B></center>"; exit;}
//if ($tema=="" || strlen($tema)>$maxtema) {print "$shapka $back Вы не ввели тему!</B></center>"; exit;}
if(!preg_match("/^[a-z0-9\.\-_]+@[a-z0-9\-_]+\.([a-z0-9\-_]+\.)*?[a-z]+$/is", $_POST['email']) or $_POST['email']=="") {print "$shapka $back и введите корректный E-mail адрес!</B></center>"; exit;}

// Защита от взлома
$name=str_replace("|","&#124;",$name);
$tema=str_replace("|","&#124;",$tema);
$msg=str_replace("|","&#124;",$msg);
$text="$name|$tema|$email|$msg|";
$text=str_replace("&#032;",' ',$text);
$text=str_replace("&",'&amp;',$text);
$text=str_replace(">",'&gt;',$text);
$text=str_replace("<",'&lt;',$text);
$text=str_replace("\"",'&quot;',$text);
$text=preg_replace("/\n\n/",'<p>',$text);
$text=preg_replace("/\n/",'<br>',$text);
$text=preg_replace("/\\\$/",'&#036;',$text);
$text=preg_replace("/\r/",'',$text);
$text=stripslashes($text);
$text=preg_replace("/\\\/",'&#092;',$text);
$text=str_replace("\r\n","<br> ",$text);
$text=str_replace("\n\n",'<p>',$text);
$text=str_replace("\n",'<br> ',$text);
$text=str_replace("\t",'',$text);
$text=str_replace("\r",'',$text);
$text=str_replace('   ',' ',$text);
$exd=explode("|",$text); $name=$exd[0]; $tema=$exd[1]; $email=$exd[2]; $msg=$exd[3];


$host=$_SERVER["HTTP_HOST"]; $self=$_SERVER["PHP_SELF"]; $smailurl="http://$host$self";

$date=date("d.m.Y"); // число.месяц.год
$time=date("H:i:s"); // часы:минуты:секунды

// Настройки для отправки писем
$headers=null;
$headers.="Content-Type: text/html; charset=windows-1251\r\n";
$headers.="From: ".$name." <".$email.">\r\n";
$headers.="X-Mailer: PHP/".phpversion()."\r\n";

// Собираем всю информацию в теле письма
$allmsg="<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1251'>
<style>BODY {FONT-FAMILY: verdana,arial,helvetica; FONT-SIZE: 13px;} TD {FONT-SIZE: 12px;}</style></head>
<body><center><h4>Сообщение от посетителя сайта \"<B><a href='$smailurl'>$smailurl</a></B>\"</h4>
<table border=1 cellpadding=6 cellspacing=0 width=550 bordercolor='#DBDBDB'>
<tr><td colspan=2 align=center bgcolor='#E4E4E4'><B>Информация</B></td></tr>
<tr bgcolor='#F2F2F2'><td width=117>Имя:</td><td width=433><B>$name</B></td></tr>
<tr bgcolor='#F8F8F8'><td>Е-майл:</td><td><B>$email</B></td></tr>
<tr bgcolor='#F8F8F8'><td>Дата отправки:</td><td><small>$time</small> - $date г.</td></tr>
<tr bgcolor='#F8F8F8'><td>Тема:</td><td><B>$tema</B></td></tr>
<tr bgcolor='#F2F2F2'><td>Текст:</td><td>$msg</td></tr>
</table><center><BR>Ваше сообщение <B><font color=navy>успешно отправлено</font></B><BR><BR>
<a href='$refreshpage'>Вернуться <B>назад</B></a>";
$printmsg="$allmsg </body></html>";
$allmsg.="<BR><BR><BR>* Это сообщение сгенерировано и отправлено роботом с формы обратной связи. Отвечать на него не нужно.</body></html>";

// Отправляем письмо майлеру на съедение ;-)
mail("$myemail", "Обратная связь. Сообщение от $name", $allmsg, $headers);

// Пишем пользователю "Спасибо" и обновляем страницу через JavaScript
print "<script language='Javascript'>function reload() {location = \"$refreshpage\"}; setTimeout('reload()', 3000);</script>$printmsg"; exit;
}

}  else  {   // Типо главной страницы


print "<HTML><head><META content='text/html; charset=windows-1251' http-equiv=Content-Type></head>
<BODY text=#000000 leftMargin=0 topMargin=0 rightMargin=0 bottomMargin=0 marginheight=0 marginwidth=0><center>
<table border=0 width=510 cellpadding=1 cellspacing=0 bgcolor=$bdcolor><tr><td>
<table border=0 width=100% cellpadding=1 cellspacing=0 bgcolor=$bdcolor><tr><td>";

print "
<center><b><font size=+1 color=$fcolor>Задать вопрос Администратору</font></b></center>
</td></tr><tr><td colspan=2 width=100% bgcolor=#FFFFFF><center>
<form action=sendmail.php?event=add method=post name=REPLIER>
<table border=0 cellpadding=0 cellspacing=0 width=500>
<tr><td>&nbsp;</TD></TR>
<tr><td><B>Имя</B> <input type=text $addstyle value='' maxlength=$maxname name=name size=27> &nbsp;&nbsp;&nbsp; <B>Ваш E-mail</B> <input type=text $addstyle value='' name=email size=27></td></tr>
<tr><td>Тема сообщения: &nbsp; <input type=text $addstyle value='' maxlength=$maxtema name=tema size=57></td></tr>
<tr><td><B>Сообщение</B></td></tr>
<tr><td><textarea $addstyle cols=79 rows=10 size=500 name=msg></textarea>";

// Антиспам
if ($antispam!="0") {

// Вывод изображений на экран (все кодированы - робот не пройдёт)
if (array_key_exists("image", $_REQUEST)) { $num=$_REQUEST["image"];
for ($i=0; $i<10; $i++) {if (md5($i+$absrand)==$num) {imgwr($st,$i); die();}} }

$xkey=""; mt_srand(time()+(double)microtime()*1000000);

print"<TR><TD><B>Защитный код:</B> &nbsp;&nbsp;";
for ($i=0; $i<$maxkey; $i++) {
$snum[$i]=mt_rand(0,9); $psnum=md5($snum[$i]+$absrand);
$phpself=$_SERVER["PHP_SELF"];
echo "<img src=$phpself?image=$psnum border='0' alt=''>\n";
$xkey=$xkey.$snum[$i];
}
$xkey=md5("$xkey+$absrand");

print"&nbsp;&nbsp; <input name='usernum' $addstyle type='text' maxlength=$maxkey size=8><input name=xkey type=hidden value='$xkey'>&nbsp;&nbsp; <small>(введите число, указанное на картинке)</small></TD></TR>";
}


print"<TR><TD colspan=3><br><center><input type=submit $addstyle value='Отправить'></form></td></tr></table>";
}

?>

</td></tr></table></td></tr></table><BR><center><small>Powered by <a href='http://www.wr-script.ru/'>WR-Sendmail</a> &copy; 1.3</small></body></html>
