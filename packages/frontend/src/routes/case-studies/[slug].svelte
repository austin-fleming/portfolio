<script context="module" lang="ts">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';
	import { getCaseStudies } from '$db/get-case-studies';
	import type { CaseStudy } from '@repo/db';
	import { caseStudyMock, type CaseStudyMock } from '$db/mocks/case-study';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const { slug } = params;
		/* const maybeCaseStudies = await getCaseStudies({ slug });

		if (!maybeCaseStudies || maybeCaseStudies.length === 0) {
			return { fallthrough: true };
		}

		const caseStudyData: CaseStudy = maybeCaseStudies[0]; */
		const caseStudyData = caseStudyMock;

		return {
			props: { caseStudyData },
			status: 200
		};
	};
</script>

<script lang="ts">
	// export let caseStudyData: CaseStudy;
	export let caseStudyData: CaseStudyMock;

	const {
		body,
		date_modified,
		date_published,
		details,
		feature_image,
		feature_video,
		note,
		project_type,
		summary,
		title
	} = caseStudyData;
</script>

<article>
	<header>
		<div class="title-block">
			<nav aria-label="breadcrumbs" class="breadcrumbs">
				<p><a href="/#case-studies">work</a>/ <span class="sr-only">{title}</span></p>
			</nav>
			<h1 class="title">{title}</h1>
			<span class="eyebrow">{project_type}</span>
			<p class="summary">{summary}</p>
		</div>

		<figure>
			{#if feature_video}
				<!-- https://community.cloudflare.com/t/how-do-you-set-the-default-stream-video-quality-to-1080p/143764/24 -->
				{#if feature_video.provider === 'youtube'}
					<iframe
						src="https://www.youtube.com/embed/{feature_video.video_id}?vq=hd1080p&autoplay=1&controls=0&rel=0&showinfo=0&autohide=1&wmode=transparent&playlist={feature_video.video_id}&loop=1"
						title="{feature_video.title}"
						allow="autoplay; encrypted-media"
						width="1500"
						height="{1200}"
						frameborder="0"
						allowfullscreen></iframe>
					{#if feature_video.caption || feature_video.attribution}
						<figcaption>
							{#if feature_video.caption}
								<p>{feature_video.caption}</p>
							{/if}
							{#if feature_video.attribution}
								<footer>
									<small>
										{feature_video.attribution}
									</small>
								</footer>
							{/if}
						</figcaption>
					{/if}
				{/if}
			{:else}
				<img src="{feature_image.source}" alt="{feature_image.alt}" />
				{#if feature_image.caption || feature_image.attribution}
					<figcaption>
						{#if feature_image.caption}
							<p>{feature_image.caption}</p>
						{/if}
						{#if feature_image.attribution}
							<footer>
								<small>
									{feature_image.attribution}
								</small>
							</footer>
						{/if}
					</figcaption>
				{/if}
			{/if}
		</figure>

		<dl class="post-meta" title="project information">
			<div class="post-meta__item">
				<dt>by:</dt>
				<dd>
					<a href="https://johnaustfleming.com">Austin Fleming</a>
				</dd>
			</div>

			<div class="post-meta__item"></div>

			<!-- <div class="post-meta__item">
				<span>Published:</span>
				<time pubdate datetime="{date_published}">{date_published}</time>
			</div>

			<div class="post-meta__item">
				<span>Last Updated:</span>
				<time datetime="{date_modified}">{date_modified}</time>
			</div> -->
		</dl>
	</header>

	<div class="main-content">{body}</div>

	<footer></footer>
</article>

<style lang="scss">
	.title-block {
		& .eyebrow {
			@apply uppercase text-sm;
		}

		& .title {
			@apply font-bold text-4xl;
		}

		& .summary {
			@apply font-bold;
		}
	}
</style>
