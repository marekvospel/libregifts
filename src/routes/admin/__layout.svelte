<script lang="ts">
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import authStore from "../../stores/authStore";
  import {onMount} from "svelte";

  onMount(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, user => {
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true
      })
    })
  })

</script>

<slot />