import type { ChangeTypeOfKeys } from '@repo/shared';

export type Timestamp = string;

export type Uuid = string;

export type Author = {
    id: Uuid;
    _created_at: string;
    _modified_at: string;
    name: string;
    info: {
        bio: string;
    };
};

export type CaseStudy = {
    id: Uuid;
    _created_at: string;
    _modified_at: string;
    published_at: string;
    title: string;
    body: {
        content: string;
    };
    view_count: number;
    author: Uuid;
};

export type ExpandedCaseStudy = ChangeTypeOfKeys<CaseStudy, 'author', Author>;

// TODO: remove this tester
export type Note = {
    id: Uuid;
    _created_at: Timestamp;
    _modified_at: Timestamp;
    body: string;
};
