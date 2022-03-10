import type {
	Timestamp,
	ForeignKey,
	Uuid,
	ArticleContent,
	Image,
	EmbedVideo,
	Slug
} from './data-types';

/*
TABLE case_study

id								uuid				PRIMARY KEY NOT NULL

slug							string			NOT NULL
author						uuid				REFERENCES author (id)
_created_at 			timestamptz NOT NULL
_updated_at				timestamptz NOT NULL
date_published		timestamptz	NOT NULL
date_modified			timestamptz	NOT NULL

title							text				NOT NULL
summary						text				NOT NULL
body							text				NOT NULL

feature_image			jsonb				NOT NULL
feature_video			jsonb

completion_period	text
project_status		text
client						text
tools							text
categories				text[]			NOT NULL
note							text
*/

export type CaseStudy = {
	id: Uuid;
	// meta
	slug: Slug;
	author: ForeignKey;
	_created_at: Timestamp;
	_updated_at: Timestamp;
	date_published: Timestamp;
	date_modified: Timestamp;
	// content
	title: string;
	summary: string;
	body: ArticleContent;
	feature_image: Image;
	feature_video?: EmbedVideo;
	// details
	completion_period?: string;
	project_status?: string;
	client?: string;
	tools?: string[];
	categories: string[];
	note?: string;
};

/*
TABLE author

id								uuid				PRIMARY KEY NOT NULL

slug							string			NOT NULL
_created_at 			timestamptz NOT NULL
_updated_at				timestamptz NOT NULL

name							text				NOT NULL
blurb							text				NOT NULL

avatar						jsonb				NOT NULL
*/
export type Author = {
	id: Uuid;
	// meta
	slug: Slug;
	_created_at: Timestamp;
	_updated_at: Timestamp;
	avatar: Image;
	// content
	name: string;
	blurb: string;
};
