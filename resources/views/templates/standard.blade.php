@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>{{$page->page_title}}</h1>
            </div>
        </div>
        @foreach ($blocks as $block)
            @switch($block->section_type)
                @case('textBlock')
                    <div class="row">
                        <div class="col">
                            {!! $block->section_content !!}
                        </div>
                    </div>
                    @break
                @case('imageBlock')
                    <div class="row">
                        <div class="col">
                            <img src="images/uploads/originals/{{ $block->section_content }}" class="img-fluid">
                        </div>
                    </div>
                    @break
            @endswitch
        @endforeach
    </div>
@endsection
