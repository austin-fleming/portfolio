<script lang="ts">
	import PolyButton from '$components/poly-button.svelte';
</script>

<div class="flex flex-col justify-center items-center gap-4 min-h-screen py-12">
	<p>-- Href --</p>
	<PolyButton href="/case-studies/gift-platform">Gift Platform</PolyButton>

	<p>-- Href, size test --</p>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" size="sm">Gift Platform</PolyButton>
		<PolyButton href="/case-studies/gift-platform" size="base">Gift Platform</PolyButton>
		<PolyButton href="/case-studies/gift-platform" size="lg">Gift Platform</PolyButton>
	</div>

	<p>-- Interaction --</p>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" interaction="none">Gift Platform</PolyButton>
		<PolyButton href="/case-studies/gift-platform" interaction="arrow">Gift Platform</PolyButton>
	</div>

	<p>-- Rounded --</p>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="fill" round="none"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" round="base"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" round="full"
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="outline" round="none"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" round="base"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" round="full"
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="text" round="none"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" round="base"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" round="full"
			>Gift Platform</PolyButton
		>
	</div>

	<p>-- Colors x Styles --</p>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="fill" color="secondary"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="primary"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" interaction="arrow" color="accent"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="success"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="error"
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="outline" color="primary"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="secondary"
			>Gift Platform</PolyButton
		>
		<PolyButton
			href="/case-studies/gift-platform"
			style="outline"
			interaction="arrow"
			color="accent">Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="success"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="error"
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="text" color="primary"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="secondary"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" interaction="arrow" color="accent"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="success"
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="error"
			>Gift Platform</PolyButton
		>
	</div>

	<p>-- Colors x Styles x Disabled --</p>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="fill" color="secondary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="primary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="accent" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="success" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="fill" color="error" isDisabled
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="outline" color="primary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="secondary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="accent" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="success" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="outline" color="error" isDisabled
			>Gift Platform</PolyButton
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<PolyButton href="/case-studies/gift-platform" style="text" color="primary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="secondary" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton
			href="/case-studies/gift-platform"
			style="text"
			color="accent"
			interaction="arrow"
			isDisabled>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="success" isDisabled
			>Gift Platform</PolyButton
		>
		<PolyButton href="/case-studies/gift-platform" style="text" color="error" isDisabled
			>Gift Platform</PolyButton
		>
	</div>
</div>
