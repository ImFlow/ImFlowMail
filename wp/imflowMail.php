<?php

defined('ABSPATH') or die('No script kiddies please!');

/* also read https://codex.wordpress.org/Writing_a_Plugin */

/*

Plugin Name: Imflow Mail

Description: Mailplugin for static wordpress pages

*/

function TestContactForm($atts)
{

    return '<h1>fooo: ' . $atts['test'] . '</h1>';
}

add_shortcode("Testcontactform", "TestContactForm");

function RenderContactForm($atts = array())
{
    extract(shortcode_atts(array(
        'apikey' => '',
        'privacy_uri' => ''
    ), $atts));


    $form_array = array(
        array('id' => 'name', 'name' => 'Name', 'type' => 'text', 'placeholder' => ''),
        array('id' => 'email', 'name' => 'E-Mail', 'type' => 'email', 'placeholder' => ''),
        array('id' => 'subject', 'name' => 'Betreff', 'type' => 'text', 'placeholder' => ''),
        array('id' => 'msg', 'name' => 'Nachricht', 'type' => 'textarea', 'placeholder' => ''),
    );

    $ret = '<div id="form-box">';
    $ret .= '<p id="failureMessage" style="color:red;"></p>';
    $ret .= '<form>';
    $ret .= '<input type="hidden" id="apikey" value="' . $apikey . '">';
    foreach ($form_array as $key => $value) {
        $ret .= '<label for="' . $value['id'] . '">' . $value['name'] . ':</label>';
        if ($value['type'] !== 'textarea') {
            $ret .= '<input type="' . $value['type'] . '" placeholder="' . $value['placeholder'] . '" name="' . $value['id'] . '" id="' . $value['id'] . '">';
        } elseif ($value['type'] == 'textarea') {
            $ret .= '<textarea placeholder="' . $value['placeholder'] . '" id="' . $value['id'] . '"></textarea>';
        }
    }

    $ret .= '<input type="checkbox" id="confirmField" style="margin-right: 10px;">';
    $ret .= '<label class="label-inline" for="confirmField">Ich akzeptiere die <a href="' . $privacy_uri . '" target="_blank" rel="noopener noreferrer">Datenschutzbedingungen</a>.</label><br />';
    $ret .= '<input class="btn btn-outline-secondary" style="margin-top: 10px;" id="submit" type="submit" value="Nachricht abschicken">';
    $ret .= '</form>';
    $ret .= '</div>';

    return $ret;
}

add_shortcode("contactform", "RenderContactForm");

function wpb_hook_javascript()
{
?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <style>
        .clickable-row:hover {
            cursor: pointer;
            background-color: #eee !important;
        }

        .antispam {
            display: none;
        }
    </style>
<?php
}
add_action('wp_head', 'wpb_hook_javascript');


function wpb_hook_javascript_footer()
{
?>
    <script>
        jQuery(document).ready(function($) {
            $(".clickable-row").click(function() {
                window.location = $(this).data("href");
            });
        });
    </script>
<?php
}
add_action('wp_footer', 'wpb_hook_javascript_footer');



add_action('wp_enqueue_scripts', 'callback_for_setting_up_scripts');
function callback_for_setting_up_scripts()
{
    wp_register_style('imflowmail', plugins_url('/css/imflowMail.css', __FILE__));
    wp_enqueue_script('imflowmailjs', plugins_url('/js/imflowMail.js', __FILE__), array('jquery'), 1.1, true);
    wp_enqueue_style('imflowmail');
}
