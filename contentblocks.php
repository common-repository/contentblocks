<?php
/**
 * Plugin Name: Content Blocks
 * Plugin URI: https://content-blocks.com
 * Description: Beautiful blocks for your WordPress site
 * Author: Range
 * Author URI: https://ran.ge
 * Version: 0.0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CONTENTBLOCKS
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;


/**
 * Enqueue block editor JavaScript and CSS
 */
function contentblocks_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '/assets/js/editor.contentblocks.js';
    $editorStylePath = '/assets/css/contentblocks.editor.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'contentblocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Pass in REST URL
    wp_localize_script(
      'contentblocks-js',
      'contentblocks_globals',
      [
        'rest_url' => esc_url( rest_url() )
      ]);


    // Enqueue optional editor only styles
    wp_enqueue_style(
        'contentblocks-editor',
        plugins_url( $editorStylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'contentblocks_editor_scripts' );


/**
 * Enqueue block editor JavaScript and CSS
 */
function contentblocks_scripts()
{
    $blockPath = 'assets/js/frontend.contentblocks.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = 'assets/css/contentblocks.style.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'contentblocks-frontend-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'contentblocks',
        plugins_url($stylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );

}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', 'contentblocks_scripts');


/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function contentblocks_dynamic_block_render( $attributes ) {

    $recent_posts = wp_get_recent_posts( [
        'numberposts' => 1,
        'post_status' => 'publish',
    ] );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
    $post = $recent_posts[ 0 ];
    $post_id = $post['ID'];
    return sprintf(
        '<p><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
        esc_url( get_permalink( $post_id ) ),
        esc_html( get_the_title( $post_id ) )
    );

}

// Hook server side rendering into render callback
//register_block_type( 'contentblocks/dynamic', [
//    'render_callback' => 'contentblocks_dynamic_block_render',
//] );


/**
 * Server rendering for /blocks/examples/13-dynamic-lat
 */
function contentblocks_dynamic_alt_block_render( $attributes ) {

    $posts = wp_get_recent_posts( array(
        'numberposts' => 5,
        'post_status' => 'publish',
    ) );

    if ( count( $posts ) === 0 ) {
        return 'No posts';
    }

    $markup = '<ul>';
    foreach( $posts as $post ) {

      $markup .= sprintf(
          '<li><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></li>',
          esc_url( get_permalink( $post['ID'] ) ),
          esc_html( get_the_title( $post['ID'] ) )
      );

    }

    return $markup;

}

// Hook server side rendering into render callback
//register_block_type( 'contentblocks/dynamic-alt', [
//    'render_callback' => 'contentblocks_dynamic_alt_block_render',
//] );
