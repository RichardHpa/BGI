<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css" crossorigin="anonymous">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script>
    function backgroundLoaded(element) {
        var url = "url('" + element.src + "')";
        var parent = element.parentNode;
        var bgPosition = element.dataset.position;
        if (bgPosition) {
            parent.style.backgroundPosition = bgPosition;
        }
        parent.style.backgroundImage = url;
        parent.style.opacity = "1";
    }
    </script>
</head>
<body>
    @include('partials._header')
    <div id="Banner">
        <div class="text-center text-white">
            <h1 class="display-4 font-weight-normal">The Wellington Boys and Girls Institute</h1>
            <p class="lead font-weight-normal">A great love for all young people</p>
        </div>
        <img src="images/Banner.jpg" alt="Banner Image" data-position="50% 50%" onload="backgroundLoaded(this)"/>
    </div>

    <div class="container">
        <section class="mt-5 mb-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-9 text-center">
                    <p>BGI is a youth development organization based in Wellington city.
                        We offer a range of youth programmes including mentoring, youth groups, youth leadership and family support.</p>

                    <p>Our heart is in developing young people holistically and relationally (physical, psychological, spiritual and social).
                            We engage and collaborate with young people and families, so they achieve their dreams and improve the wellbeing of themselves and others</p>
                </div>
            </div>
        </section>
        <section class="mb-5">
            <div class="row">
                <div class="col text-center">
                    <h3 class="display-4 font-weight-normal">Latest News from BGI</h3>
                </div>
            </div>
            <div class="row">
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
        </section>
    </div>

    <footer class="mt-5 p-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4 text-center text-md-left mb-4">
                    <h3>Follow Us</h3>
                    <i class="fab fa-facebook fa-2x"></i>
                    <i class="fab fa-instagram fa-2x"></i>

                </div>
                <div class="col-12 col-md-4 text-center mb-4">
                    <h3>Contact Us</h3>
                    <p>04 385 9549</p>
                </div>
                <div class="col-12 col-md-4 text-center text-md-right mb-4">
                    <h3>Visit Us</h3>
                    <p>3 Macdonald Crescent, <br>Te Aro, <br>Wellington 6141</p>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-12">
                    <p>© The Wellington Boys & Girls Institure, <?php echo date("Y"); ?></p>
                    <p><a href="http://www.richard-hpa.com" target="blank">Designed by Richard Hpa</a></p>
                </div>
            </div>
        </div>
    </footer>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

    </body>
</html>
