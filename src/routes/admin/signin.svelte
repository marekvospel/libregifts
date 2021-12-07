<script lang="ts">
	import authStore from '../../stores/authStore';
	import { goto } from '$app/navigation';
  import {onMount} from "svelte";
  import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

  let auth
  let email = ''
  let password = ''

  onMount(() => {
      auth = getAuth()
  })

	const sub = authStore.subscribe(async (info) => {
        console.log('update', info)
		if (info.firebaseControlled && info.isLoggedIn) {
            console.log('redirecting')
			await goto('/admin');
		}
	});

	function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
          console.log(user)
      })
      .catch(err => {
          console.error(err)
      })
  }
</script>

<div class="flex flex-col bg-db-blue-light">
	<form on:submit|preventDefault={signIn} class="flex p-2 lg:p-4 flex-col gap-2 lg:gap-4">
		<input type="email" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Heslo" bind:value={password}/>
		<button type="submit" class="text-white">Přihlásit se</button>
	</form>
</div>
