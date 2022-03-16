<script lang="ts">
	export let id: string;

	type BioContent = {
		subtitle: string;
		summary: string;
		title: string;
	};
	const bioContent: BioContent = {
		subtitle: 'A little about me',
		summary:
			'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
		title: 'Bio'
	};
</script>

<section id="{id}">
	<div>
		<span class="text-sm uppercase">{bioContent.subtitle}</span>
		<h1 class="text-6xl font-bold">{bioContent.title}</h1>
	</div>

	<p>{bioContent.summary}</p>
</section>
