@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="row">
            <div class="col text-center">
                <h3 class="display-4 font-weight-normal">Staff</h3>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        <div class="row">
            @if($staff)
                @foreach($staff as $member)
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="card text-center shadow-lg mb-3 staffCard" data-id="{{$member->id}}">
                            @if($member->image)
                                <img src="images/uploads/square/{{$member->image}}" class="img-fluid card-img-top shadow-lg " alt="">
                            @else
                            <img src="images/placeholder.jpg" class="img-fluid card-img-top shadow-lg " alt="">
                            @endif
                            <div class="card-body">
                                <h4 class="card-title">{{$member->name}}</h4>
                                <p>{{$member->role}}</p>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    <div class="modal fade" id="staffModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
                <div class="row">
                    <div class="col-12 col-md-5">
                        <img id="staffImg" src="" class="img-fluid card-img-top shadow-lg " alt="">
                    </div>
                    <div class="col-12 col-md p-3">
                        <div class="pr-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <h3 id="staffTitle"></h3>
                                <a id="staffEmail" href="#"><i class="fas fa-envelope fa-2x"></i></a>
                            </div>
                            <p id="staffRole"></p>
                            <p id="staffBio"></p>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
    </div>
@endsection
