<?php get_header(); ?>
<!-- inicio main -->
<!-- <main class="container-fluid col-10 col-md-5 pb-5"> -->
<main class="container">
  <!-- header post -->
  <section class="mt-3">
    <h1><?php the_title(); ?></h1>
    <?php $post_id = get_the_ID(); ?>
    <strong class="text-secondary"><?php echo get_the_author_meta('display_name', get_post_field('post_author', $post_id)); ?></strong>
    <span class="text-warning">|</span>
    <small class="text-info-emphasis fs-6">
        <?php echo get_the_date('D M j'); ?>
    </small>
    <div class="text-center mt-1 text-info container">
      <div class="row row-cols-auto g-3">
        <?php $tags = get_the_tags($post_id); 
        foreach ($tags as $tag) { ?>
          <div class="tags col me-2">
            <?php echo $tag->name ?>
          </div>
        <?php } ?>
      </div>
    </div>
    <hr class="border border-danger border-3 opacity-75" />
  </section>

  <!-- image post -->
  <section class="my-5 d-flex justify-content-center">
    <div class="rounded-3 mx-3 w-75">
      <div class="rounded-3">
        <?php if (has_post_thumbnail() ) { the_post_thumbnail('single-thumb', ['class' => 'w-100']);}?>
      </div>
    </div>
  </section>

  <section class="container">
<?php echo get_the_content(); ?>
  </section>
  <hr class="border border-danger border-3 opacity-75 mt-5" />
  <section class="w-100 mt-3">
<?php       
if ( comments_open() || get_comments_number() ) :
    comments_template();
endif;
?>


  </section>
</main>
<!-- fin main  -->
<?php get_footer(); ?>
