<!doctype html>
<html lang="es">
  <head>
      <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5SLLQZ6K');</script>
<!-- End Google Tag Manager -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>
<?php if (is_home()) {
    echo get_bloginfo('name');
} elseif (is_single()) {
    echo the_title();
} else {
    echo get_bloginfo('name');
}?>
    </title>
    <?php wp_head(); ?>
    <link rel="stylesheet" href="<?php bloginfo('template_url');?>/css/style.css" />
  </head>
  <body class="font-site">
      <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SLLQZ6K"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="display: none"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-moon-fill"
      viewBox="0 0 16 16"
    >
      <!-- svg de la luna -->
      <symbol id="moon-fill" viewBox="0 0 16 16">
        <path
          d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
        />
      </symbol>
      <symbol id="sun" viewBox="0 0 16 16">
        <path
          d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
        />
      </symbol>
    </svg>

    <!-- inicio del header -->
    <header
      class="bg-gb-filter fixed-top main-nav d-flex justify-content-center align-items-center no-print"
    >
      <nav class="navbar navbar-expand-lg col-md-7">
        <div class="container-fluid d-lg-flex">
          <a
            class="ms-2 navbar-brand fs-5"
href="<?php bloginfo('url'); ?>"
          >
            <i class="nf nf-md-tea icon-link icon-link-hover"></i>
            <span class="fw-bold">
              Adal Michael
              <!-- García -->
            </span>
            <span class="fw-bold"> García </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0"> -->
            <!--   <li class="nav-item"> -->
            <!--     <a class="nav-link" href="trabajos.html"> Trabajos </a> -->
            <!--   </li> -->
            <!--   <li class="nav-item"> -->
            <!--     <a class="nav-link" href="blog.html"> Blog </a> -->
            <!--   </li> -->
            <!--   <li class="nav-item"> -->
            <!--     <a -->
            <!--       class="nav-link active d-inline-flex align-items-center" -->
            <!--       aria-current="page" -->
            <!--       href="https://github.com/aodaru" -->
            <!--     > -->
            <!--       <i class="nf nf-fa-github icon-link icon-link-hover me-1"></i> -->
            <!--       repo -->
            <!--     </a> -->
            <!--   </li> -->
            <!-- </ul> -->
<?php wp_nav_menu(array(
  'container' => false,
  'menu_class' => '',
  'items_wrap' => '<ul class="navbar-nav me-auto mb-2 mb-lg-0">%3$s</ul>',
  'walker' => new Aod_Walker_Nav_Menu(),
  'theme_location' => 'menu-top'
));
?>
            <div class="d-flex">
              <button
                id="bd-theme"
                class="switchButtonMode me-2 py-1 px-2 rounded-3 border-0"
                type="button"
                aria-label="themeModeButton"
                data-bs-theme-value="light"
              >
                <svg class="bi my-1 theme-icon-active">
                  <use href="#sun"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <!-- fin de header -->

