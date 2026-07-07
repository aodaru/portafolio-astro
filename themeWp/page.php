<?php get_header(); ?>
    <!-- inicio main -->
<main class="container">
  <div class="row justify-content-center">
<?php if(is_front_page()): ?>
<section class="video-container mb-4 animate-fade-in">
      <video
        autoplay
        muted
        loop
        playsinline
      >
        <source
  src="<?php bloginfo('template_url'); ?>/img/TazaCafeASCII.webm"
          type="video/webm; codecs=vp9"
        />
      </video>
  </section>

  <section
    class="intro-section animate-fade-in"
  >
    <p class="mb-0 fs-5">
      Apasionado a la tecnología, con muchas ganas de seguir aprendiendo
    </p>
  </section>

  <section
    class="d-flex flex-column align-items-center flex-md-row justify-content-center justify-content-md-around mt-4"
  >
    <div class="mt-1 order-1 order-md-0 text-center text-md-start">
      <h2 class="mt-3 mb-0 fw-bold">Adal Michael García</h2>
      <small class="fs-6 col-md-6 col-lg-12">Desarrollador/Administrador de sistemas</small>
    </div>
    <div
      class="avatar-container"
    >
  <img src="<?php bloginfo('template_url'); ?>/img/Avatar.webp" alt="imagen perfil" />
    </div>
  </section>

  <section class="mt-4">
    <article class="card border-primary mb-3">
      <div class="card-header bg-primary d-flex align-items-center">
        <h3 class="cardHeader fw-bold">
          <span class="bootstrapIcons"> &#xF4A8;</span>
          Trabajos
        </h3>
      </div>
      <div class="card-body">
        <div class="h6 fw-bolder text-primary">
          Adal Michael García | Ingeniero informático
        </div>
        <p class="card-text mt-3">
          Experto en administración de sistemas con más de 12 años de
          experiencia. A lo largo de mi carrera, he desarrollado una amplia
          gama de soluciones informáticas, incluyendo:
        </p>
        <ul class="list-aod">
          <li>
            <strong>Reportes de ventas</strong> que optimizan el análisis y
            la toma de decisiones.
          </li>
          <li>
            <strong>Herramientas de consulta de datos</strong> que facilitan
            el acceso y la manipulación de información.
          </li>
          <li>
            <strong>Blogs</strong> que comparten mi conocimiento y
            experiencia con la comunidad.
          </li>
        </ul>
      </div>
    </article>

    <article class="card border-success mb-3">
      <div class="card-header bg-success d-flex align-items-center">
        <h3 class="cardHeader fw-bold">
          <span class="bootstrapIcons"> &#xF66B;</span>
          Bio
        </h3>
      </div>
      <div class="card-body ms-3">
        <div class="bioCard">
          <span class="bioSpan">1983</span> Nací en David, Provincia de
          Chiriquí, Panamá.
        </div>
        <div class="bioCard">
          <span class="bioSpan">2011</span> Complete mis estudios de
          Ingeniería en Sistemas computacionales en la Universidad Latina de
          Panamá
        </div>
        <div class="bioCard">
          <span class="bioSpan">2012 al presente</span> Inicio labores en
          Almacén Franklin Jurado
        </div>
      </div>
    </article>

    <article class="card border-info-subtle mb-3">
      <div class="card-header bg-info-subtle d-flex align-items-center">
        <h3 class="cardHeader fw-bold">
          <span class="bootstrapIcons"> &#xF2D4;</span>
          Pasatiempos
        </h3>
      </div>
      <div class="card-body">
        <p class="card-text">
          Electronica, Iot, Juegos de video, Música, etc.
        </p>
      </div>
    </article>

    <article class="card border-warning mb-3">
      <div class="card-header bg-warning d-flex align-items-center">
        <h3 class="cardHeader fw-bold">
          <span class="bootstrapIcons"> &#xF678;</span>
          Contacto
        </h3>
      </div>
      <div class="card-body d-flex flex-column gap-2">
        <a href="https://github.com/aodaru/aodaru" class="social-btn">
            <i class="bi bi-github"></i> &#64;aodaru
        </a>
        <a href="https://twitter.com/aodaru" class="social-btn">
            <i class="bi bi-twitter-x"></i> &#64;aodaru
        </a>
        <a href="https://www.instagram.com/aodarug/" class="social-btn">
            <i class="bi bi-instagram"></i> &#64;aodarug
        </a>
        <a href="https://www.facebook.com/adalg1" class="social-btn">
            <i class="bi bi-facebook"></i> &#64;adalg1
          </button>
        </a>
        <a href="https://www.linkedin.com/in/adal-garcia-471889197/" class="social-btn">
              <i class="bi bi-linkedin"></i> &#64;adalgarcia
        </a>
      </div>
    </article>

        <?php else: ?>
      <!-- header post -->
      <section id="wpheader">
        <h1><?php the_title(); ?></h1>
        <strong class="text-secondary"><?php echo get_the_author_meta('display_name', get_post_field('post_author', $post_id)); ?></strong>
        <span class="text-warning">|</span>
        <small class="text-info-emphasis fs-6">
          <?php echo get_the_date(); ?>
        </small>
      </section>
  <!-- header post -->
      <?php echo the_content(); ?>
      <?php endif ?>
  </div>
</main>
    <!-- fin main  -->
    <?php get_footer(); ?>
