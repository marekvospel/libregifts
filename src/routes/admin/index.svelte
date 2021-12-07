<script lang="ts">

    import authStore from "../../stores/authStore";
    import {goto} from "$app/navigation";

    const sub = authStore.subscribe(async (info) => {
        if (info.firebaseControlled && !info.isLoggedIn) {
            await goto('/admin/signin');
        }
    });

</script>

<div>

</div>
