const { createElement, Fragment } = wp.element
const { PanelBody, TextControl, IconButton } = wp.components
const { InspectorControls, PanelColorSettings } = wp.editor
const { withColors } = wp.blockEditor
import classnames from 'classnames'

const EditIcon = ({ className, attributes, setAttributes, backgroundColor, iconColor, setBackgroundColor, setIconColor }) => {
	const symbole = document.querySelectorAll('symbol[id^="icon-"]')

	let iconsId = []
	for (let i = 0; i < symbole.length; i++) {
		iconsId.push(symbole[i].getAttribute('id'))
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Icones" initialOpen={true}>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{iconsId.map(i => (
							<IconButton
								icon={
									<svg className="icon" width={16} height={16}>
										<use href={`#${i}`} />
									</svg>
								}
								isDefault={i === attributes.icon}
								onClick={() => setAttributes({ icon: i })}
							/>
						))}
					</div>

					<TextControl label="Taille" type="number" value={attributes.size} onChange={size => setAttributes({ size })} />
				</PanelBody>
				<PanelColorSettings
					title="Couleur de l‘iconne"
					colorSettings={[
						{
							value: iconColor.color,
							onChange: colorValue => setIconColor(colorValue),
							label: 'Couleur'
						},
						{
							value: backgroundColor.color,
							onChange: colorValue => setBackgroundColor(colorValue),
							label: 'Couleur de fond'
						}
					]}
				/>
			</InspectorControls>
			<svg
				className={classnames('icon', className, {
					'has-background': backgroundColor.color,
					[backgroundColor.class]: backgroundColor.class,
					'has-text-color': iconColor.color,
					[iconColor.class]: iconColor.class
				})}
				style={{ backgroundColor: backgroundColor.color, color: iconColor.color }}
				width={attributes.size}
				height={attributes.size}
			>
				<use href={`#${attributes.icon}`} />
			</svg>
		</Fragment>
	)
}

export default withColors('backgroundColor', { iconColor: 'color' })(EditIcon)
