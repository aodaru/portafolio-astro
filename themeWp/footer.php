    <!-- inicio footer -->

    <footer class="text-center" >
      <div>
             &copy; Adal Michael García&nbsp;<span id="currentYear"></span> <span class="d-inline d-sm-none"> | <i class="nf-fa-wordpress_simple"></i></span>
        </div>
      <div class="d-none d-sm-block">Diseñado con <a href="https://wordpress.org" class="link-body-emphasis link-underline link-underline-opacity-0">Wordpress <i class="nf-fa-wordpress_simple"></i></a></div>
    </footer>
    <!-- fin foooter -->
    <?php wp_footer(); ?>
    <!-- inicio script -->
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var currentYear = new Date().getFullYear();
        document.getElementById("currentYear").textContent = "- " + currentYear;
      });
    </script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/alert.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/button.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/carousel.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/collapse.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/dropdown.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/modal.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/offcanvas.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/popover.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/scrollspy.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/tab.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/toast.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/node_modules/bootstrap/js/dist/tooltip.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/themeMode.js"></script>
    <!-- fin script -->
  </body>
</html>
