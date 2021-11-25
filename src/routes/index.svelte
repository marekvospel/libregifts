<script lang="ts" context="module">
  import { firebaseConfig } from "../firebase";
  import type {giftI} from "../types";

  import {initializeApp} from "@firebase/app";
  import {collection, getDocs, getFirestore} from '@firebase/firestore'

  let db;

  export async function load (): Promise<{ props: { gifts: { [p: string]: giftI } } }> {

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

<div class='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 align-center'>
  {#each Object.values(gifts) as gift, index (index)}
    <div class={`px-4 py-8 text-white font-semibold cursor-pointer ${index % 2 === 0 ? 'bg-db-blue-light' : 'bg-db-blue-dark'}
    hover:bg-db-yellow
    transition-colors duration-300
    `}>
      <Gift {...gift} />
    </div>
  {/each}
</div>
