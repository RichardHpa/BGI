<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css" crossorigin="anonymous">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script>
    function backgroundLoaded(element) {
        var url = "url('" + element.src + "')";
        var parent = element.parentNode;
        var bgPosition = element.dataset.position;
        if (bgPosition) {
            parent.style.backgroundPosition = bgPosition;
        }
        parent.style.backgroundImage = url;
        parent.style.opacity = "1";
    }
    </script>
</head>
<body>
    @include('partials._nav')
