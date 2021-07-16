@php
    $route_name = Request::route()->getName();
    $route_name = explode('.', $route_name);
    $route_name = implode('_', $route_name);
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{  config('app.description', 'Lorem ipsum sin dolor amet dolor')}}">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'MSU Content Management') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">

        <!-- Styles -->
        <link href="{{ asset('css/global.css') }}" rel="stylesheet">
        <link href="{{ asset('css/cms.css') }}" rel="stylesheet">
    </head>
    <body class="{{$route_name}}">
        <x-sprite/>
        <x-header/>
        @yield('main')
        <x-footer/>
    </body>
</html>