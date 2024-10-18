import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from 'utilities';

type Props = {
	title?: string;
	description?: string;
	image?: string;
};

const Seo = ({ title, description, image }: Props) => {
	return (
		<div>
			<Helmet>
				<title>{title ? `${title} | ${SEO.meta.title}` : SEO.meta.title}</title>
				<meta name='title' content={title || SEO.meta.title} />
				<meta
					name='description'
					content={description || SEO.meta.description}
				/>

				<meta property='og:type' content='website' />
				<meta property='og:url' content={SEO.meta.siteUrl} />
				<meta property='og:title' content={title || SEO.meta.title} />
				<meta
					property='og:description'
					content={description || SEO.meta.description}
				/>
				<meta
					property='og:image'
					content={image ? image : `${SEO.meta.siteUrl}/${SEO.meta.iconimage}`}
				/>

				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content={SEO.meta.siteUrl} />
				<meta property='twitter:title' content='Airtimeflip' />
				<meta
					property='twitter:description'
					content={description || SEO.meta.description}
				/>
				<meta
					property='twitter:image'
					content={image ? image : `${SEO.meta.siteUrl}/${SEO.meta.iconimage}`}
				></meta>
			</Helmet>
		</div>
	);
};

export default Seo;
