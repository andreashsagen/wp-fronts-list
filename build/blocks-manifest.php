<?php
// This file is generated. Do not modify it manually.
return array(
	'sorenso-fronts-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'sorenso/sorenso-fronts-list',
		'version' => '0.1.0',
		'title' => 'List of posts',
		'category' => 'fronts-blocks',
		'icon' => 'insert',
		'description' => 'Fronts block to display a list of posts',
		'attributes' => array(
			'cats' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'isChecked' => array(
				'type' => 'boolean',
				'default' => false
			),
			'boxes' => array(
				'type' => 'array',
				'source' => 'query',
				'selector' => '.fronts-category input[type=\'checkbox\']',
				'query' => array(
					'checked' => array(
						'type' => 'boolean',
						'attribute' => 'checked',
						'source' => 'attribute',
						'default' => false
					)
				)
			),
			'direction' => array(
				'type' => 'spring',
				'default' => 'DESC'
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'sorenso-fronts-list',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
