@php
    $route_name = Request::path();
    $route_name = str_replace('/', ' ', $route_name);
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{  config('app.description', 'Lorem ipsum sin dolor amet dolor')}}">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Reset Password | MSU Study Abroad') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Styles -->
        <link href="{{ asset('css/cms.css') }}" rel="stylesheet">
        <link href="{{ asset('css/global.css') }}" rel="stylesheet">
    </head>
    <body class="{{$route_name}}">
        <x-sprite/>
        <x-header/>
        <main class="d-flex flex-wrap" style="background:url({{ asset('images/background-lg.jpg') }}) no-repeat center;background-size:cover">
            <article class="d-flex m-0 px-0 align-items-stretch justify-content-stretch h-100 w-100 flex-column" style="padding-top: 5.875rem">
                @yield('content')
            </article>
        </main>
    </body>
</html>