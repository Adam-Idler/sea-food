<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    exit();
}

$project_name = 'SeaFood';
$admin_email = 'seafood@seafish.store';
$form_subject = 'Заявка с сайта SeaFood';

$id = $_POST['id'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$message = 'default';

if ($id === 'call_form') {
    $message = "<h2>Посетитель <i>$name</i> <a href='http://seafish.store'>seafish.store</a> нуждается в консультации!</h2>";
    $message .= "<p>Номер, чтобы связаться с посетителем: $phone</p>";
} 

if ($id === 'section_gift') {
    $message = "<h2>Посетитель <i>$name</i> <a href='http://seafish.store'>seafish.store</a> хочет скидку 500 рублей!</h2>";
    $message .= "<p>Номер, чтобы связаться с посетителем: $phone</p>";
}

if ($id === 'section_quiz') {
    $form_subject = 'Помощь с заказом на сайте';
    $message = "<h2>Посетитель <i>$name</i> прошёл Квиз на сайте <a href='http://seafish.store'>seafish.store</a> и вот его результат:</h2>";

    $checkboxes = $_POST['quizCheckbox'];

    if (empty($checkboxes)) {
        $message .= '<p>Посетитель не выбрал, что ему больше всего нравится.</p>';
    } else {
        $things = '';
        $N = count($checkboxes);
        
        $message .= "<p style='margin-bottom: 5px'>Посетитель любит:</p>";
        $message .= "<ul>";
        for ($i = 0; $i < $N; $i++) {
            $message .= "<li>$checkboxes[$i]</li>";
        }
        $message .= "</ul>";
    }

    $help = $_POST['help'];

    if ($help[0] === 'yes') {
        $message .= '<p>Посетитель <b>нуждается</b> в помощи с выбором.</p>';
    } else if ($help[1] === 'yes') {
        $message .= '<p>Посетитель <b>не</b> нуждается в помощи с выбором.</p>';
    }

    $address = $_POST['address'];

    $message .= '<p style="margin-bottom: 5px"><i>Данные посетителя:</i> </p>';
    $message .= "<p style='margin-bottom: 0px; padding-left: 10px'><i>Адрес доставки:</i> $address</p>";
    $message .= "<p style='margin-bottom: 0px; padding-left: 10px'><i>Имя:</i> $name</p>";
    $message .= "<p style='margin-bottom: 0px; padding-left: 10px'><i>Телефон: $phone</i></p>";
}



$headers  = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $admin_email\r\n";

mail($admin_email, $form_subject, $message, $headers);
