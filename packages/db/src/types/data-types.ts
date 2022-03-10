export type Timestamp = string;

export type ArticleContent = string;

export type ForeignKey = string;

export type Uuid = string;

export type Url = string;

export type Slug = string;

export type Image = {
	src: string;
	alt: string;
	caption?: string;
	attribution?: string;
	details?: {
		width?: number;
		height?: number;
	};
};

export type EmbedVideo = {
	src: Url;
	title: string;
	source: 'youtube' | 'vimeo';
	details: {
		width: number;
		height: number;
	};
	options: {
		autoplay: boolean;
		mute: boolean;
	};
};

export type FeatureMedia = Array<EmbedVideo | Image>;
