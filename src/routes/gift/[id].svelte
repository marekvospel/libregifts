<script lang="ts" context="module">
  import type {giftI} from "../../types";
  import {initializeApp} from "@firebase/app";
  import {firebaseConfig} from "../../firebase";
  import {doc, getDoc, getFirestore} from "@firebase/firestore";

  let db;

  /** @type {import('@sveltejs/kit').RequestHandler} */
  export async function load({ page }) {

    if (!page.params.id) return {}

    initializeApp(firebaseConfig)

    db = getFirestore();

    const gift = await getDoc(doc(db, 'gifts', page.params?.id));

    if (gift.exists())
        return { props: { ...page?.params, gift: gift.data() }}

    return { props: { ...page?.params } }
  }
</script>

<script lang="ts">
    import {addDoc, collection, DocumentData, onSnapshot} from "@firebase/firestore";
    import {onMount} from "svelte";

  export let id = ''
  export let gift: giftI = null

  let giverName = ''
  let giverPhone = ''
  let giverEmail = ''

  onMount(async () => {

    const giftRef = doc(db, 'gifts', id)

    onSnapshot(giftRef, async (g) => {
      if (g.exists()) {
          gift = g.data()
      }
    })

  })

  async function register() {
    if (gift.taken) return false

    const db = getFirestore()

    const giverRef = collection(db, 'givers')

    console.log(id)

    try {
      await addDoc(giverRef, {
        name: giverName,
        phone: giverPhone,
        email: giverEmail,
        gift: id
        } as DocumentData)
      } catch (e) {
        console.error(e)
        return false
    }

    return true
  }
</script>

<div class='bg-gray-200 px-4 py-8'>
  <p>{ gift.name }</p>
  <p>{ gift.childName } ({ gift.childAge}let)</p>
  {#if !gift.taken}
    <form on:submit|preventDefault={ register } class='flex flex-col gap-2'>
      <input bind:value={giverName} placeholder='Jmeno'>
      <input bind:value={giverPhone} placeholder='Telefon'>
      <input bind:value={giverEmail} placeholder='Email'>
      <button type="submit">Registrovat</button>
    </form>
  {/if}
</div>
