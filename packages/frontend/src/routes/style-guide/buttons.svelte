<script lang="ts">
	import DynamicComponent from '$components/dynamic-component/dynamic-component.svelte';
	import Button from '$components/button.svelte';
</script>

<div class="flex flex-col justify-center items-center gap-4 min-h-screen py-12">
	<p>-- Href --</p>
	<Button href="/case-studies/gift-platform">Gift Platform</Button>

	<p>-- Href, size test --</p>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" size="sm">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" size="base">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" size="lg">Gift Platform</Button>
	</div>

	<p>-- Interaction --</p>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" interaction="none">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" interaction="arrow">Gift Platform</Button>
	</div>

	<p>-- Rounded --</p>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="fill" round="none">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="fill" round="base">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="fill" round="full">Gift Platform</Button>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="outline" round="none">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="outline" round="base">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="outline" round="full">Gift Platform</Button>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="text" round="none">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="text" round="base">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="text" round="full">Gift Platform</Button>
	</div>

	<p>-- Colors x Styles --</p>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="fill" color="secondary">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="fill" color="primary">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="fill" interaction="arrow" color="accent"
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="fill" color="success">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="fill" color="error">Gift Platform</Button>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="outline" color="primary">Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="secondary"
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" interaction="arrow" color="accent"
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="success">Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="error">Gift Platform</Button>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="text" color="primary">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="text" color="secondary">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="text" interaction="arrow" color="accent"
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="text" color="success">Gift Platform</Button>
		<Button href="/case-studies/gift-platform" style="text" color="error">Gift Platform</Button>
	</div>

	<p>-- Colors x Styles x Disabled --</p>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="fill" color="secondary" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="fill" color="primary" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="fill" color="accent" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="fill" color="success" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="fill" color="error" isDisabled
			>Gift Platform</Button
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="outline" color="primary" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="secondary" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="accent" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="success" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="outline" color="error" isDisabled
			>Gift Platform</Button
		>
	</div>
	<div class="flex flex-row gap-4 items-start">
		<Button href="/case-studies/gift-platform" style="text" color="primary" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="text" color="secondary" isDisabled
			>Gift Platform</Button
		>
		<Button
			href="/case-studies/gift-platform"
			style="text"
			color="accent"
			interaction="arrow"
			isDisabled>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="text" color="success" isDisabled
			>Gift Platform</Button
		>
		<Button href="/case-studies/gift-platform" style="text" color="error" isDisabled
			>Gift Platform</Button
		>
	</div>
</div>
