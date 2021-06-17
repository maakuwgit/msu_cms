@extends('layouts.app')

@section('content')
<div class="container d-flex flex-column h-100 align-items-center justify-content-center">
  <section class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-10">
      @if (session('status'))
      <aside class="alert alert-success" role="alert">
        {{ session('status') }}
      </aside>
      @endif
      <form method="POST" action="{{ route('password.email') }}">
        @csrf
        <div class="card mb-0">
          <legend class="card-header">{{ __('Reset Password') }}</legend>
          <div class="card-body mb-0">  
            <p>Please enter your email and we'll send you a password reset link.</p>
            <fieldset class="mb-3">
              <label for="email">{{ __('E-Mail Address') }}</label>
              <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
              @error('email')
              <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
              </span>
              @enderror
            </fielset>
          </div>
          <nav class="card-footer d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
                {{ __('Send') }}
            </button>
          </nav>
        </div>
      </form>
    </div>
  </section>
</div>
@endsection