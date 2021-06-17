@extends('layouts.app')

@section('content')
<div class="container d-flex flex-column h-100 align-items-center justify-content-center">
  <section class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-10">
      <form method="POST" action="{{ route('password.update') }}"">
        @csrf
        <div class="card mb-0">
          <legend class="card-header">{{ __('Reset Password') }}</legend>
          <div class="card-body mb-0">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">
            <fieldset class="mb-3">
              <label for="email">{{ __('E-Mail Address') }}</label>
              <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>
              @error('email')
              <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
              </span>
              @enderror
            </fieldset>
            <fieldset class="mb-3">
              <label for="password">{{ __('Password') }}</label>
              <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
              @error('password')
              <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
              </span>
              @enderror
            </fieldset>
            <fielset class="mb-3">
              <label for="password-confirm">{{ __('Confirm Password') }}</label>
              <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
            </fielset>
          </div>
          <nav class="card-footer">
            <button type="submit" class="btn btn-primary">
              {{ __('Reset Password') }}
            </button>
          </nav>
        </div>
      </form>
    </div>
  </section>
</div>
@endsection