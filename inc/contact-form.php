<?php
use PFBC\Form;
use PFBC\Element;
use PFBC\View;

// show form
include('inc/PFBC/Form.php');

$form = new Form("contact-form");
$form->configure(array(
    "prevent" => array("bootstrap", "jQuery", "focus"),
    "view" => new View\Vertical,
    "ajax" => 1,
    "ajaxCallback" => "successfullyMailedCallback"
));
$form->addElement(new Element\Hidden("form", "validation"));
$form->addElement(new Element\Hidden("form", "ajax"));
$form->addElement(new Element\Textbox("Name", "Name", array("required" => 1)));
$form->addElement(new Element\Email("Email:", "Email", array("required" => 1)));
$form->addElement(new Element\Textarea("Message", "Message", array("required" => 1)));
$form->addElement(new Element\Button("Submit", "submit"));
$form->render();
?>

<script type="text/javascript">
function successfullyMailedCallback(resp) {

    var $submitBtn = $('#contact-form input[type="submit"]');

    $submitBtn.fadeOut(function(){
        $submitBtn.attr({'disabled':'disabled','value':'Message Sent!'});
        $submitBtn.fadeIn();

        setTimeout(function(){
            $submitBtn.fadeOut(function(){
                $submitBtn.removeAttr('disabled').attr({'value':'Submit'});
                $submitBtn.fadeIn();
            });
        },4000);
    });
}
</script>

<?php
// form submitted
if(isset($_POST)&&!empty($_POST)) {

    $to = "info@cityconstructors.com";
    $subject = "Contact from City Constructors Website";
    $name_field = $_POST['Name'];
    $email_field = $_POST['Email'];
    $message = $_POST['Message'];
    $headers = 'From: ' . $to .  "\r\n" .
               'Reply-To: ' . $_POST['Email'] . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
     
    $body = "From: $name_field\n\nE-Mail: $email_field\n\nMessage:\n$message";

    mail($to, $subject, $body, $headers);

}
