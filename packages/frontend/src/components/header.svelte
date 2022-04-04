<script lang="ts">
	type NavItem = {
		label: string;
		to: string;
	};
	type ParentItem = {
		children: NavItem[];
		label: string;
	};
	const navItems: Array<NavItem> = [
		{
			label: 'Home',
			to: '/'
		},
		{
			label: 'Case Studies',
			to: '/editor/case-studies'
		},
		{
			label: 'Videos',
			to: '/editor/videos'
		}
	];

	// TODO: temp tester variable
	let isLoggedIn = false;
</script>

<header
	class="fixed left-0 top-0 right-0 h-header bg-background bg-opacity-25 backdrop-blur-sm border-b-4 border-solid border-primary z-headerPrimary"
>
	<div class="w-full flex flex-row justify-between h-full">
		<div>Logo</div>

		<nav class="flex flex-row gap-4 h-full items-center">
			{#each navItems as navItem}
				<a href="{navItem.to}" class="font-bold hover:text-accent1">{navItem.label}</a>
			{/each}

			<div>
				<a href="/login">Log In</a>
			</div>
		</nav>
	</div>
</header>
