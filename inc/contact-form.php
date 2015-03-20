<?php
use PFBC\Form;
use PFBC\Element;
use PFBC\View;
?>
<?php
// form is posted
if(isset($_POST)&&!empty($_POST)) {

    $to = "jason.sherwin@gmail.com";
    $subject = "Contact Form from jason.sherwin@gmail.com";
    $name_field = $_POST['Name'];
    $email_field = $_POST['Email'];
    $message = $_POST['Message'];
    $headers = 'From: jason.sherwin@gmail.com' . "\r\n" .
               'Reply-To: ' . $_POST['Email'] . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
     
    $body = "From: $name_field\n E-Mail: $email_field\n Message:\n $message";
    
    
    echo '<div id="confirm">';
        echo '<h2 class="med-txt">Message has been sent!</h2>';
        echo '<p>Thanks for contacting us. We\'ll get back to you soon!</p>';
    echo '</div>';

    mail($to, $subject, $body, $headers);


} else {

    // show form
    include('inc/PFBC/Form.php');

    $form = new PFBC\Form("contact-form");
    $form->configure(array(
        "prevent" => array("bootstrap", "jQuery", "focus"),
        "view" => new View\Vertical
        // "labelToPlaceholder" => 1
    ));
    $form->addElement(new PFBC\Element\Textbox("Name", "Name", array("required" => 1)));
    $form->addElement(new PFBC\Element\Textbox("Email", "Email", array("required" => 1)));
    $form->addElement(new PFBC\Element\Textarea("Message", "Message", array("required" => 1)));
    $form->addElement(new PFBC\Element\Button("Submit", "submit", array("class" => "green-button-link bebas")));
    $form->render();

}
?>