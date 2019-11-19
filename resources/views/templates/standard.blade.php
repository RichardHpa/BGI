@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>{{$page->page_title}}</h1>
            </div>
        </div>
        @foreach ($blocks as $block)
            @switch($block->block_type)
                @case('textBlock')
                    <div class="row">
                        <div class="col">
                            {!! $block->block_content !!}
                        </div>
                    </div>
                    @break
                @case('imageBlock')
                    <div class="row">
                        <div class="col text-center">
                            <img src="images/uploads/originals/{{ $block->block_content }}" class="img-fluid">
                        </div>
                    </div>
                    @break
            @endswitch
        @endforeach
    </div>
@endsection
