<?php get_header();
$cat_id = get_queried_object_id();
$posttags = get_the_tags();
?>
    <!-- inicio main -->
<main class="container-fluid col-12 col-md-7">
  <section class="mt-3">
    <section
      class="flex flex-row row gap-3 mt-3 flex-wrap justify-content-center"
    >
        <div class="section-header">
            <h2 class="section-title"><?php single_cat_title(); ?></h2>
            <p class="section-subtitle"><?php echo category_description($cat_id); ?></p>
        </div>
<!-- inicio loop -->
        <div class="blog-grid">
          <?php if(have_posts()) : while (have_posts()) : the_post(); ?>
<!-- inicio... card blog/trabajos -->
            <a class="blog-card-link" href="<?php the_permalink(); ?>">
              <article class="blog-card">
                  <div class="card-image-wrapper">
                      <!-- <img src="https://api.adalgarcia.com/api/post/image/1717083021.png" alt="Portafolio Web 1.0"> -->
                      <?php if(has_post_thumbnail() ) { the_post_thumbnail('homepage-thumb');} ?>
                  </div>
                  <div class="card-content">
                      <h3 class="card-title"><?php the_title() ?></h3>
                      <p class="card-description">
                      <?php echo the_excerpt(); ?>
                      </p>
                      <?php if ($posttags) : ?>
                      <div class="card-footer-info">
                      <?php foreach($posttags as $tag) : ?>
                        <span class="tag"><?php echo $tag->name . ' '; ?></span>
                      <?php endforeach; ?>
                      </div>
                      <?php endif; ?>
                  </div>
              </article>
            </a>
<!-- fin... card blog/trabajos -->
          <?php endwhile; else : ?>
          <article class="col card-article">
              <div class="card border-0">
                <div class="card-body row row-col-1 w-100 mx-auto text-center">
                  <h5
                    class="card-title link-info link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-opacity-75-hover"
                  >
                    El post que buscas no existe
                  </h5>
                  <div>
                    Verifica que la url este escrita correctamente
                  </div>
                </div>
              </div>
          </article>
          <?php endif; ?>
        </div>
          <!-- fin loop  -->

    </section>
  </section>
</main>
    <style>
    div.post-image {
    width: 275px;
    border-radius: 10px;
    overflow: hidden;
    }
    video {
    width: 280px;
    height: 160px;
    }
    </style>
    <!-- fin main  -->
    <?php get_footer(); ?>
