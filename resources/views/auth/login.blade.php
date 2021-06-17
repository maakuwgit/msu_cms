@extends('layouts.app')

@section('content')
<div class="container d-flex flex-column h-100 align-items-center justify-content-center">
  <form method="POST" action="{{ route('login') }}">
    @csrf
    <div class="card mb-0">
      <legend class="card-header">{{ __('Login') }}</legend>
      <div class="card-body mb-0">
        <p>Please enter your email and password to proceed.</p>
        <fieldset class="mb-3">
          <label for="email">{{ __('Email') }}</label>
          <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
          @error('email')
          <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
          </span>
          @enderror
        </fieldset>
        <fieldset class="mb-3">
          <label for="password">{{ __('Password') }}</label>
          <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
          @error('password')
          <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
          </span>
          @enderror
        </fieldset>
        <fieldset class="mb-3">
          <div class="d-flex align-items-center">
            <input class="border-battleship" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
            <label class="my-auto ms-1" for="remember">{{ __('Remember Me') }}</label>
          </div>
        </fieldset>
        @if (Route::has('password.request'))
        <p class="small mb-0">
          <a href="{{ route('password.request') }}">
            {{ __('Forgot Your Password?') }}
          </a>
        </p>
        @endif
      </div>
      <nav class="card-footer d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">
            {{ __('Login') }}
        </button>
      </nav>
    </div>
  </form>
</div>
@endsection