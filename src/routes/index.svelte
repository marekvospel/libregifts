<script lang="ts" context="module">
  import { firebaseConfig } from "../firebase";
  import type {giftI} from "../types";

  import {initializeApp} from "@firebase/app";
  import {collection, getDocs, getFirestore} from '@firebase/firestore'

  let db

  export async function load ({ fetch }) {

    initializeApp(firebaseConfig)

    db = getFirestore();

    const giftsRef = await getDocs(collection(db, 'gifts'))

    let giftsP: { [id: string]: giftI } = {}

    giftsRef.forEach(giftRef => {
        giftsP[giftRef.id] = { id: giftRef.id, ...giftRef.data() } as unknown as giftI
    })

    return { props: { gifts: giftsP }}
  }

</script>

<script lang="ts">
  import Gift from "../components/Gift.svelte";

  import {onMount} from "svelte";
  import {onSnapshot} from "@firebase/firestore";

  onMount(async () => {


    const giftsCollection = collection(db, 'gifts')

    onSnapshot(giftsCollection, async (col) => {
      col.forEach((doc) => {
        gifts[doc.id] = { id: doc.id, ...doc.data() }
      })
    })

  })

  export let gifts: { [id: string]: giftI } = {}
</script>

<div>
  {#each Object.values(gifts) as gift}
    <Gift {...gift} />
  {/each}
</div>
