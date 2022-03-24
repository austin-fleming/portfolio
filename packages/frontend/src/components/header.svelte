<script lang="ts">
	type NavItem = {
		label: string;
		to: string;
	};
	type ParentItem = {
		children: NavItem[];
		label: string;
	};
	const navItems: Array<NavItem | ParentItem> = [
		{
			children: [
				{
					label: 'Case Studies',
					to: '/case-studies'
				},
				{
					label: 'Videos',
					to: '/videos'
				}
			],
			label: 'Editor'
		}
	];

	// TODO: temp tester variable
	let isLoggedIn = false;
</script>

<header
	class="sticky left-0 top-0 right-0 bg-background border-b-4 border-solid border-primary z-headerPrimary"
>
	<div class="w-full flex flex-row justify-between">
		<div>Logo</div>

		<nav>
			<ul class="flex flex-row">
				{#each navItems as navItem}
					<li></li>
				{/each}
			</ul>

			<div>
				<a href="/login">Log In</a>
			</div>
		</nav>
	</div>
</header>
