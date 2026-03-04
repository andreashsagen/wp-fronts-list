/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	PanelBody,
	ColorPalette,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import apiFetch from '@wordpress/api-fetch';
import React, { useState, useEffect } from 'react';
import { withState } from '@wordpress/compose';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const {
		textField,
		cats,
	} = props.attributes;


	function onChangeTextField() {}

	const [ isChecked, setChecked ] = useState([]);
	const [ inputs, setInputs ] = useState({});
	const [ isTmpChecked, setTmpChecked ] = useState( false );

	function handleChange(name, value) {
		setInputs(values => ({...values, [name]: value}));
		console.log(value);
	}


	/* useState kjører og returnerer i rekkefølge et dataobjekt og en funksjon for å sette dataobjektet */
	const [categories, setCategories] = useState([]);

	useEffect(async () => {
		const result = await apiFetch({ path: '/wp/v2/categories' })
		const wpcats = await result.map((category, index) => {
			return { id: category['id'], name: category['name'], checked: false };
		});
		console.log(wpcats);
		setCategories(wpcats)
	}, []);

	useEffect(async () => {
		console.log(categories);
	}, [categories]);

	function toggleChecked(id) {
		setCategories((previousCategories) => {
			previousCategories?.map((previousCategory) => {
				if(previousCategory.id === id) {
					return { id: id, name: previousCategory.name, checked: !previousCategory.checked }
				} else {
					return previousCategory;
				}
			});
		});
	}

	return (
		<>
			<div>
			{ categories.map((category) => {
				return category.name;
			})
			}
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Tmp' ) }>
				</PanelBody>
				<PanelBody title={ __( 'Categories' ) }>
					<ul>
						{
							categories?.map((category) => {
							return (
								<li>{category.name}
								<CheckboxControl
									label="Is author"
									help="Is the user a author or not?"
									checked={ category.checked }
									onChange={ toggleChecked(category.id) }
								/>
								</li>
								);
							})
						}
					</ul>
				</PanelBody>
				<PanelBody title={ __( 'Content' ) }>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Search"
						value={ textField }
						help="Min. 3 chars"
						onChange={ onChangeTextField }
					/>
				</PanelBody>

			</InspectorControls>

			<div { ...useBlockProps() }>
				<p>Hello</p>
			</div>
		</>
	);
}
