<?php
/**
 * Matiere Noire SVG icons block
 *
 *
 * @wordpress-plugin
 * Plugin Name:       Matiere Noire SVG icons block
 * Plugin URI:        https://github.com/matiere-noire/svg-icons-block
 * Description:       Ajout d'un block Icon SVG
 * Version:           1.0.0
 * Author:            Matiere Noire
 * Author URI:        https://www.matierenoire.io/
 * License:           MIT
 */


/**
 * Enqueue scripts/styles for the editor.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
add_action( 'enqueue_block_editor_assets', function() {


    // Enqueur blocks
    wp_enqueue_script(
        'mn-svg-icons-block',
        plugins_url('/build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-editor', 'wp-components', 'wp-data', 'wp-compose' ],
        '1.0.0',
        true
    );

    wp_enqueue_style('mn-svg-icons-block-styles', plugins_url('/build/index.css', __FILE__), null, null);
} );

/**
 * Enqueue scripts/styles for the front end.
 *
 * @link   https://developer.wordpress.org/reference/functions/wp_enqueue_script/
 * @link   https://developer.wordpress.org/reference/functions/wp_enqueue_style/
 * @since  1.0.0
 * @access public
 * @return void
 */
add_action('wp_enqueue_scripts', function () {

    // Enqueue theme styles.
    wp_enqueue_style('mn-svg-icons-block-styles', plugins_url('/build/index.css', __FILE__), null, null);
});

/**
 * Add svgs
 */
add_action('admin_footer', 'add_svg_sprite');
add_action('wp_footer', 'add_svg_sprite');

function add_svg_sprite()
{
    echo '<div style="display:none">';
    require_once( plugin_dir_path(__FILE__) . 'build/spritemap.svg' );
    echo '</div>';
}


// Ajout de tag utilisé dans les blocs pour tout les rôtes

add_filter('wp_kses_allowed_html', 'allowed_html', 100, 2);

function allowed_html($allowedposttags, $context)
{

    if ($context === 'post') {
        $allowedposttags['svg'] = [
            'xmlns'     => true,
            'class'     => true,
            'fill'      => true,
            'viewbox'   => true,
            'role'      => true,
            'aria-hidden' => true,
            'focusable' => true,
            'width'     => true,
            'height'    => true,
        ];
        $allowedposttags['path'] = [
            'd'     => true,
            'fill'  => true,
        ];
        $allowedposttags['use'] = [
            'href'  => true,
        ];
    }
    return $allowedposttags;
}
