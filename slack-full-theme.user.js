// ==UserScript==
// @name         Slack Full Theme plugin (Original by Fadee Kannah)
// @namespace    http://justindriggers.com/
// @version      2.0.0
// @description  Applies the side bar colors for slack to the entire application
// @author       Justin Driggers
// @match        https://*.slack.com/*
// @run-at       document-end
// ==/UserScript==

$(document).ready(function(){
    var checkInterval = setInterval(function(){
        if(Ready()){
            getColors();
        }
    },200);
});

function setUp(colors){
    applyColors(colors);
    addListner();
}

function Ready(){
    return typeof $('#loading_welcome')[0] != 'undefined';
}

function getColors(){
    var colors = null;
    $('#team_menu')[0].click();
    setTimeout(function(){
        $('#member_prefs_item > a')[0].click();
        setTimeout(function(){
            $('#fs_modal_sidebar li > a')[2].click();
            setTimeout(function(){
                //var colors = '#303E4D,#2C3849,#6698C8,#FFFFFF,#4A5664,#FFFFFF,#94E864,#78AF8F'.split(',');
                var colors = $('#sidebar_theme_custom').val().toString().split(',');
                setUp(colors);
                $('#fs_modal_close_btn')[0].click();
            },500);
        },500);
    },500);

    /* Array Index
0 Col BG
1 Menu BG
2 Active Item
3 Active Text
4 Hover Item
5 Text Color
6 Active presence
7 mention Badge
*/
}

function applyColors(colors){
    console.log(colors);
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'fullThemePlugin';
    var rgbText = hexToRgb(colors[5]);
    var rgbHover = hexToRgb(colors[0]);

    //header & footer styles
    style.innerHTML = '#client_header .channel_header .channel_name_container .channel_name{color:'+colors[5]+'}' +
        '#header{ background:'+colors[1]+'}' +
        '.channel_header_refresh #client_body:not(.onboarding):before{ background:'+colors[4]+'}' +
        '#messages_container.header_refresh.has_top_messages_banner:before{ background:'+colors[4]+'}' +
        '#client_header .channel_header #channel_header_info{ background:'+colors[4]+'}' +
        '#client_header .channel_header .channel_title_info{ background:'+colors[4]+'}' +
        '#client_header .channel_header .flex_header{ background:'+colors[4]+'}' +
        '#end_div{background:'+colors[4]+'}' +
        '#channel_members_toggle{ background:'+colors[4]+'}'+
        '#footer{background:'+colors[4]+'}'+
        '#primary_file_button.active, #primary_file_button:hover{background:'+colors[2]+';color:'+colors[3]+';border-color:'+colors[2]+'}'+
        '#client_header .channel_header #header_search_form .search_input{background:#fff !important}'+
        '#client_header .channel_header #header_search_form:hover .search_input{border-color:'+colors[2]+'}'+
        '#client_header .search_form .search_input:focus{border-color:'+colors[2]+'}'+
        '#client_header .channel_header .blue_hover:hover{color:'+colors[2]+'}'+
        '#client_header .channel_header #search_container .search_form .icon_search{z-index:5}';

    //divier styles
    style.innerHTML += '.day_divider .day_divider_label{background:'+colors[5]+';color:'+colors[2]+'}';

    //messages styles
    style.innerHTML += '.msgs_holder{background:'+colors[4]+'}'+
        'ts-message .bot_label{background:'+colors[4]+'}' +
        '.mention{color:'+colors[3]+';background:'+colors[7]+'!important}' +
        '.bot_message .message_sender, .bot_message .message_sender a{color:'+colors[5]+' !important}' +
        '.light_theme ts-message .message_content .member{color:'+colors[5]+' !important}' +
        '.message_body{color:rgba('+rgbText.r+','+rgbText.g+','+rgbText.b+',0.6)}' +
        '.message_body a{color:'+colors[2]+';opacity:1 !important}' +
        '.msg_inline_file_preview_title{color:'+colors[2]+'!important}'+
        'ts-message{color:rgba('+rgbText.r+','+rgbText.g+','+rgbText.b+',0.6)}' +
        'ts-message.active:not(.standalone):not(.multi_delete_mode):not(.highlight), ts-message:hover:not(.standalone):not(.multi_delete_mode):not(.highlight){background-color:rgba('+rgbHover.r+','+rgbHover.g+','+rgbHover.b+',0.6)}'+
        '#messages_unread_status, #messages_unread_status.header_refresh, #messages_unread_status.header_refresh:hover, #messages_unread_status.quiet.header_refresh, .header_refresh .clear_unread_messages{background:'+colors[2]+' !important}'+
        '.header_refresh .clear_unread_messages{border-left:1px solid '+colors[2]+'}'+
        'ts-message .action_hover_container a:hover{color:'+colors[2]+'}'+
        '#msgs_div .unread_divider hr{border-top:1px solid '+colors[2]+' !important}'+
        '#msgs_div .unread_divider .divider_label{color:'+colors[2]+' !important}';

    //Global Styles
    style.innerHTML += 'body{background:'+colors[4]+'}';

    //scroll bar styles
    style.innerHTML += '.monkey_scroll_bar{background:'+colors[1]+'!important}' +
        '.monkey_scroll_handle_inner{background:'+colors[2]+'!important;border:0!important}' +
        '.monkey_scroll_handle{position:relative;left:-1px!important;width:10px!important}';

    head.appendChild(style);

    return $(style);

}

function addListner(){
    $('#team_menu').on('click',function(){
        $('#member_prefs_item > a').on('click',function(){
            setTimeout(function(){
                $('.color_hex').on('input',function(){
                    changeColors();
                });
                $('input[name="sidebar_theme_rd"]').on('change',function(){
                    changeColors();
                });
                $('#sidebar_theme_custom').on('input change',function() {
                    changeColors();
                });
                $('.color_swatch').on('click', function(){
                    setTimeout(function(){
                        changeColors();
                    },700);
                });
            },500);
        });
    });
}

function changeColors(){
    var colors = $('#sidebar_theme_custom').val().split(',');
    $('#fullThemePlugin').remove();
    applyColors(colors);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

