export type CaseStudyMock = {
	// author: ForeignKey;
	_created_at: string;
	_id: string;
	_updated_at: string;
	body: string;
	date_modified?: string;
	date_published?: string;
	details: {
		client?: string;
		completion_period?: string;
		project_status?: string;
		tools?: string[];
	};
	feature_image: {
		alt: string;
		attribution?: string;
		caption?: string;
		details?: {
			height?: number;
			width?: number;
		};
		source: string;
	};
	feature_video?: {
		attribution?: string;
		caption?: string;
		details: {
			height: number;
			width: number;
		};
		options?: {
			autoplay?: boolean;
			mute?: boolean;
		};
		provider: 'youtube' | 'vimeo';
		title: string;
		video_id: string;
	};
	is_published: boolean;
	// details
	note?: string;
	project_type: string;
	// meta
	slug: string;
	summary: string;
	// content
	title: string;
};

/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-secrets/no-secrets */
export const caseStudyMock: CaseStudyMock = {
	_created_at: '2022-03-10 09:29:41.835209+00',
	_id: 'uuid',
	_updated_at: '2022-03-10 09:29:41.835209+00',
	body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
	date_modified: '2022-03-10 09:29:41.835209+00',
	date_published: '2022-03-10 09:29:41.835209+00',
	details: {
		client: 'Crown Prince Court via Slash Design',
		completion_period: 'Fall 2021',
		project_status: 'Launching',
		tools: ['Three.js']
	},
	feature_image: {
		alt: 'foo',
		attribution: 'Attribution text goes here',
		caption: 'A caption',
		details: {
			height: 1080,
			width: 1980
		},
		source: 'https://img.youtube.com/vi/bZ39Z76i7AU/maxresdefault.jpg'
	},
	feature_video: {
		attribution: 'Attribution text goes here',
		caption: 'A caption',
		details: {
			height: 1080,
			width: 1980
		},
		options: {
			autoplay: true,
			mute: true
		},
		provider: 'youtube',
		title: 'Process video of majlis animation',
		video_id: 'bZ39Z76i7AU'
	},
	is_published: true,
	note: 'This full scale of this project is currently under NDA.',
	project_type: 'Creative Coding',
	slug: 'majlis',
	summary: 'Need a better teaser. This one sucks.',
	title: 'Majlis for Future Generations'
};
/* eslint-enable sonarjs/no-duplicate-string */
/* eslint-enable no-secrets/no-secrets */
