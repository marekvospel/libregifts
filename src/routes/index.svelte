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
  const colors = ['bg-db-brown-dark', 'bg-db-blue-light', 'bg-db-grey-dark', 'bg-db-brown-light', 'bg-db-blue-dark',  'bg-db-grey-light']
</script>

<div class='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 align-center'>
  {#each Object.values(gifts).sort((a, b) => parseInt(a.childAge) - parseInt(b.childAge)) as gift, index (index)}
    <a href={gift.taken ? '/' : `/gift/${gift.id}`} class={`px-4 py-8 text-white font-medium cursor-pointer ${colors[index % colors.length]}
    hover:bg-db-yellow
    transition-colors duration-300
    `}>
      <Gift {...gift} />
    </a>
  {/each}
</div>
