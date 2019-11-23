<header>
    @if (Auth::check())
        <div class="bg-dark text-white px-5 py-2 d-flex justify-content-between ">
            <span>Welcome {{ Auth::user()->name }}</span>
            <div class="text-white">
                <a href="{{ url('/admin') }}" class="ml-3">Go to Dashboard</a>
                <a href="{{ route('logout') }}" class="ml-3"
                   onclick="event.preventDefault();
                                 document.getElementById('logout-form').submit();">
                    {{ __('Logout') }}
                </a>
            </div>
        </div>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
    @endif
    <div class="container">
        <div class="row p-2">
            <div class="col d-flex justify-content-center">
                <a href="{{ url('/') }}">
                    <img id="logo-main" src="{{ asset('images/BGI-Logo-Blue.png') }}" alt="Logo for BGI">
                </a>
            </div>
        </div>
        <nav id="navigation" class="navbar navbar-expand-lg">
            <div class="container justify-content-center">
                <button class="navbar-toggler custom-toggler mb-4" type="button" data-toggle="collapse" data-target="#mainNavigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse" id="mainNavigation">
                    <ul class="navbar-nav nav-fill w-100">
                        <li class="nav-item">
                            <a class="nav-link" href="/programmes">Programmes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/staff">Staff</a>
                        </li>
                        {{-- <li class="nav-item">
                            <a class="nav-link" href="#">History</a>
                        </li> --}}
                        {{-- <li class="nav-item">
                            <a class="nav-link" href="#">Kallio Kunsthalle</a>
                        </li> --}}
                        {{-- <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li> --}}
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</header>
