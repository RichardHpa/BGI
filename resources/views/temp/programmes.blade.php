@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="row">
            <div class="col text-center">
                <h3 class="display-4 font-weight-normal">Programmes</h3>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        <div class="row">
            @if($programmes)
                @foreach($programmes as $programme)
                    <div class="col-12 col-md-4">
                        <div class="card text-center shadow-lg mb-5 h-100">
                            <img src="images/uploads/thumbnails/{{$programme->image}}" alt="" class="img-fluid">
                            <div class="card-body">
                                <h5 class="card-title">{{$programme->name}}</h5>
                                <p class="card-text">{{$programme->tag_line}}</p>
                                <a href="/programmes/{{$programme->clean_name}}" class="btn btn-bgi btn-block">Read More</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">Challenge For Change</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">Strengthening Families</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">Te Awhi (The Embrace)</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">News Title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">News Title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card text-center shadow-lg mb-5">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em" dominant-baseline="middle" text-anchor="middle">Image cap</text></svg>
                    <div class="card-body">
                        <h5 class="card-title">News Title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-bgi">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
