<script lang="ts">
	const serverRoute = 'http://localhost:8000/api/login';
</script>

<form action="{serverRoute}" class="w-full max-w-[600px] m-auto flex flex-col gap-8" method="post">
	<label class="flex flex-col" htmlfor="email-field"
		>email
		<input id="email-field" type="email" name="email" placeholder="example@email.com" required />
	</label>

	<label class="flex flex-col" htmlfor="password-field"
		>password
		<input id="password-field" type="password" name="password" placeholder="password" required />
	</label>

	<input id="login-submit" type="submit" value="login" />
</form>
