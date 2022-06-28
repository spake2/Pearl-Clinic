<?php
sleep(1);
//header("HTTP/1.0 400 Bad Request");
//echo "Hatalı Gelidi";
//exit;
$params=array();
$params["name"]=$_POST["lf_name"];
$params["tel"]=$_POST["lf_telephone"];
$params["mail"]=$_POST["lf_mail"];
$params["message"]=$_POST["lf_message"];

if(empty($params["message"]) OR strlen($params["message"])<3){
  header("HTTP/1.0 400 Bad Request");
  echo "Mesaj Gönder";
  exit;
}
//echo "Adınız: ",$name."<br>"."Numaranız: ",$tel."<br>"."Mail: ",$mail."<br>"."Mesajınız: ",$message." ";

function ok($content=false) {
  $return=array();
  $return["response"]="Bilgi Başarıyla Kaydedildi";
  $return["content"]=$content;
  header("HTTP/1.0 201 Created");
  header("content-type: application/json; charset=utf-8");
  return json_encode($return);
}

$text="";
foreach ($params as $key=>$val) {
  $text.=$key.": ".$val."<br>";
}
echo ok($text);

?>
