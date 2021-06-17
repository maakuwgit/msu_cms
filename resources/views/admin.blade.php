@php
    $route_name = Request::path();
    $route_name = str_replace('/', ' ', $route_name);
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'MSU Study Abroad') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="{{$route_name}}">
        <x-sprite/>
        <x-topbar/>
        <main data-admin class="d-flex flex-wrap"></main>
    </body>
</html>